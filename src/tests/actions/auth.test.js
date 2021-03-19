import React from "react";
import {login, logout} from "../../actions/auth";

test('should setup login action object correctly', () => {
    const uid = '123123412'
    const action = login(uid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('should setup logout action object correctly', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})