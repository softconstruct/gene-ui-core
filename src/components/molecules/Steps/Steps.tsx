import React, { Children, cloneElement, FC, ReactNode } from "react";
import classNames from "classnames";
// Styles
import "./Steps.scss";
import { IStepProps } from "./Step";

interface IStepsProps {
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
    /**
     * Steps label
     */
    label?: string;
    /**
     * Steps description <br/>
     * Possible values: <br/>
     * Text - string
     */
    description?: string;
    /**
     * Steps direction <br/>
     * Possible values: `vertical | horizontal`
     */
    direction?: "vertical" | "horizontal";
    /**
     */
    type?: "dot" | "numeric";
    /**
     */
    isLinear?: boolean;
    // fill Steps component props interface,
    children: ReactNode;
    onChange?: (e: string | number) => void;
    isLoading?: boolean;
    disabled?: boolean;
    error?: boolean;
    state?: "incomplete" | "current" | "complete";
}

/**
 * Step component is used to guide users through a sequential process by breaking it down into distinct steps. It is commonly employed in multi-step forms, checkout processes, or workflows that require users to complete tasks in a specific order.
 */
const Steps: FC<IStepsProps> = ({
    label,
    description,
    direction,
    type,
    isLinear,
    className,
    children,
    onChange,
    isLoading,
    disabled,
    error,
    state
}) => {
    return (
        <div className={classNames(`steps steps_direction_${direction}`, { steps_linear: isLinear }, className)}>
            {Children.map(children, (step, i) => {
                if (!React.isValidElement<IStepProps>(step)) return step;

                return cloneElement(step, {
                    direction,
                    onChange: step.props.onChange || onChange,
                    isLoading: step.props.isLoading || isLoading,
                    stepNumber: step.props.stepNumber || i + 1,
                    type: step.props.type || type,
                    label: step.props.label || label,
                    description: step.props.description || description,
                    disabled: step.props.disabled || disabled,
                    error: step.props.error || error,
                    state: step.props.state || state
                });
            })}
        </div>
    );
};

export { IStepsProps, Steps as default };
