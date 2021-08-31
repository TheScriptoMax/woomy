/// ----- CSS ----- ///
import "./BandeauWarning.css"

/// ----- React Modules ----- /// 
import {Link}from "react-router-dom";

function BandeauWarning() {
    return (
        <div className="text-info">
            <p>&#9888;Cette application est en phase de test&#9888;</p>
            <Link to="/cgu"><p>Conditions générales d'utilisation</p></Link>
        </div>
    );
  }
  
  export default BandeauWarning;
  