import React from "react";
import authReducer from '../../reducers/auth'

test('should set login uid', () => {
    const action = {
        type: 'LOGIN',
        uid: '123'
    }
    const state = authReducer(undefined, action)
    expect(state.uid).toBe('123')
})

test('should logout from store', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ auth: '123' }, action)
    expect(state).toEqual({})
})