import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import Steps, { IStepsProps } from "./index";
import Step from "./Step";

const meta: Meta<typeof Steps> = {
    title: "Molecules/Steps",
    component: Steps,
    subcomponents: { Step },
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance }),
        direction: args({ control: "select", ...propCategory.appearance }),
        type: args({ control: "select", ...propCategory.appearance }),
        isLinear: args({ control: "boolean", ...propCategory.functionality }),
        isLoading: args({ control: "boolean", ...propCategory.states }),
        disabled: args({ control: "boolean", ...propCategory.states }),
        onChange: args({ control: "false", ...propCategory.states }),
        children: args({ control: "false", ...propCategory.content })
    },
    args: {
        direction: "vertical",
        isLinear: false
    } as IStepsProps
};

export default meta;

const testSteps = [
    { description: "description", id: 1, state: "complete" },
    { label: "test 2", description: "description", id: 2, state: "complete" },
    { label: "test 3", description: "description", id: 3, state: "current" },
    { label: "test 4", id: 4, isLoading: false }
];

const Template: FC<IStepsProps> = (props) => {
    return (
        <Steps {...props}>
            {testSteps.map((step) => {
                return <Step {...step} key={step.id} />;
            })}
        </Steps>
    );
};

export const Default = Template.bind({});

Default.args = {} as IStepsProps;
