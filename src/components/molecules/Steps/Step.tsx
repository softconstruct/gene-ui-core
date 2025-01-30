import React, { FC } from "react";
import { ErrorAlertFill, SuccessFill, UnavailableOutline } from "@geneui/icons";
import classNames from "classnames";
import Divider from "../../atoms/Divider";
import { Loader } from "../../../index";

interface IStepProps {
    type?: "dot" | "numeric";
    direction?: "vertical" | "horizontal";
    description?: string;
    label?: string;
    onChange?: (id: string | number) => void;
    id?: string | number;
    isLoading?: boolean;
    stepNumber?: number;
    disabled?: boolean;
    error?: boolean;
    state?: "incomplete" | "current" | "complete";
}

interface ITypesProps {
    type?: "dot" | "numeric";
    stepNumber: number;
    error?: boolean;
    isLoading?: boolean;
    state?: "incomplete" | "current" | "complete";
}

const Types: FC<ITypesProps> = ({ type, stepNumber, error, isLoading, state }) => {
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

    return <span className="steps__status_icon steps__status_numeric">{stepNumber}</span>;
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
    const changeHandler = () => {
        if (onChange && id) {
            onChange(id);
        }
    };

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

                <Divider className="steps__status_divider" vertical={direction === "vertical"} />
            </div>
            <div className="steps__content">
                <button
                    type="button"
                    className="steps__label"
                    onClick={changeHandler}
                    {...(disabled ? { disabled } : {})}
                >
                    {label}
                </button>
                <p className="steps__description">{description}</p>
            </div>
        </div>
    );
};

export { IStepProps, Step as default };
