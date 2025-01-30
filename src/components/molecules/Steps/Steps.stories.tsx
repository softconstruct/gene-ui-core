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
        label: args({ control: "text", ...propCategory.content }),
        description: args({ control: "text", ...propCategory.content }),
        direction: args({ control: "select", ...propCategory.appearance }),
        type: args({ control: "select", ...propCategory.appearance }),
        isLinear: args({ control: "boolean", ...propCategory.functionality }),
        isLoading: args({ control: "boolean", ...propCategory.states }),
        disabled: args({ control: "boolean", ...propCategory.states }),
        error: args({ control: "boolean", ...propCategory.states }),
        state: args({ control: "select", ...propCategory.states }),
        onChange: args({ control: "false", ...propCategory.states }),
        children: args({ control: "false", ...propCategory.content })
    },
    args: {
        label: "Label",
        description: "Description",
        direction: "vertical",
        isLinear: false
    } as IStepsProps
};

export default meta;

const Template: FC<IStepsProps> = (props) => {
    const testSteps = [
        { description: "description", id: 1 },
        { label: "test 2", description: "description", id: 2 },
        { label: "test 3", description: "description", id: 3, type: "dot", disabled: true },
        { label: "test 4", id: 4, isLoading: false }
    ];

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
