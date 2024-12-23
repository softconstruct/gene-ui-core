import React, {
    Children,
    cloneElement,
    CSSProperties,
    FC,
    FunctionComponentElement,
    useEffect,
    useRef,
    useState
} from "react";
// Styles
import "./SegmentedControl.scss";

// Component
import { HelperText, Label } from "../../../index";
import { ISegmentedControlItemProps } from "./SegmentedControlItem ";

interface ISegmentedControlProps {
    /**
     * Additional descriptive text shown with info icon and tooltip alongside of the label component.
     */
    infoText?: string;
    /**
     * The text content of the `label`.
     * This is the main text displayed within the `label`.
     */
    label?: string;
    /**
     * SegmentedControlItem component. Renders inside the component
     */

    children:
        | FunctionComponentElement<ISegmentedControlItemProps>
        | FunctionComponentElement<ISegmentedControlItemProps>[];
    /**
     * The actual text content to be displayed as helper text.
     */
    helperText?: string;
    /**
     *  It works when the user clicks on one of the control items. Returns the value of the `name` prop from the `SegmentedControlItem`.
     */
    onChange: (name: string) => void;
    /**
     * Size <br>
     * Possible values: `large | medium | small`
     */
    size?: "large" | "medium" | "small";
    /**
     * Indicates whether the label represents a required field.
     * When set to `true`, a visual indicator (asterisk) will be added to denote that the field is required.
     */
    required?: boolean;
    /**
     *  Determines the component appearance based on its status.<br>
     *  Possible values: `rest | warning | error`
     */
    type?: "rest" | "warning" | "error";
}

interface CSSVariableType extends CSSProperties {
    "--segmented-wrapper-width": string;
}

const SegmentedControl: FC<ISegmentedControlProps> = ({
    children,
    onChange,
    helperText,
    label,
    infoText,
    required,
    size,
    type = "rest" as const
}) => {
    const [selectedElementName, setSelectedElementName] = useState("");
    const [contentWidth, setContentWidth] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const onSelect = (name: string) => {
        setSelectedElementName(name);
        onChange(name);
    };

    const textSizes = size === "large" ? "medium" : size;

    useEffect(() => {
        if (ref.current?.getBoundingClientRect().width) {
            setContentWidth(ref.current?.getBoundingClientRect().width);
        }
    }, [ref.current]);

    const cssWitVariable: CSSVariableType = {
        "--segmented-wrapper-width": `${contentWidth}px`
    };

    return (
        <div className="segmentedControl" style={cssWitVariable}>
            <Label labelText={label} required={required} size={textSizes} infoText={infoText} />
            <div className="segmentedControl__wrapper" ref={ref}>
                {Children.map(children, (el) => {
                    return cloneElement(el, {
                        ...el.props,
                        selected: selectedElementName ? selectedElementName === el.props.name : el.props.selected,
                        size,
                        onSelect
                    });
                })}
            </div>
            {helperText && (
                <HelperText text={helperText} className="segmentedControl__helperText" size={textSizes} type={type} />
            )}
        </div>
    );
};

export { ISegmentedControlProps, SegmentedControl as default };
