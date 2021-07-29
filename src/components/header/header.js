import './header.css'
import SearchIcon from '@material-ui/icons/Search';
import GroupIcon from '@material-ui/icons/Group';


function Header() {
    return (
     <header>
        <div><SearchIcon/></div>
        <h1>Woomy</h1>
        <div><GroupIcon/></div>
     </header>
    );
  }
  export default Header;