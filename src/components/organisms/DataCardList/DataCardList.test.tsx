import React from "react";
import { ReactWrapper, mount } from "enzyme";

// Components
import DataCardList, { IDataCardListProps } from "./index";

const data: IDataCardListProps["data"] = [[{ key: "test", value: { text: "Description", type: "pill" } }]];

describe("DataCard ", () => {
    let setup: ReactWrapper<IDataCardListProps>;
    beforeEach(() => {
        setup = mount(<DataCardList data={data} />);
    });

    it("renders without crashing", () => {
        expect(setup.exists()).toBeTruthy();
    });

    it("renders className prop correctly", () => {
        const className = "test-class";
        const wrapper = setup.setProps({ className });

        expect(wrapper.hasClass(className)).toBeTruthy();
    });
});
