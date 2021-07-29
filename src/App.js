import './App.css';
<<<<<<< HEAD
import '@fontsource/roboto';
import CowalkingCreate from './components/CowalkingCreate/CowalkingCreate';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
=======
import CowalkingList from './components/CowalkingList/CowalkingList';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import CowalkingTicket from './components/CowalkingTicket/CowalkingTicket';
>>>>>>> origin


function App() {

  
  return (
<<<<<<< HEAD
    <div className="App">
      {/* <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton> */}
      <CowalkingCreate />
=======
    <div>
      
      <Header/>
      
      <CowalkingList/>

      {/* <CowalkingTicket/> */}
      
      <Footer/>
      
>>>>>>> origin
    </div>
  );
}

export default App;
