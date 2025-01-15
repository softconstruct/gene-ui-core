import React, { Children, cloneElement, FC, ReactElement, useEffect, useState } from "react";
import classNames from "classnames";
// Styles
import "./Menu.scss";
import Loader from "../../atoms/Loader";

const stepBackArray = (arr) => arr.slice(0, -1);

const findPathOfDefaultOpened = (menu, path = []) => {
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
    children: ReactElement;
    isLoading?: boolean;
    onChange: (paths: number[]) => void;
}

/**
 * Menu component provides a list of options or actions available to the user within a specific context. Menus are used to offer additional functionality without cluttering the interface, allowing users to access commands, navigate to different sections, or modify settings quickly and efficiently.
 */
let CHNGED_PATHS = [];

const cloneChildrenRecursive = (children, onChangeHandler, paths, props, regardingPaths = [], isLoading = false) => {
    if (isLoading) {
        return (
            <div className="menu__loader">
                <Loader />
            </div>
        );
    }
    return Children.map(children, (child, i) => {
        const isActive = paths?.length && i === paths[0];
        // If it's active, process its children with the remaining paths

        if (child.props?.defaultOpened) {
            CHNGED_PATHS = [...regardingPaths, i];
        }
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
    const [path, setPath] = useState([]);

    useEffect(() => {
        const defaultPath = findPathOfDefaultOpened(children);
        if (defaultPath) {
            setPath(defaultPath);
        }
    }, []);

    const onChangeHandler = (index, isBack: boolean, routeAction: boolean) => {
        if (routeAction) {
            if (isBack) {
                const newSteps = stepBackArray(path);
                onChange(newSteps);
                setPath(newSteps);
            } else {
                setPath((prev) => [...prev, index]);
            }
        }
        if (!isBack) {
            onChange([...path, index]);
        }
    };

    const clonedChildren = cloneChildrenRecursive(children, onChangeHandler, path);

    useEffect(() => {
        setPath(CHNGED_PATHS);
    }, []);

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
