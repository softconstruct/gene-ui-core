import React from "react";
import { ReactWrapper, mount } from "enzyme";

// Components
import Timelines, { ITimelinesProps } from "./Timelines";
// import { IDataItem } from "./Timeline";
// import GeneUIProvider from "../../providers/GeneUIProvider";
import TimelinePoint from "./ZTimelinePoint";

// const inlineData: IDataItem[] = [
//     { title: 'Task A', description: 'Description A', status: 'active' },
//     { title: 'Task B', description: 'Description B', status: 'error' },
//     { title: 'Task C', description: 'Description C', status: 'pending' }
// ];

// const a = { title: 'Task A', description: 'Description A', status: 'active' };

describe("Timeline ", () => {
    let setup: ReactWrapper<ITimelinesProps>;
    beforeEach(() => {
        setup = mount(
            <Timelines direction="vertical">
                <TimelinePoint title="Task A" description="Description A" status="active" />
            </Timelines>
        );
    });

    it("renders without crashing", () => {
        expect(setup.exists()).toBeTruthy();
    });

    // it("renders className prop correctly", () => {
    //     const className = "test-class";
    //     const wrapper = setup.setProps({ className });

    //     expect(wrapper.hasClass(className)).toBeTruthy();
    // });

    // it("renders title and description correctly", () => {
    //     const wrapperData = setup.props().data;
    //     const elements = setup.find(".timeline__element");

    //     elements.forEach((element, index) => {
    //         expect(element.find(".timeline__title").text()).toBe(wrapperData[index].title);
    //         expect(element.find(".timeline__description").text()).toBe(wrapperData[index].description);
    //     });
    // });

    // it("renders correct status classes", () => {
    //     const testCases: { status: IDataItem["status"]; }[] = [
    //         { status: "active" },
    //         { status: "error" },
    //         { status: "pending" },
    //     ];

    //     const elements = setup.find(".timeline__element");

    //     testCases.forEach(({ status }, index) => {
    //         const statusElement = elements.at(index).find(".timeline__status");
    //         expect(statusElement.exists()).toBeTruthy();
    //         expect(statusElement.hasClass(`timeline__status_${status}`)).toBeTruthy();
    //     });
    // });

    // it("applies correct direction class", () => {
    //     const testCases: { direction: ITimelineProps["direction"]; }[] = [
    //         { direction: "vertical" },
    //         { direction: "horizontal" },
    //     ];

    //     testCases.forEach(({ direction }) => {
    //         const wrapper = mount(<Timeline data={inlineData} direction={direction} />);
    //         expect(wrapper.find(".timeline").hasClass(`timeline_direction_${direction}`)).toBeTruthy();
    //     });
    // });

    // it("applies correct position class", () => {
    //     const testCases: { position: ITimelineProps["position"]; direction?: ITimelineProps["direction"]; }[] = [
    //         { position: "after" },
    //         { position: "before" },
    //         { position: "top", direction: "horizontal" },
    //         { position: "bottom", direction: "horizontal" },
    //         { position: "alternate" },
    //     ];

    //     testCases.forEach(({ position, direction }) => {
    //         const wrapper = mount(<Timeline data={inlineData} position={position} direction={direction} />);
    //         const result = (wrapper.props().direction === 'vertical' && (position === 'top' || position === 'bottom')) ? 'after' : position;

    //         expect(wrapper.find(".timeline").hasClass(`timeline_position_${result}`)).toBeTruthy();
    //     });
    // });

    // it("handles empty data array", () => {
    //     const emptyData: IDataItem[] = [];
    //     const wrapper = mount(<Timeline data={emptyData} />);
    //     expect(wrapper.find(".timeline__element").exists()).toBeFalsy();
    // });

    // it("handles null data prop", () => {
    //     const wrapper = mount(<Timeline data={null as unknown as IDataItem[]} />);
    //     expect(wrapper.find(".timeline__element").exists()).toBeFalsy();
    // });
});
