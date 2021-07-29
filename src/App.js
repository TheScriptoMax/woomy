import './App.css';
<<<<<<< HEAD
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Params from './components/Params/Params';
=======

import CowalkingList from './components/CowalkingList/CowalkingList';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import CowalkingTicket from './components/CowalkingTicket/CowalkingTicket';
<<<<<<< HEAD
import CowalkingCreate from './components/CowalkingCreate/CowalkingCreate';
import CowalkingSearch from './components/CowalkingCreate/CowalkingCreate';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
=======
import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
>>>>>>> dev


>>>>>>> 6df0122ab4c89b380a4a90720daa11df1a76e3a8
function App() {

  
  return (
<<<<<<< HEAD
    <Router>
      <div>
        <Header/>
          <Switch>
            <Route exact path='/ticket' component={CowalkingTicket}/>
            <Route exact path='/create' component={CowalkingCreate}/>
            <Route exact path='/search' component={CowalkingSearch}/>
            {/* <Route exact path='/account' component={CowalkingCreate}/> */}
            <Route exact path='/list' component={CowalkingList}/>
          </Switch>
        <Footer/>
        
      </div>
    </Router>
=======

    <div>
<<<<<<< HEAD
=======
      

>>>>>>> 6df0122ab4c89b380a4a90720daa11df1a76e3a8
      <Header/>
<<<<<<< HEAD
      
      {/* <CowalkingList/> */}

      <CowalkingTicket/>

      
<<<<<<< HEAD
=======
      <Params/>
      {/* <CowalkingTicket/> */}
>>>>>>> clemvr
      <Footer/>
=======
      
>>>>>>> 6df0122ab4c89b380a4a90720daa11df1a76e3a8
    </div>
>>>>>>> dev
  );
}

export default App;
