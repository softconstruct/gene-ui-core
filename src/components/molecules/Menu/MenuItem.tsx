import React, { FC, ReactNode } from "react";
import { CheckMark, ChevronLeft, ChevronRight, IconProps } from "@geneui/icons";
import classNames from "classnames";

interface IMenuItemProps {
    selected?: boolean;
    children: ReactNode;
    title?: string;
    onChangeHandler?: (index: number, id: number | string, isBack?: boolean, routeAction?: boolean) => void;
    activeElement?: boolean;
    index: number;
    defaultOpened?: never;
    isLoading?: never;
    IconBefore?: FC<IconProps>;
    IconAfter?: FC<IconProps>;
    danger?: boolean;
    disabled?: boolean;
    id?: number | string;
}

const MenuItem: FC<IMenuItemProps> = ({
    children,
    title,
    onChangeHandler,
    activeElement,
    index,
    selected,
    IconBefore,
    IconAfter,
    danger,
    disabled,
    id
}) => {
    return (
        <>
            {typeof children !== "string" ? (
                <>
                    {/* Parent menu item */}
                    <button
                        type="button"
                        className={classNames("menu__item", {
                            menu__item_danger: danger,
                            menu__item_disabled: disabled
                        })}
                        {...(disabled ? { tabIndex: "-1" } : {})}
                        onClick={() => {
                            onChangeHandler(index, id, false, true);
                        }}
                    >
                        <span className="menu__cell">
                            {IconBefore && <IconBefore className="menu__icon menu__icon_before" size={20} />}
                            <span className="menu__itemTitle">{title}</span>
                        </span>
                        <ChevronRight className="menu__icon menu__icon_after" size={20} />
                    </button>
                    {/* menu list wrapper */}
                    <div
                        className={classNames("menu__list  ", {
                            menu__list_current: activeElement,
                            menu__item_disabled: disabled
                        })}
                    >
                        {/* header */}
                        <button
                            type="button"
                            className="menu__header"
                            onClick={() => onChangeHandler(index, id, true, true)}
                        >
                            <ChevronLeft className="menu__icon menu__icon_before" size={20} />
                            <p className="menu__headerTitle">{title}</p>
                        </button>
                        <div className="menu__content">{children}</div>
                    </div>
                </>
            ) : (
                // Simple menu item
                <button
                    type="button"
                    className={classNames("menu__item", {
                        menu__item_danger: danger,
                        menu__item_selected: selected,
                        menu__item_disabled: disabled
                    })}
                    onClick={() => onChangeHandler(index, id, false)}
                    {...(disabled ? { tabIndex: "-1" } : {})}
                >
                    <span className="menu__cell">
                        {IconBefore && <IconBefore className="menu__icon menu__icon_before" size={20} />}
                        <span className="menu__itemTitle">{children}</span>
                    </span>
                    {(selected && <CheckMark className="menu__icon menu__icon_after" size={20} />) ||
                        (IconAfter && <IconAfter className="menu__icon menu__icon_after" size={20} />)}
                </button>
            )}
        </>
    );
};

export { IMenuItemProps, MenuItem as default };
