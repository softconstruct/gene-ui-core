import React, { FC } from "react";
import classNames from "classnames";
// Styles
import "./Profile.scss";
import { CaretDown } from "@geneui/icons";
import Avatar from "../../atoms/Avatar";

interface IProfileProps {
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
    // fill Profile component props interface
}

/**
 * Profile component provides users with access to quick actions, including links to settings, personal preferences, and other utility functions such.
 */
const Profile: FC<IProfileProps> = ({ className }) => {
    return (
        <div className={classNames("profile", className)}>
            {/* Add tabindex for profile */}
            <Avatar className="profile__avatar" />
            <div className="profile__content">
                <span className="profile__text">@username</span>
                <CaretDown className="profile__icon" size={20} />
            </div>
        </div>
    );
};

export { IProfileProps, Profile as default };
