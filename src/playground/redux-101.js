import { createStore } from 'redux'

//Action generator - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => (
    {
        type: 'INCREMENT',
        incrementBy
    }
)

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})


const resetCount = () => ({
    type: 'RESET'
})


const setCount = ({ count = 100 } = {}) => ({
    type: 'SET',
    count
})
//Reducers specify how the application's state changes in response to actions sent to the store.
//Remember that actions only describe what happened, but don't describe how the application's state changes.
//1. Reducers are pure functions
//2. never change state or action

const countReducer = ((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count: state.count - decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state
    }

    console.log('running')
    return state;
})

const store = createStore(countReducer)

//called every time when the store is updated
store.subscribe(() => {
    console.log(store.getState())
})


//Action - an object that gets sent to the store

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(decrementCount())

store.dispatch(setCount({ count: 33 }))
