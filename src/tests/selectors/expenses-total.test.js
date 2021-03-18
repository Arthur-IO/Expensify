import React from 'react'
import getExpensesTotal from '../../selectors/expenses-total'
import expenses from "../fixtures/expenses";

test('should return 0 if no expenses', () => {
    const result = getExpensesTotal([])
    expect(result).toBe(0)
})

test('should correctly add up a single expense', () => {
    const result = getExpensesTotal([expenses[0]])
    expect(result).toBe(expenses[0].amount)
})

test('should correctly add up multiple expenses', () => {
    const expectedResult = 1150
    const result = getExpensesTotal(expenses)
    expect(result).toBe(expectedResult)
})