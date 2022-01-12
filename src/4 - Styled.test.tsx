import React from 'react';
import styled from 'styled-components';
import 'jest-styled-components';
import { shallow } from 'enzyme';

export const MyButton = styled.button<{ isDisabled: boolean }>`
    width: 100px;
    background: ${p => p.isDisabled ? 'red' : 'green' };
`;

const Component = ({ count = 0 }) => {
    return <>
        <div>asdasda</div>
        <MyButton isDisabled={count === 0} data-test='button'/>
    </>;
};

describe('Component button color', () => {
    it('Should render green button', () => {
        const component = shallow(<Component count={1} />);
        const button = component.find('[data-test="button"]');
        expect(button).toHaveStyleRule('background', 'green');
    });

    it('Should render red button', () => {
        const component = shallow(<Component count={0} />);
        const button = component.find('[data-test="button"]');
        expect(button).toHaveStyleRule('background', 'red');
    });
});
