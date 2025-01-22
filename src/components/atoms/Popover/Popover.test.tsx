import React from "react";
import { ReactWrapper, mount } from "enzyme";

// Components
import Popover, { IPopoverProps } from "./index";
import GeneUIProvider from "../../providers/GeneUIProvider";
import Button from "../Button";
import PopoverFooter from "./PopoverFooter";
import PopoverFooterActions from "./PopoverFooterActions";

describe("Popover", () => {
    let setup: ReactWrapper<IPopoverProps>;

    const Component = (
        <Popover size="small" padding={0} setProps={() => {}}>
            <div className="swapComponent" style={{ minHeight: "100%", background: "#F4E1EC" }} />
        </Popover>
    );

    beforeEach(() => {
        window.scrollTo = jest.fn();
        setup = mount(Component, {
            wrappingComponent: GeneUIProvider
        });
    });

    const provider = () =>
        setup.getWrappingComponent().setProps({
            children: Component
        });

    afterEach(() => {
        setup.unmount();
    });

    it("renders without crashing", () => {
        expect(setup.exists()).toBeTruthy();
    });

    it("renders children prop correct", () => {
        setup.setProps({ alwaysShow: true });
        expect(provider().find(".swapComponent").exists()).toBeTruthy();
    });

    it("renders title prop correct", () => {
        const title = "test";
        setup.setProps({ alwaysShow: true, title });
        expect(provider().find(".popover__header").text()).toBe(title);
    });

    it.each<IPopoverProps["size"]>(["xLarge", "large", "medium", "small", "mobile"])("should have %p size", (size) => {
        setup.setProps({ alwaysShow: true, size });
        expect(provider().find(`.popover_size_${size}`).exists()).toBeTruthy();
    });

    it("renders PopoverFooterActions child correct", () => {
        const child = "test";
        setup.setProps({
            alwaysShow: true,
            children: (
                <PopoverFooter>
                    <PopoverFooterActions>
                        <Button onClick={() => {}}>{child}</Button>
                    </PopoverFooterActions>
                </PopoverFooter>
            )
        });
        expect(provider().find(Button).first().props().children).toBe({ child });
    });

    it("renders withArrow prop correct", () => {
        setup.setProps({
            withArrow: true,
            alwaysShow: true
        });
        expect(provider().find(".popover__arrowPath").exists()).toBeTruthy();
    });
});
