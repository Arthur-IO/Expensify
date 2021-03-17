import React from "react";
import {shallow} from 'enzyme'
import ExpenseListItem from "../../components/ExpenseListItem";

test('should render ExpenseListItem with provided information', () => {
    const wrapper = shallow(
        <ExpenseListItem
            id={2352345}
            description={"Orange soda"}
            amount={300}
            createdAt={12341324423}
        />
    )
    expect(wrapper).toMatchSnapshot()
})