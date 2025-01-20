import React, {
    Children,
    cloneElement,
    FC,
    FunctionComponentElement,
    ReactElement,
    ReactNode,
    useEffect,
    useState
} from "react";
import classNames from "classnames";
// Styles
import "./Menu.scss";
// import { IconProps } from "@geneui/icons";
import Loader from "../../atoms/Loader";
import { IMenuItemProps } from "./MenuItem";

const stepBackArray = (arr: number[]) => arr.slice(0, -1);

const findPathOfDefaultOpened = (menu: ReactNode | ReactElement[], path: number[] = []): number[] | null => {
    if (!Array.isArray(menu)) return null;
    for (let i = 0; i < menu?.length; i++) {
        const item = menu[i];

        if (item.props?.defaultOpened) {
            return [...path, i];
        }

        if (item.props.children && Array.isArray(item.props.children)) {
            const childPath = findPathOfDefaultOpened(item.props.children, [...path, i]);
            if (childPath) {
                return childPath;
            }
        }
    }

    return null;
};

interface IMenuProps {
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
    children: ReactElement | ReactElement[];
    isLoading?: boolean;
    onChange: (paths: number[], id: string | number) => void;
}

// interface IMenuData {
//     title: string;
//     selected?: boolean;
//     id: number | string;
//     value: string;
//     IconBefore: FC<IconProps>;
//     IconAfter: FC<IconProps>;
//     danger?: boolean;
//     defaultOpened?: never;
//     isLoading?: boolean;
//     disabled?: boolean;
//     children: ReactNode | IMenuData[];
// }

export interface OnchangeHandlerType {
    index: number;
    id: number | string;
    isBack?: boolean;
    routeAction?: boolean;
}

/**
 * Menu component provides a list of options or actions available to the user within a specific context. Menus are used to offer additional functionality without cluttering the interface, allowing users to access commands, navigate to different sections, or modify settings quickly and efficiently.
 */

const cloneChildrenRecursive = (
    children: React.JSX.Element | React.JSX.Element[],
    onChangeHandler: (change: OnchangeHandlerType) => void,
    paths: number[],
    props = {},
    regardingPaths: number[] = [],
    isLoading = false
): FunctionComponentElement<IMenuItemProps>[] | FunctionComponentElement<HTMLElement> => {
    if (isLoading) {
        return (
            <div className="menu__loader">
                <Loader />
            </div>
        );
    }

    if (Array.isArray(children) && !children.length) {
        return (
            <div className="menu__empty">
                <h1>empty</h1>
            </div>
        );
    }

    return Children.map(children, (child, i) => {
        // if (!isValidElement(child)) return null;
        const isActive = paths?.length && i === paths[0];

        const childProps =
            isActive && child.props?.children
                ? {
                      ...props,
                      activeElement: paths.length === 1,
                      children: cloneChildrenRecursive(
                          child.props?.children,
                          onChangeHandler,
                          paths.slice(1),
                          props,
                          [...regardingPaths, i],
                          child.props.isLoading
                      )
                  }
                : props;

        // Return the cloned element with new props
        return cloneElement(child, {
            ...child.props,
            ...childProps,
            onChangeHandler,
            regardingPaths
            // index: i
        });
    });
};

const Menu: FC<IMenuProps> = ({ className, onChange, children, isLoading }) => {
    const [path, setPath] = useState<number[]>([]);

    useEffect(() => {
        const defaultPath = findPathOfDefaultOpened(children);
        if (defaultPath) {
            setPath(defaultPath);
        }
    }, []);

    const onChangeHandler = ({ index, id, isBack, routeAction }: OnchangeHandlerType) => {
        onChange(path, id);
        if (routeAction) {
            if (isBack) {
                const newSteps = stepBackArray(path);
                onChange(newSteps, id);
                setPath(newSteps);
            } else {
                setPath((prev) => [...prev, index]);
            }
        }
        if (!isBack) {
            onChange([...path, index], id);
        }
    };

    const clonedChildren = cloneChildrenRecursive(children, onChangeHandler, path);

    return (
        <>
            <div className={classNames("menu menu_isMobile menu_isSwappable", className)}>
                <div className="menu__list menu__list_current">
                    <div className="menu__content">
                        {isLoading ? (
                            <div className="menu__loader">
                                <Loader />
                            </div>
                        ) : (
                            clonedChildren
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export { IMenuProps, Menu as default };
