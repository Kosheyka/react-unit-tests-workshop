import React, { FC } from 'react';
import { create } from 'react-test-renderer';

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
    message: IMessage,
}

export const Component: FC<IComponent> = ({ title, message }) => {
    return <div>
        <h1>{title}</h1>
        <h3>{message.text}</h3>
        <BaseButton />
    </div>;
};

it('Should render correctly', () => {
    const messageStub: IMessage = {
        text: 'qwewqewq',
    } as IMessage;

    const component = create(<Component title={'hello'} message={messageStub} />);
    expect(component.toJSON()).toMatchSnapshot();
});
