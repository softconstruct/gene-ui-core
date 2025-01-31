import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import StepsComponent, { IStepsProps } from "./Steps";
import Step from "./Step";

const meta: Meta<typeof StepsComponent> = {
    title: "Molecules/Steps",
    component: StepsComponent,
    subcomponents: { Step },
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance }),
        direction: args({ control: "select", ...propCategory.appearance }),
        type: args({ control: "select", ...propCategory.appearance }),
        isLinear: args({ control: "boolean", ...propCategory.functionality }),
        isLoading: args({ control: "boolean", ...propCategory.states }),
        disabled: args({ control: "boolean", ...propCategory.states }),
        onChange: args({ control: "false", ...propCategory.action }),
        children: args({ control: "false", ...propCategory.content })
    },
    args: {
        direction: "vertical",
        isLinear: false
    } as IStepsProps
};

export default meta;

const testSteps = [
    { label: "Step 1", description: "description 1", id: 1, state: "complete" },
    { label: "Step 2", description: "description 2", id: 2, state: "complete" },
    { label: "Step 3", description: "description 3", id: 3, state: "current" },
    { label: "Step 4", id: 4, isLoading: false }
];

const Template: FC<IStepsProps> = (props) => {
    return (
        <StepsComponent {...props}>
            {testSteps.map((step) => {
                return <Step {...step} key={step.id} />;
            })}
        </StepsComponent>
    );
};

export const Steps = Template.bind({});
