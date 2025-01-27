import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import Switch, { ISwitchProps } from "./index";

const meta: Meta<typeof Switch> = {
    title: "Molecules/Switch",
    component: Switch,
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance }),
        label: args({ control: "text", ...propCategory.content }),
        helperText: args({ control: "text", ...propCategory.content }),
        labelAlignment: args({ control: "select", ...propCategory.appearance }),
        disabled: args({ control: "boolean", ...propCategory.states }),
        readonly: args({ control: "boolean", ...propCategory.states })
        // fill Switch component argTypes
    },
    args: {
        label: "Label",
        helperText: "Helper Text",
        disabled: false,
        readonly: false,
        labelAlignment: "after"
        // fill Switch component args
    } as ISwitchProps
};

export default meta;

const Template: FC<ISwitchProps> = (props) => <Switch {...props} />;

export const Default = Template.bind({});

Default.args = {} as ISwitchProps;
