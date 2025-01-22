import React, { FC, useState } from "react";
import classNames from "classnames";
// Styles
import "./TagGroup.scss";
import { ChevronDown, ChevronUp } from "@geneui/icons";
import Tag from "../Tag";
import { Button } from "../../../index";

interface ITagGroupProps {
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
    // fill TagGroup component props interface
}

/**
 * Tag Group displays a list of selected options, offering a clear and organized way to present chosen items.
 */
const TagGroup: FC<ITagGroupProps> = ({ className }) => {
    // todo: refactor functional part if needed
    const [isExpanded, setIsExpanded] = useState(false);
    const moreTagsQuantity = 12;
    const toggleText = () => setIsExpanded((prev) => !prev);
    const removeTag = () => {
        console.log("remove tag");
    };

    return (
        <div className={classNames(`tagGroup ${isExpanded ? "tagGroup_extended" : ""}`, className)}>
            <div className="tagGroup__container">
                <div className="tagGroup__tags">
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                    <Tag text="Tag" onClose={removeTag} />
                </div>
            </div>
            <Button
                className="tagGroup__showButton"
                appearance="secondary"
                size="small"
                displayType="text"
                iconAfter
                Icon={isExpanded ? ChevronUp : ChevronDown}
                text={isExpanded ? "Show less" : `Show ${moreTagsQuantity} more`}
                onClick={toggleText}
            />
        </div>
    );
};

export { ITagGroupProps, TagGroup as default };
