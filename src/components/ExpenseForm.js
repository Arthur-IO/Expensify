import React from "react";
import moment from 'moment'
import {SingleDatePicker} from 'react-dates';

// A form that takes in data to create a new expense

export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: false
        }
    }

    /**
     * An action that is fired when the description input is changed
     * @param e The [Event] that is passed into this function
     */
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({description}))
    }
    /**
     * An action that is fired when the note input is changed
     * @param e The [Event] that is passed into this function
     */
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({note}))
    }
    /**
     * An action that is fired when the amount input is changed
     * @param e The [Event] that is passed into this function
     */
    onAmountChange = (e) => {
        const amount = e.target.value
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}))
        }
    }
    /**
     * An action that is fired when the date selector is changed
     * @param createdAt     The date selected by the date picker
     */
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({createdAt}))
        }
    }
    /**
     * An action that is fired when the calendar input is clicked
     * @param calendarFocused       A flag that determines if the date picker is focused
     */
    onFocusChange = ({focused: calendarFocused}) => {
        this.setState(() => ({calendarFocused}))
    }

    /**
     * Submits this form to attempt to add it to the expense list
     * @param e The [Event] that is passed into this function
     */
    onSubmit = (e) => {
        e.preventDefault()
        if (!this.state.description || !this.state.amount) {
            // Displays an error if the following inputs have no value
            this.setState(() => ({error: true}))
        } else {
            // Clears a potential error if the following inputs have no value
            this.setState(() => ({error: false}))

            // Submits this expense with the provided information
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }

    render() {
        return (
            <form
                className={"form"}
                onSubmit={this.onSubmit}
            >
                {
                    this.state.error && <p className={"form__error"}>Please provide description and amount</p>
                }
                <input
                    className={"text-input"}
                    type={"text"}
                    placeholder={"Description"}
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    className={"text-input"}
                    type={"text"}
                    placeholder={"Amount"}
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    className={"textarea"}
                    placeholder={"Add a note for your expense (optional)"}
                    value={this.state.note}
                    onChange={this.onNoteChange}
                />
                <div>
                    <button className={"button"}>Save Expense</button>
                </div>
            </form>
        )
    }
}