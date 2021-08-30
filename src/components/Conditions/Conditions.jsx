//CSS
import './conditions.css';

// Auth context
import {useAuth} from "../../contexts/AuthContext";

// header & footer
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

export default function Conditions() {

    const {currentUser} = useAuth();


    return (

        <div className="conditions-container">
            {currentUser && <Header />}
            <h1>Conditions générales d'utilisations</h1>
            <p></p>
            {currentUser && <Footer/>}
        </div>
    );
}