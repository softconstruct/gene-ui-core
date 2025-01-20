import React, { FC } from "react";
import { Meta } from "@storybook/react";

// Helpers
import { args, propCategory } from "../../../../stories/assets/storybook.globals";

// Components
import DataCard, { IDataCardProps } from "./index";

const meta: Meta<typeof DataCard> = {
    title: "Organisms/Datacard",
    component: DataCard,
    argTypes: {
        className: args({ control: "false", ...propCategory.appearance })
        // fill DataCard component argTypes
    },
    args: {
        // fill DataCard component args
    } as IDataCardProps
};

export default meta;

const Template: FC<IDataCardProps> = (props) => <DataCard {...props} />;

export const Default = Template.bind({});

Default.args = {} as IDataCardProps;
