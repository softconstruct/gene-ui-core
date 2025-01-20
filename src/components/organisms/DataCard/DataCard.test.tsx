import React from "react";
import { ReactWrapper, mount } from "enzyme";

// Components
import DataCard, { IDataCardProps } from "./index";

describe("Datacard ", () => {
    let setup: ReactWrapper<IDataCardProps>;
    beforeEach(() => {
        setup = mount(<DataCard />);
    });

    it("renders without crashing", () => {
        expect(setup.exists()).toBeTruthy();
    });

    it("renders className prop correctly", () => {
        const className = "test-class";
        const wrapper = setup.setProps({ className });

        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    // Your tests here
});
