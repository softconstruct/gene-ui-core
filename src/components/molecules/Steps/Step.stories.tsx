import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import Step, { IStepProps } from "./Step";
import Steps from "./Steps";

const meta: Meta<typeof Step> = {
    title: "Molecules/Steps",
    component: Step,
    argTypes: {
        direction: args({ control: "select", ...propCategory.appearance }),
        type: args({ control: "select", ...propCategory.appearance }),
        isLoading: args({ control: "boolean", ...propCategory.states }),
        error: args({ control: "boolean", ...propCategory.states }),
        disabled: args({ control: "boolean", ...propCategory.states }),
        id: args({ control: "false", ...propCategory.content }),
        state: args({ control: "select", ...propCategory.appearance }),
        label: args({ control: "text", ...propCategory.content }),
        description: args({ control: "text", ...propCategory.content }),
        stepNumber: args({ control: "number", ...propCategory.content }),
        onChange: args({ control: "false", ...propCategory.functionality })
    },
    args: {
        label: "Label",
        description: "Description"
    } as IStepProps
};

export default meta;

const Template: FC<IStepProps> = (props) => {
    const { direction } = props;
    return (
        <Steps direction={direction}>
            <Step {...props} id={11} />
            <Step {...props} id={12} />
        </Steps>
    );
};

export const SingleStep = Template.bind({});
