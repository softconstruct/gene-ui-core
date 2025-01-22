import React, { PropsWithChildren } from "react";

const PopoverBody = ({ children }: PropsWithChildren) => {
    return (
        <div className="popover__body">
            <div className="popover__content">{children} </div>
        </div>
    );
};

export default PopoverBody;
