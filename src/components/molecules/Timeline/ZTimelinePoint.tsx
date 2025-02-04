import React, { FC } from "react";
import classNames from "classnames";
// Styles
import "./Timeline.scss";
import { CircleFilled, Clock } from "@geneui/icons";
import Divider from "../../atoms/Divider";

interface ITimelineProps {
    /**
     * Timeline direction <br/>
     * Possible values: `vertical | horizontal`
     */
    direction?: "vertical" | "horizontal";
    /**
     * The title of the timeline item.
     */
    title: string;
    /**
     * A detailed description or context for the timeline item.
     */
    description: string;
    /**
     * The current status of the timeline item.
     * Possible values:
     * - 'default': The default state.
     * - 'active': The item is currently active or being processed.
     * - 'success': The item has completed successfully.
     * - 'error': The item encountered an error.
     * - 'pending': The item is waiting to be processed.
     */
    status: "default" | "active" | "success" | "error" | "pending";
}

/**
 * Timeline component is used to display a sequence of events in chronological order. It provides a clear visual representation of a series of activities, milestones, or steps, helping users understand the progression and flow of events over time.
 */

const TimelinePoint: FC<ITimelineProps> = ({ direction = "vertical", title, status, description }) => {
    return (
        <div className="timeline__element">
            <div className={classNames(`timeline__status timeline__status_${status}`)}>
                {status === "pending" ? (
                    <Clock size={20} className="timeline__status_icon" />
                ) : (
                    <CircleFilled size={20} className="timeline__status_icon" />
                )}
                <Divider className="timeline__status_divider" vertical={direction === "vertical"} />
            </div>
            <div className="timeline__content">
                <p className="timeline__title">{title}</p>
                <p className="timeline__description">{description}</p>
            </div>
        </div>
    );
};

export { ITimelineProps, TimelinePoint as default };
