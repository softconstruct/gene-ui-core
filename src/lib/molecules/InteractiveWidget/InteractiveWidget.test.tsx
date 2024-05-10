import React from 'react';
import { ReactWrapper, mount, shallow } from 'enzyme';

// Components
import InteractiveWidget, { IInteractiveWidgetProps } from './index';
import { GeneUIProvider, Tag } from '../../../index';
import Avatar from '../../atoms/Avatar';

describe('InteractiveWidget', () => {
    let setup: ReactWrapper<IInteractiveWidgetProps>;

    beforeEach(() => {
        setup = mount(<InteractiveWidget />, { wrappingComponent: GeneUIProvider });
    });

    it('renders without crashing', () => {
        expect(setup.exists()).toBeTruthy();
    });

    it('renders className prop correctly', () => {
        const className = 'test-class';
        const wrapper = setup.setProps({ className });

        expect(wrapper.find(`.${className}`).exists()).toBeTruthy();
    });

    it('renders withBorder prop correctly', () => {
        const wrapper = setup.setProps({ withBorder: false });

        expect(wrapper.find('.interactiveWidget-border').exists()).toBeFalsy();
    });

    it('renders disabled prop correctly', () => {
        const wrapper = setup.setProps({ disabled: true });

        expect(wrapper.find('.interactiveWidget-disabled').exists()).toBeTruthy();
    });

    it('renders icon prop correctly', () => {
        const wrapper = setup.setProps({ icon: 'bc-icon-dropdown', appearance: 'default' });

        expect(wrapper.find('.widgetIcon__iconDefault').exists()).toBeTruthy();
    });

    it('renders title prop correctly', () => {
        const wrapper = setup.setProps({ title: 'title' });

        expect(wrapper.find('.interactiveWidget__title').exists()).toBeTruthy();
    });

    it('renders titleInfo prop correctly', () => {
        const wrapper = setup.setProps({ title: 'title', titleInfo: 'titleInfo' });

        expect(wrapper.find('.interactiveWidget__infoIcon').exists()).toBeTruthy();
    });

    it.each<IInteractiveWidgetProps['appearance']>(['default', 'compact'])(
        'renders appearance %s prop correctly',
        (appearance) => {
            const wrapper = setup.setProps({
                appearance
            });
            expect(wrapper.find(`.interactiveWidget__header-${appearance}`).exists()).toBeTruthy();
        }
    );

    it('renders iconColor prop correctly', () => {
        const iconColor = '#ffffff';
        const wrapper = setup.setProps({ iconColor, icon: 'bc-icon-dropdown' });
        const widgetIcon = wrapper.find('.widgetIcon').getDOMNode() as HTMLDivElement;
        // @ts-ignore
        const backgroundColor = widgetIcon.style._values['--icon-color'];

        expect(backgroundColor).toEqual(iconColor);
    });

    it('renders iconBackground prop correctly', () => {
        const wrapper = setup.setProps({ iconBackground: true, icon: 'bc-icon-dropdown' });

        expect(wrapper.find('.widgetIcon__background').exists()).toBeTruthy();
    });

    it('calls onClick prop when clicked', () => {
        const onClickMock = jest.fn();
        const wrapper = shallow(<InteractiveWidget onClick={onClickMock} />);
        wrapper.simulate('click');
        expect(onClickMock).toHaveBeenCalled();
    });

    it('calls tagProps prop when clicked', () => {
        // const wrapper = setup.setProps({tagProps: {label:'label'} });
        // expect(wrapper.find(Tag).props().label).toEqual('label')
    });
});
