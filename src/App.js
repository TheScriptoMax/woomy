import './App.css';
import CowalkingList from './components/CowalkingList/CowalkingList';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import CowalkingTicket from './components/CowalkingTicket/CowalkingTicket';


function App() {

  
  return (
    <div>
      
      <Header/>
      
      <CowalkingList/>

      {/* <CowalkingTicket/> */}
      
      <Footer/>
      
    </div>
  );
}

export default App;
