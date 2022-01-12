import React, { FC } from 'react';
import { mount, shallow } from 'enzyme';

const BaseButton: FC = () => {
    return <div className='button__wrapper'>
        <button>Click me</button>
    </div>;
};

export interface IMessage {
    id: string;
    entityType: unknown;
    text: string;
    isRead: boolean;
    createdAt?: {
        date: string;
        time: string;
    };
    attachments?: unknown;
}

interface IComponent {
    title: string,
    message?: IMessage,
}

export const Component: FC<IComponent> = ({ title, message }) => {
    return <div>
        <h1>{title}</h1>
        {message?.isRead && <h2>{message.text}</h2>}
        <BaseButton />
    </div>;
};

it('Test simple component', () => {
    const componentShallow = shallow(<Component title={'qwewqewq'}/>);
    console.log(componentShallow.debug());

    const componentMount = mount(<Component title={'qwewqewq'}/>);
    console.log(componentMount.debug());

    expect(1).toBe(2);
});

it('Should render title', () => {
    const componentShallow = shallow(<Component title={'hello'}/>);
    const title = componentShallow.find('h1');

    expect(title.text()).toBe('hello');
});

describe('Component message title', () => {
    it('Should render h2', () => {
        const messageStub: IMessage = {
            isRead: true,
            text: 'qwewqewq',
        } as IMessage;

        const component = shallow(<Component title={'hello'} message={messageStub} />);
        const title = component.find('h2');

        expect(title.length).toBeGreaterThan(0);
        expect(title.text()).toBe(messageStub.text);
    });

    it('Should not render h2', () => {
        const text = 'test';
        const messageStub: IMessage = {
            isRead: false,
            text,
        } as IMessage;

        const component = shallow(<Component title={'hello'} message={messageStub} />);
        const title = component.find('h2');

        expect(title.length).toBe(0);
    });
});
