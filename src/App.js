/// ----- COMPONENTS ----- ///

/**** AUTHPROVIDER *****/
import {AuthProvider} from "./contexts/AuthContext";

/**** HEADER & FOOTER *****/
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


/**** LEGAL *****/
import Conditions from "./components/Conditions/Conditions";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

/**** CONNEXION *****/
import Landing from './components/LandingPage/Landing'
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import ConfirmEmailSent from './components/ConfirmEmailSent/ConfirmEmailSent';
import SendNewValidation from './components/SendNewValidation/SendNewValidation';

/**** PROFIL *****/
import Account from './components/Account/Account';
import Params from './components/Params/Params';
import ChangeAccount from './components/ChangeAccount/ChangeAccount';

/**** ADMIN *****/
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminPlace from "./components/AdminPlace/AdminPlace";
import AdminDistrict from "./components/AdminDistrict/AdminDistrict";
import PlaceList from "./components/PlaceList/PlaceList";

import DistrictList from "./components/DistrictList/DistrictList";
import AdminUsers from "./components/AdminUsers/AdminUsers";
import AdminAcceptUsers from "./components/AdminAcceptUsers/AdminAcceptUsers";


/**** CRUD COPIETONNAGE *****/
import CowalkingList from './components/CowalkingList/CowalkingList';
import CowalkingTicket from './components/CowalkingTicket/CowalkingTicket';
import CowalkingCreate from './components/CowalkingCreate/CowalkingCreate';
import CowalkingSearch from './components/CowalkingSearch/CowalkingSearch';
import CowalkingEdit from "./components/CowalkingEdit/CowalkingEdit";



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
import PublicRoute from './components/Routes/PublicRoute'
import PrivateRoute from './components/Routes/PrivateRoute'
import EmailNotVerifiedRoute from "./components/Routes/EmailNotVerifiedRoute";


import AwaitingApprovalRoute from "./components/Routes/AwaitingApprovalRoute";




function App() {

    return (
        
        <Router>

            <Switch>
                <AuthProvider>
                    {/*----- Route public -----*/}
                        <Route exact path='/landing' component={Landing}/>
                        <Route path='/signin' component={SignIn}/>
                        <PublicRoute path='/login' component={Login}/>
                        <PublicRoute path='/cgu' component={Conditions}/>
                        <PublicRoute path='/confidentialite' component={PrivacyPolicy}/>

                    {/*----- Route private Attente validation Email et AwaitingApproval -----*/}

                        <EmailNotVerifiedRoute path='/send-confirm' component={ConfirmEmailSent}/>
                        <EmailNotVerifiedRoute path='/send-new-validation' component={SendNewValidation}/>


                    {/*----- Route private AwaitingApproval -----*/}


                        <AwaitingApprovalRoute path='/awaiting-approval' component={AwaitingApprovalRoute}/>


                    {/*----- AdminCowalks -----*/}

                    <Route exact path='/admin' component={AdminDashboard} />
                    <Route exact path='/admin-accept-users' component={AdminAcceptUsers} />
                    <Route exact path='/admin-users' component={AdminUsers} />
                    <Route exact path='/admin-place' component={AdminPlace}/>
                    <Route exact path='/admin-district' component={AdminDistrict}/>
                    <Route exact path='/place-list' component={PlaceList}/>
                    <Route exact path='/district-list' component={DistrictList}/>


                    {/*----- Profil connecté et approuvé -----*/}

                    <>
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
                                <PrivateRoute exact path='/change-profile' component={ChangeAccount}/>
                                <PrivateRoute exact path='/param' component={Params}/>
                        <Footer/>
                    </>

                </AuthProvider>
            </Switch>

        </Router>
    );


}

export default App;
