import React, { FC } from "react";
import { ErrorAlertFill, SuccessFill, UnavailableOutline } from "@geneui/icons";
import classNames from "classnames";
import Divider from "../../atoms/Divider";
import { Loader } from "../../../index";

interface IStepProps {
    /**
     * Steps type <br/>
     * Possible values: `dot | numeric`
     */
    type?: "dot" | "numeric";
    /**
     * The text displayed as the label for the Step, describing its purpose.<br>
     * The Label can be clickable on not. For more information see the isLinear prop.
     */
    label?: string;
    /**
     * Extra information displayed with the label of step for clarity or guidance.
     */
    description?: string;
    /**
     * Unique id for Step.
     */
    id: string | number;
    /**
     * Loading state for Step.
     */
    isLoading?: boolean;
    /**
     * If type is numeric you can provide the number.<br>
     * By default starts with 1.
     */
    stepNumber?: number;
    /**
     * Disable state for Steps.
     */
    disabled?: boolean;
    /**
     * Error state for Step.
     */
    error?: boolean;
    /**
     * Change the icon for step to mention the Step state.
     */
    state?: "incomplete" | "current" | "complete";
    direction?: "vertical" | "horizontal";
    onChange?: (id: string | number) => void;
}

interface ITypesProps {
    type?: "dot" | "numeric";
    stepNumber: number;
    error?: boolean;
    isLoading?: boolean;
    state?: "incomplete" | "current" | "complete";
}

const Types: FC<ITypesProps> = ({ type, stepNumber, error, isLoading, state }) => {
    const stepCount = stepNumber > 9 ? 9 : stepNumber;

    if (isLoading) {
        return <Loader size="small" />;
    }

    if (error) {
        return <ErrorAlertFill size={24} className="steps__status_icon" />;
    }

    if (type === "dot") {
        if (state === "current") {
            return <UnavailableOutline size={24} className="steps__status_icon" />;
        }
        if (state === "complete") {
            return <SuccessFill size={24} className="steps__status_icon" />;
        }
        return <UnavailableOutline size={24} className="steps__status_icon" />;
    }

    return <span className="steps__status_icon steps__status_numeric">{stepCount}</span>;
};

const Step: FC<IStepProps> = ({
    type,
    direction = "vertical",
    description,
    label,
    onChange,
    id,
    isLoading,
    stepNumber,
    disabled,
    error,
    state
}) => {
    const changeHandler = () => onChange?.(id!);

    return (
        <div
            className={classNames("steps__step", {
                steps__step_disabled: disabled && !error && !isLoading,
                steps__step_error: error,
                steps__step_success: state === "complete",
                steps__step_current: state === "current"
            })}
        >
            <div className="steps__status">
                <Types type={type} stepNumber={stepNumber ?? 1} error={error} isLoading={isLoading} state={state} />

                <Divider
                    className="steps__status_divider"
                    vertical={direction === "vertical"}
                    appearance={state === "complete" && !disabled ? "brand" : "default"}
                />
            </div>
            <div className="steps__content">
                {label && (
                    <button type="button" className="steps__label" onClick={changeHandler} disabled={disabled}>
                        {label}
                    </button>
                )}
                <p className="steps__description">{description}</p>
            </div>
        </div>
    );
};

export { IStepProps, Step as default };
