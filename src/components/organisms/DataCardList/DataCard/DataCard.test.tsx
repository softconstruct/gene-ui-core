import React from "react";
import { ReactWrapper, mount } from "enzyme";

// Components
import DataCard, { IDataCardProps } from "./index";

describe("DataCard ", () => {
    let setup: ReactWrapper<IDataCardProps>;
    beforeEach(() => {
        setup = mount(
            <DataCard cardData={[{ key: "Test", value: { text: "test", type: "text" } }]} onActionsClick={() => {}} />
        );
    });

    it("renders without crashing", () => {
        expect(setup.exists()).toBeTruthy();
    });
});
