import './App.css';
import CowalkingList from './components/CowalkingList/CowalkingList';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import CowalkingTicket from './components/CowalkingTicket/CowalkingTicket';
import CowalkingCreate from './components/CowalkingCreate/CowalkingCreate';
import CowalkingSearch from './components/CowalkingCreate/CowalkingCreate';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
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
  );
}
export default App;
