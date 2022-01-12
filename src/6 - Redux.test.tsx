import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shallow } from 'enzyme';

type TState = { text: string, title: string };

// Одно из решений смотреть тут: frontend/src/components/Footer/emailWidget/__tests__/email-widget.test.js

export const TextReduxSendComponent: FC = () => {
    const dispatch = useDispatch();
    const text = useSelector((state: TState) => state.text);
    const title = useSelector((state: TState) => state.title);

    const clickHandler = useCallback(() => {
        dispatch({
            type: 'send',
            payload: 'hello, world',
        });
    }, [dispatch]);

    return <>
        <h1>{title}</h1>
        <div data-test='text'>{text}</div>
        <button onClick={clickHandler} disabled={!text}/>
    </>;
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn()
        .mockImplementationOnce(() => 'teesss112232123')
        .mockImplementationOnce(() => 'Title'),
    useDispatch: () => jest.fn(() => {
        mockDispatch();
    }),
}));

describe('TextReduxSendComponent', () => {
    const component = shallow(<TextReduxSendComponent />);

    it('Should render text from store', () => {
        const element = component.find('[data-test="text"]');
        expect(element.text()).toBe('teesss112232123');
    });

    it('Should render title from store', () => {
        const element = component.find('h1');
        expect(element.text()).toBe('Title');
    });

    it('Should call click action', () => {
        const button = component.find('button');
        button.simulate('click');
        expect(mockDispatch).toBeCalled();
    });
});
