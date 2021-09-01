/// ----- COMPONENTS ----- ///

/**** AUTHPROVIDER *****/
import {AuthProvider} from "./contexts/AuthContext";


/**** LEGAL *****/
import Cgu from './components/Cgu/Cgu';
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

/**** CONNEXION *****/
import Landing from './components/LandingPage/Landing'
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import ConfirmEmailSent from './components/ConfirmEmailSent/ConfirmEmailSent';
import SendNewValidation from './components/SendNewValidation/SendNewValidation';
import AwaitingApproval from "./components/AwaitingApproval/AwaitingApproval";

/**** PROFIL *****/
import Account from './components/Account/Account';
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
import AdminRoute from "./components/Routes/AdminRoute";
import AdminCowalks from "./components/AdminCowalks/AdminCowalks";


function App() {

    return (

        <AuthProvider>
            <Router>

                <Switch>


                    {/*----- Route all access -----*/}
                    <Route exact path='/cgu' component={Cgu}/>
                    <Route exact path='/' component={Landing}/>
                    {/*<Route path='/' component={Home}/>*/}


                    {/*----- Route public -----*/}
                    <PublicRoute exact path='/signin' component={SignIn}/>
                    <PublicRoute exact path='/login' component={Login}/>
                    <PublicRoute exact path='/confidentialite' component={PrivacyPolicy}/>

                    {/*----- Route private Attente validation Email et AwaitingApproval -----*/}


                    <EmailNotVerifiedRoute exact path='/send-confirm' component={ConfirmEmailSent}/>
                    <EmailNotVerifiedRoute exact path='/send-new-validation' component={SendNewValidation}/>


                    {/*----- Route private AwaitingApproval -----*/}


                    <AwaitingApprovalRoute exact path='/awaiting-approval' component={AwaitingApproval}/>


                    {/*----- AdminCowalks -----*/}

                    <AdminRoute exact path='/admin' component={AdminDashboard}/>
                    <AdminRoute exact path='/admin-accept-users' component={AdminAcceptUsers}/>
                    <AdminRoute exact path='/admin-cowalks' component={AdminCowalks}/>
                    <AdminRoute exact path='/admin-users' component={AdminUsers}/>
                    <AdminRoute exact path='/admin-place' component={AdminPlace}/>
                    <AdminRoute exact path='/admin-district' component={AdminDistrict}/>
                    <AdminRoute exact path='/place-list' component={PlaceList}/>
                    <AdminRoute exact path='/district-list' component={DistrictList}/>


                    {/*----- Profil connecté et approuvé -----*/}


                    {/*----- Ticket -----*/}
                    <PrivateRoute exact path='/ticket/:cowalkId' component={CowalkingTicket}/>
                    <PrivateRoute exact path='/create' component={CowalkingCreate}/>
                    <PrivateRoute exact path='/search' component={CowalkingSearch}/>
                    <PrivateRoute exact path='/list' component={CowalkingList}/>
                    <PrivateRoute exact path='/message' component={Notification}/>
                    <PrivateRoute exact path='/ticket/edit/:cowalkId' component={CowalkingEdit}/>

                    {/*----- Account -----*/}
                    <PrivateRoute exact path='/account' component={Account}/>
                    <PrivateRoute exact path='/change-profile' component={ChangeAccount}/>



                </Switch>


            </Router>

        </AuthProvider>
    );

}

export default App;
