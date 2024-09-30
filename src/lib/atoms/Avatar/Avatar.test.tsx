import React, { MouseEvent } from 'react';
import { ReactWrapper, mount } from 'enzyme';

// Components
import Avatar, { IAvatarProps } from './index';

describe('Avatar ', () => {
    let setup: ReactWrapper<IAvatarProps>;
    beforeEach(() => (setup = mount(<Avatar />)));
    const mockFn = jest.fn();

    it('renders without crashing', () => {
        expect(setup.exists()).toBeTruthy();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders fullName prop correctly', () => {
        const wrapper = setup.setProps({ fullName: 'test data' });
        expect(wrapper.text()).toBe('t d');
    });

    it('renders src prop correctly', () => {
        const src = 'test';
        const wrapper = setup.setProps({ src });

        expect(wrapper.find('img').props().src).toBe(src);
    });
    it('renders isDisabled prop correctly', () => {
        const wrapper = setup.setProps({ isDisabled: true });

        expect(wrapper.find('.avatar').hasClass('avatar_disabled')).toBeTruthy();
    });

    it('renders onClick prop correctly', () => {
        const wrapper = setup.setProps({ onClick: mockFn });
        const event = {
            currentTarget: {
                innerHTML: 'test'
            }
        } as MouseEvent<HTMLDivElement>;
        wrapper.find('div').props().onClick!(event);
        expect(mockFn).toHaveBeenCalledWith(event);
    });

    it.each<IAvatarProps['color']>(['blue', 'green', 'lagoon', 'neutral', 'orange', 'purple', 'red'])(
        'checking a component with a prop color : %p',
        (color) => {
            const wrapper = setup.setProps({ color });
            expect(wrapper.find('.avatar').hasClass(`avatar_color_${color}`)).toBeTruthy();
        }
    );

    it.each<IAvatarProps['size']>(['6Xlarge', 'large', 'medium', 'small'])(
        'checking a component with a prop size : %p',
        (size) => {
            const wrapper = setup.setProps({ size });

            expect(wrapper.find('.avatar').hasClass(`avatar_size_${size}`)).toBeTruthy();
        }
    );

    it('renders className prop correctly', () => {
        const className = 'test-class';
        const wrapper = setup.setProps({ className });

        expect(wrapper.hasClass(className)).toBeTruthy();
    });
});
