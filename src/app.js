//stateless functional component
//Grab the add function from the add.js file in the utils folder
//Grab React from the react npm module
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import React from 'react'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render(<AppRouter />, document.getElementById('app'))


