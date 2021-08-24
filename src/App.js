/// ----- COMPONENTS ----- ///

/**** AUTHPROVIDER *****/
import {AuthProvider} from "./contexts/AuthContext";

/**** HEADER & FOOTER *****/
import Header from './components/header/header';
import Footer from './components/footer/footer';

/**** CONNEXION *****/
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import ConfirmEmailSent from './components/ConfirmEmailSent/ConfirmEmailSent'

/**** PROFIL *****/
import Account from './components/Account/Account';
import Params from './components/Params/Params';

/**** CRUD COPIETONNAGE *****/
import CowalkingList from './components/CowalkingList/CowalkingList';
import CowalkingTicket from './components/CowalkingTicket/CowalkingTicket';
import CowalkingCreate from './components/CowalkingCreate/CowalkingCreate';
import CowalkingSearch from './components/CowalkingSearch/CowalkingSearch';

/**** NOTIFICATION *****/
import Notification from './components/Notifications/Notification';


    /**** SIGN IN ****/
    import SignInValidation from './components/SignInValidation/SignInValidation'
    import SignInConfirm from './components/SignInConfirm/SignInConfirm'

/// ----- CSS ----- ///
import './App.css';

/// ----- React Modules ----- ///

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import EmailNotVerifiedRoute from "./components/EmailNotVerifiedRoute";

function App() {

    return (
        <Router>

            <AuthProvider>
                <Header/>
                <Switch>
                    {/*----- Route public -----*/}

                        <Route path='/signin' component={SignIn}/>
                        <Route path='/login' component={Login}/>

                        <EmailNotVerifiedRoute path='/send-confirm' component={ConfirmEmailSent}/>
                        <EmailNotVerifiedRoute path='/send-new-validation' component={SendNewValidation}/>


                    {/*----- Route private SignInConfirm -----*/}

                        {/*----- Ticket -----*/}
                        <PrivateRoute exact path='/ticket' component={CowalkingTicket}/>
                        <PrivateRoute exact path='/create' component={CowalkingCreate}/>
                        <PrivateRoute exact path='/search' component={CowalkingSearch}/>
                        <PrivateRoute exact path='/list' component={CowalkingList}/>
                        <PrivateRoute exact path='/message' component={Notification}/>

                        {/*----- Account -----*/}
                        <PrivateRoute exact path='/account' component={Account}/>
                        <PrivateRoute exact path='/param' component={Params}/>


                    {/*<Route exact path='/confirm' component={SignInConfirm}/>*/}

                </Switch>
                <Footer/>

            </AuthProvider>
        </Router>
    );
}

export default App;
