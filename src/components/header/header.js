// MATERIAL UI IMPORT
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link}from "react-router-dom";

// CSS IMPORT
import './header.css'

// HEADER
function Header() {
   return (
      <header>

         <Link to="/search">
            <div className="searchIcon"><SearchIcon/></div>
         </Link>
         <div className='logoWoomy'>
            <svg width="66" height="47" viewBox="0 0 66 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.35784 35.0083C1.86087 36.2941 3.31101 36.9287 4.59683 36.4257C5.88265 35.9226 6.51723 34.4725 6.0142 33.1867L1.35784 35.0083ZM31.9535 26.4534L30.0214 28.0399L31.9535 26.4534ZM6.0142 33.1867C5.23975 31.207 5.24102 27.6286 6.70966 24.5566C8.08858 21.6723 10.6633 19.3983 15.0984 19.3983V14.3983C8.47228 14.3983 4.28735 18.0311 2.19867 22.4C0.19971 26.5812 0.0253975 31.6023 1.35784 35.0083L6.0142 33.1867ZM15.0984 19.3983C17.1591 19.3983 19.2601 19.6642 21.6025 20.7987C23.974 21.9473 26.7605 24.0687 30.0214 28.0399L33.8856 24.8669C30.2991 20.4991 26.9702 17.8429 23.782 16.2988C20.5649 14.7405 17.662 14.3983 15.0984 14.3983V19.3983ZM30.0214 28.0399C32.8914 31.5352 35.3194 35.546 35.9571 38.4454C36.2756 39.8937 36.0334 40.5212 35.8579 40.7525C35.7134 40.9428 35.1253 41.5 33.007 41.5V46.5C35.8439 46.5 38.3358 45.7578 39.8405 43.7755C41.3141 41.8342 41.2901 39.4159 40.8404 37.3714C39.9417 33.2854 36.8876 28.5229 33.8856 24.8669L30.0214 28.0399Z" fill="white"/>
            <path d="M64.6422 35.0083C64.1391 36.2941 62.689 36.9287 61.4032 36.4257C60.1173 35.9226 59.4828 34.4725 59.9858 33.1867L64.6422 35.0083ZM34.0465 26.4534L35.9786 28.0399L34.0465 26.4534ZM59.9858 33.1867C60.7603 31.207 60.759 27.6286 59.2903 24.5566C57.9114 21.6723 55.3367 19.3983 50.9016 19.3983V14.3983C57.5277 14.3983 61.7126 18.0311 63.8013 22.4C65.8003 26.5812 65.9746 31.6023 64.6422 35.0083L59.9858 33.1867ZM50.9016 19.3983C48.8409 19.3983 46.7399 19.6642 44.3975 20.7987C42.026 21.9473 39.2395 24.0687 35.9786 28.0399L32.1144 24.8669C35.7009 20.4991 39.0298 17.8429 42.218 16.2988C45.4351 14.7405 48.338 14.3983 50.9016 14.3983V19.3983ZM35.9786 28.0399C33.1086 31.5352 30.6806 35.546 30.0429 38.4454C29.7244 39.8937 29.9666 40.5212 30.1421 40.7525C30.2866 40.9428 30.8747 41.5 32.993 41.5V46.5C30.1561 46.5 27.6642 45.7578 26.1595 43.7755C24.6859 41.8342 24.7099 39.4159 25.1596 37.3714C26.0583 33.2854 29.1124 28.5229 32.1144 24.8669L35.9786 28.0399Z" fill="white"/>
            <ellipse cx="14.7473" cy="9.6017" rx="6.67183" ry="6.6017" stroke="white" stroke-width="5"/>
            <ellipse rx="6.67183" ry="6.6017" transform="matrix(-1 0 0 1 51.253 9.6017)" stroke="white" stroke-width="5"/>
            </svg>
         </div>

         <Link to="/account">
            <div className="accountIcon"><AccountCircleIcon/></div>
         </Link>
         
      </header>
   );
   }
   export default Header;