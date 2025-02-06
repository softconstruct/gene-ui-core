import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import TimelinesComponent, { ITimelinesProps } from "./Timelines";
import TimelinePoint from "./TimelinePoint";

const meta: Meta<typeof TimelinesComponent> = {
    title: "Molecules/Timeline",
    component: TimelinesComponent,
    subcomponents: { TimelinePoint },
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance }),
        direction: args({ control: "select", ...propCategory.appearance }),
        position: args({ control: "select", ...propCategory.appearance })
    },
    args: {
        direction: "vertical",
        position: "after"
    } as ITimelinesProps
};

export default meta;

const inlineData = [
    { title: "Task A", description: "Description A", status: "active" },
    { title: "Task B", description: "Description B", status: "error" },
    { title: "Task C", description: "Description C", status: "pending" },
    { title: "Task D", description: "Description D", status: "default" },
    { title: "Task E", description: "Description E", status: "success" }
] as const;

const Template: FC<ITimelinesProps> = (props) => {
    return (
        <TimelinesComponent {...props}>
            {inlineData.map((timeline) => {
                return <TimelinePoint {...timeline} />;
            })}
        </TimelinesComponent>
    );
};
export const Timelines = Template.bind({});
