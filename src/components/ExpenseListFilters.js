import React from "react";
import {connect} from "react-redux";
import {setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate} from "../actions/filters";
import {DateRangePicker} from 'react-dates'

// The ExpenseList filters to filter or sort list items

export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChanged = (focusedInput) => {
        this.setState({
            calendarFocused: focusedInput
        })
    }

    onTextChanged = (e) => {
        const filterText = e.target.value
        this.props.setTextFilter(filterText)
    }

    onSortByChanged = (e) => {
        const value = e.target.value
        if (value === 'date') {
            this.props.sortByDate()
        } else {
            this.props.sortByAmount()
        }
    }

    render() {
        return (
            <div className={"content-container"}>
                <div className={"input-group"}>
                    <div className={"input-group__item"}>
                        <input
                            className={"text-input"}
                            placeholder={"Search Expenses"}
                            type="text"
                            value={this.props.filters.text}
                            onChange={this.onTextChanged}
                        />
                    </div>
                    <div className={"input-group__item"}>
                        <select
                            className={"select"}
                            value={this.props.filters.sortBy}
                            onChange={this.onSortByChanged}
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className={"input-group__item"}>
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChanged}
                            isOutsideRange={() => false}
                            numberOfMonths={1}
                            showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (filterText) => dispatch(setTextFilter(filterText)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)