// MATERIAL UI IMPORT
import SearchIcon from '@material-ui/icons/Search';
import GroupIcon from '@material-ui/icons/Group';
import {Link}from "react-router-dom";

// CSS IMPORT
import './header.css'

// HEADER
function Header() {
   return (
      <header>

         <Link to="/search">
            <div><SearchIcon/></div>
         </Link>

         <h1>Woomy</h1>

         <Link to="/account">
            <div><GroupIcon/></div>
         </Link>
         
      </header>
   );
   }
   export default Header;