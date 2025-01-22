import React, { PropsWithChildren } from "react";

const PopoverFooterActions = ({ children }: PropsWithChildren) => {
    return (
        <div className="popover__footer_buttons">
            <div className="popover__footer_buttons">{children}</div>
        </div>
    );
};
export default PopoverFooterActions;
