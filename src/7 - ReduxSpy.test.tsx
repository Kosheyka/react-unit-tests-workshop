import React, { FC } from 'react';
import { useSelector } from 'react-redux';

interface IData {
    text: string,
    title: string,
}
type TState = { data: IData };

const TextReduxSendComponent: FC = () => {
    const { text, title } = useSelector((state: TState) => state.data);

    return <>
        <h1>{title}</h1>
        <div data-test='text'>{text}</div>
    </>;
};

import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';

const init = (props: Partial<IData>) => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ ...props });
    const component = shallow(<TextReduxSendComponent />);

    return { component };
};

describe('TextReduxSendComponent', () => {
    it('Should render text from store', () => {
        const { component } = init({ text: 'qwewqewq' });

        const text = component.find('[data-test="text"]');
        expect(text.text()).toBe('qwewqewq');
    });

    it('Should render 2nd text from store', () => {
        const { component } = init({ text: '343534' });

        const text = component.find('[data-test="text"]');
        expect(text.text()).toBe('343534');
    });
});
