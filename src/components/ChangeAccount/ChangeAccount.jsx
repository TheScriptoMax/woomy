// REACT IMPORT
import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";

// MATERIAL UI IMPORT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// CSS IMPORT
import './ChangeAccount.css';
import {useAuth} from "../../contexts/AuthContext";
import {database} from "../../firebase";

//PAGE INSCRIPTION
export default function ChangeAccount () {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState();
    const [isShow, setIsShow] = useState(true);

    const history = useHistory();

    const {currentUser} = useAuth();

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const phoneRef = useRef();

    const {signup} = useAuth()

    useEffect(()=> {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })
            .catch(error => {
                setError(error.message)
            })

    }, [currentUser.uid])

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            // // setLoading(true);
            // // setError('');
            // // console.log(emailRef.current.value)
            // // await signup(emailRef.current.value, passwordRef.current.value)
            // //     .then((authUser) => {
            // //         database.users
            // //             .doc(authUser.user.uid)
            // //             .set({
            // //                 email: emailRef.current.value,
            // //                 firstname: firstnameRef.current.value,
            // //                 lastname: lastnameRef.current.value,
            // //                 phoneNumber: phoneRef.current.value,
            // //                 createdAt: database.getCurrentTimestamp,
            // //             });
            //     })
            //     .then(() => {
            //             history.push("/send-confirm")
            //         }
            //     );
        } catch
            (error) {
            setError(error.message)
        }
        setLoading(false);
    }


    return (

        <div className='changeAccount container'>

            <form onSubmit={handleSubmit} className='changeAccount-content'>

                {/* MATERIAL UI INPUT TO COMPLETE FOR CHANGEACCOUNT */}

                <TextField inputRef={firstnameRef} id="standard-basic" label={userData.firstname} variant="standard"/>

                <TextField inputRef={lastnameRef} id="standard-basic" label={userData.lastname} variant="standard" />

                <TextField type="tel" inputRef={phoneRef} id="standard-basic" label={userData.phoneNumber} variant="standard" />

                <TextField type="date" id="standard-basic" label={userData.firstname} variant="standard"  InputLabelProps={{
                    shrink: true,
                }}/>

                <Button disabled={loading} type="submit" variant="contained">Envoyer</Button>

            </form>

        </div>
    );
}