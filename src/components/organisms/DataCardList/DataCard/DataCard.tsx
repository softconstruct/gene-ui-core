import React, { AriaRole, FC, useState } from "react";

// Component
import KeyValue, { IKeyValueProps } from "../../../molecules/KeyValue";
import Button from "../../../atoms/Button";
import Key from "../../../molecules/KeyValue/Key";
import Value from "../../../molecules/KeyValue/Value";
import Pill, { IPillProps } from "../../../atoms/Pill";
import TextLink, { ITextLinkProps } from "../../../atoms/TextLink/TextLink";

// Styles
import "./DataCard.scss";

interface TextValue {
    text: string;
    type: "text";
}

interface PillValue extends Omit<IPillProps, "size"> {
    type: "pill";
}

interface TextLinkValue extends Omit<ITextLinkProps, "size"> {
    type: "textLink";
}

type RowValue = PillValue | TextValue | TextLinkValue;

interface RowData {
    key: string;
    value: RowValue;
    infoText?: string;
}

type CardData = RowData[];

interface IDataCardProps {
    /**
     * The data used to draw the DataCard components
     */
    cardData: CardData;
    /**
     * DataCard size
     * Possible values: `medium | large`;
     */
    size?: IKeyValueProps["size"];
    /**
     * Aria role
     */
    role?: AriaRole;
}

const SHOWING_ROWS_COUNT = 6;

const valueRenderer = (value: RowValue) => {
    if (value.type === "pill") {
        return <Pill {...(value as IPillProps)} />;
    }

    if (value.type === "textLink") {
        return <TextLink {...(value as ITextLinkProps)} />;
    }

    return value.text;
};

/**
 * DataCard Component is a row for DataCard component
 */
const DataCard: FC<IDataCardProps> = ({ cardData, role, size = "medium" }) => {
    const [isShowMoreMenuOpen, setIsShowMoreMenuOpen] = useState(false);
    const isShowMoreVisible = cardData.length > SHOWING_ROWS_COUNT;

    // TODO: Remove when menu is implemented
    console.log("isShowMoreMenuOpen", isShowMoreMenuOpen);

    return (
        <div className="dataCard" role={role}>
            {cardData.slice(0, SHOWING_ROWS_COUNT).map(({ key, value, infoText }, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <KeyValue key={index} direction="horizontal" spaceBetween size={size}>
                    <Key infoText={infoText}>{key}</Key>
                    <Value>{valueRenderer(value)}</Value>
                </KeyValue>
            ))}
            <div>
                {isShowMoreVisible && (
                    <Button
                        text="Show more"
                        appearance="secondary"
                        displayType="text"
                        size="large"
                        onClick={() => setIsShowMoreMenuOpen(true)}
                    />
                )}
                <Button text="Actions" appearance="secondary" size="large" onClick={() => {}} />
            </div>
        </div>
    );
};

export { IDataCardProps, DataCard as default };
