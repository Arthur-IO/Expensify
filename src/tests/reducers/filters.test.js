import moment from "moment";
import filtersReducer from '../../reducers/filters'

test('should setup default filters values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY',
        sortType: 'amount'
    })
    expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }
    const action = {
        type: 'SORT_BY',
        sortType: 'date'
    }
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toBe('date')
})

test('should set startDate to date', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: 15000
    })
    expect(state.startDate).toBe(15000)
})

test('should set endDate to date', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: -1323122131
    })
    expect(state.endDate).toBe(-1323122131)
})