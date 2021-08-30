/// ----- COMPONENTS ----- ///

/**** AUTHPROVIDER *****/
import {AuthProvider} from "./contexts/AuthContext";

/**** HEADER & FOOTER *****/
import Header from './components/header/header';
import Footer from './components/footer/footer';

/**** CONNEXION *****/
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import ConfirmEmailSent from './components/ConfirmEmailSent/ConfirmEmailSent';
import AwaitingApproval from './components/AwaitingApproval/AwaitingApproval';
import SendNewValidation from './components/SendNewValidation/SendNewValidation';

/**** PROFIL *****/
import Account from './components/Account/Account';
import Params from './components/Params/Params';

/**** ADMIN *****/
import AdminPlace from "./components/AdminPlace/AdminPlace";
import AdminDistrict from "./components/AdminDistrict/AdminDistrict";
import PlaceList from "./components/PlaceList/PlaceList";
import DistrictList from "./components/DistrictList/DistrictList";

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
import EmailNotVerifiedRoute from "./components/EmailNotVerifiedRoute";
import CowalkingEdit from "./components/CowalkingEdit/CowalkingEdit";


function App() {
  
    return (
        
        <Router>

            <AuthProvider>
                <Switch>
                    {/*----- Route public -----*/}

                        <Route path='/signin' component={SignIn}/>
                        <Route path='/login' component={Login}/>

                        <EmailNotVerifiedRoute path='/send-confirm' component={ConfirmEmailSent}/>
                        <EmailNotVerifiedRoute path='/send-new-validation' component={SendNewValidation}/>

                    {/*Todo: Changer la route pour les personnes vérifier mais en attente de validation d'un admin*/}
                        <Route path='/awaiting-approval' component={AwaitingApproval}/>

                    {/*----- Route private AwaitingApproval -----*/}
                    <div>
                        <Header/>
                                {/*----- Ticket -----*/}
                                <PrivateRoute exact path='/ticket/:cowalkId' component={CowalkingTicket}/>
                                <PrivateRoute exact path='/create' component={CowalkingCreate}/>
                                <PrivateRoute exact path='/search' component={CowalkingSearch}/>
                                <PrivateRoute exact path='/list' component={CowalkingList}/>
                                <PrivateRoute exact path='/message'component={Notification} />
                                 
                                <PrivateRoute exact path='/ticket/edit/:cowalkId' component={CowalkingEdit} />
                                {/*----- Account -----*/}
                                <PrivateRoute exact path='/account' component={Account}/>
                                <PrivateRoute exact path='/param' component={Params}/>
                        <Footer/>
                    </div>

                        {/*----- Admin -----*/}
                        <Route exact path='/admin-place' component={AdminPlace}/>
                        <Route exact path='/admin-district' component={AdminDistrict}/>
                        <Route exact path='/place-list' component={PlaceList}/>
                        <Route exact path='/district-list' component={DistrictList}/>

                </Switch>

            </AuthProvider>
        </Router>
    );


}

export default App;
