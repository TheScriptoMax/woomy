import {useAuth} from "../../contexts/AuthContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function PrivacyPolicy () {


    const {currentUser} = useAuth();


    return (

        <div>
            {currentUser && <Header />}
            <h1>Politique de confidentialité</h1>
                    <p></p>
            {currentUser && <Footer/>}
        </div>
    );
}