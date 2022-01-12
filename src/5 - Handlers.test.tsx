import React from 'react';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { mount, ReactWrapper } from 'enzyme';

export const TextSendComponent: FC<{ send: (text: string) => void }> = ({ send }) => {
    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const clickHandler = useCallback(() => {
        send(text);
    }, [send, text]);

    return <>
        <input value={text} onChange={handleChange} />
        <button onClick={clickHandler} disabled={!text}/>
    </>;
};

describe('TextSendComponent', () => {
    const sendMock = jest.fn();
    let component: ReactWrapper;
    beforeEach(() => {
        component = mount(<TextSendComponent send={sendMock}/>);
    });

    it('Should be render initial input', () => {
        const input = component.find('input');
        expect(input.prop('value')).toBe('');
    });

    it('Should be change input', () => {
        let input = component.find('input');
        input.simulate('change', { target: { value: 'asdasd' } });
        input = component.find('input');
        expect(input.prop('value')).toBe('asdasd');
    });

    it('Should be call send', () => {
        const input = component.find('input');
        input.simulate('change', { target: { value: 'asdasd' } });
        const button = component.find('button');
        button.simulate('click');

        expect(sendMock).toBeCalled();
    });
});

describe('TextSendComponent', () => {
    const sendMock = jest.fn();
    let component: ReactWrapper;
    component = mount(<TextSendComponent send={sendMock}/>);

    it('Should not to be call send', () => {
        const button = component.find('button');
        button.simulate('click');

        expect(sendMock).not.toBeCalled();
    });
});
