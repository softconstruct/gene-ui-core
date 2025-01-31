import React from "react";
import { ReactWrapper, mount } from "enzyme";

// Components
import CheckboxGroup, { ICheckboxGroupProps } from "./index";

describe("CheckboxGroup ", () => {
    let setup: ReactWrapper<ICheckboxGroupProps>;
    beforeEach(() => {
        setup = mount(<CheckboxGroup />);
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
