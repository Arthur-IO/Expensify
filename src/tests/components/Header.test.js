import React from 'react'
import { shallow } from 'enzyme'
import {Header} from '../../components/Header'
import {startLogout} from "../../actions/auth";

test('should render header correctly', () => {
    const wrapper = shallow(<Header startLogout={startLogout()}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should call start logout on button click', () => {
    const startLogout = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogout()}/>)
    wrapper.find('button').at(0).simulate('click')
    expect(startLogout).toHaveBeenCalled()
})