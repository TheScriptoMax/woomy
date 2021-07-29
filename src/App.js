import './App.css';
import '@fontsource/roboto';
import CowalkingCreate from './components/CowalkingCreate/CowalkingCreate';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';


function App() {
  return (
    <div className="App">
      {/* <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton> */}
      <CowalkingCreate />
    </div>
  );
}

export default App;
