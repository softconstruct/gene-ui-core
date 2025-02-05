import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import Text, { ITextProps } from "./index";

const meta: Meta<typeof Text> = {
    title: "Atoms/Text",
    component: Text,
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance }),
        children: args({ control: "text", ...propCategory.content }),
        variant: args({ control: "select", ...propCategory.appearance }),
        as: args({ control: "select", ...propCategory.appearance }),
        alignment: args({ control: "select", ...propCategory.appearance })
    },
    args: {
        children: "Text content",
        variant: "headingLargeSemibold"
    } as ITextProps
};

export default meta;

const Template: FC<ITextProps> = (props) => {
    const { children } = props;
    return (
        <Text as="h1" {...props}>
            {children}
        </Text>
    );
};

export const Default = Template.bind({});
