import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import EditExpensePage from '../components/EditExpensePage'
import HelpExpensePage from '../components/HelpExpensePage'
import AddExpensePage from '../components/AddExpensePage'
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpExpensePage} />
                <Route component={NotFoundPage} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

//exact={true}, display the page only if the path extractly matches
//<Switch> is unique in that it renders a route exclusively. 
//In contrast, every <Route> that matches the location renders inclusively.
//show Header in every single page
//NavLink A special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL

export default AppRouter