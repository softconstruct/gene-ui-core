import React, { FC } from "react";
import classNames from "classnames";
// Styles
import "./CheckboxGroup.scss";

interface ICheckboxGroupProps {
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
    // fill CheckboxGroup component props interface
}

/**
 * A checkbox group component is a set of related checkboxes that allows users to select multiple options from a list. Each checkbox within the group operates independently, meaning multiple boxes can be checked or unchecked simultaneously.
 */
const CheckboxGroup: FC<ICheckboxGroupProps> = ({ className }) => {
    return <div className={classNames("checkboxGroup", className)}>CheckboxGroup</div>;
};

export { ICheckboxGroupProps, CheckboxGroup as default };
