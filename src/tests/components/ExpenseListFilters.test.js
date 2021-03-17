import React from "react";
import {shallow} from 'enzyme'
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from "moment";

let setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByAmount = jest.fn()
    sortByDate = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
})

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt filters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should handle text filter change', () => {
    wrapper.find('input').at(0).simulate('change', {
        target: {
            value: 'billy'
        }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith('billy')
})

test('should handle sortBy change to date', () => {
    wrapper.find('select').at(0).simulate('change', {
        target: {
            value: 'date'
        }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('should handle sortBy change to amount', () => {
    wrapper.find('select').at(0).simulate('change', {
        target: {
            value: 'amount'
        }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('should handle onDateChanged', () => {
    const startDate = moment(0)
    const endDate = moment(0).add(3, 'days')
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle onFocusChanged', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')('startDate')
    expect(wrapper.state('calendarFocused')).toBe('startDate')
})

test('arthur knows how to test', () => {
    expect(true).toBe(true)
})