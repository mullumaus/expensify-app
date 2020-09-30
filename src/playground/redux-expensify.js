import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'

//ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})
//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
//SET_TEXT_FILTER
const setTextFilter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
})
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})
//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})
//Expense Reducer

const expensesReducerDefault = []
const expenseReducer = (state = expensesReducerDefault, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]  //spread operator ...
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => { return id !== action.id })
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state;
    }
}


const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}


const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}
//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    let lowcaseText = text.toLowerCase()
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(lowcaseText)

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy == 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}
//create store
const store = createStore(
    combineReducers({
        expense: expenseReducer,
        filters: filterReducer
    }))


store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expense, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 300, createdAt: 100 }))

const expenseTwo = store.dispatch(addExpense({ description: 'Grocery', amount: 200, createdAt: 330 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 50 }))


// store.dispatch(setTextFilter('rent'))

// store.dispatch(setTextFilter())

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

store.dispatch(setStartDate(10))
store.dispatch(setEndDate(234))

const demoState = {
    expense: [{
        id: 'id1',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 555,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',//date or amount
        startDate: undefined,
        endDate: undefined
    }
}

const user = {
    name: 'Jen',
    age: 24
}

console.log({
    ...user,
    location: 'Melbourne',
    age: 27
})