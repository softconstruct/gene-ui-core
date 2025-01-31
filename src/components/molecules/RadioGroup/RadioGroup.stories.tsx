import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import RadioGroup, { IRadioGroupProps } from "./index";

const meta: Meta<typeof RadioGroup> = {
    title: "Molecules/RadioGroup",
    component: RadioGroup,
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance })
        // fill RadioGroup component argTypes
    },
    args: {
        // fill RadioGroup component args
    } as IRadioGroupProps
};

export default meta;

const Template: FC<IRadioGroupProps> = (props) => <RadioGroup {...props} />;

export const Default = Template.bind({});

Default.args = {} as IRadioGroupProps;
