/// ----- COMPONENTS ----- ///

/**** AUTHPROVIDER *****/
import {AuthProvider} from "./contexts/AuthContext";

/**** HEADER & FOOTER *****/
import Header from './components/header/header';
import Footer from './components/footer/footer';

/**** CONNEXION *****/
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';

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

/// ----- CSS ----- ///
import './App.css';

/// ----- React Modules ----- ///

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'

function App() {

    return (
        <Router>

            <AuthProvider>
                <Header/>
                <Switch>
                    <Route exact path='/ticket' component={CowalkingTicket}/>
                    <PrivateRoute exact path='/create' component={CowalkingCreate}/>
                    <PrivateRoute exact path='/search' component={CowalkingSearch}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/login' component={Login}/>
                    <PrivateRoute exact path='/account' component={Account}/>
                    <Route exact path='/message' component={Notification}/>
                    <Route exact path='/param' component={Params}/>
                    <Route exact path='/list' component={CowalkingList}/>
                </Switch>
                <Footer/>

            </AuthProvider>
        </Router>
    );
}

export default App;
