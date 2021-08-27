/// ----- Import Components ----- ///
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './cowalkerList.css'

// IMPORT MODULES
import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import {database} from '../../firebase'
import {RemoveCircle} from "@material-ui/icons";

///////// liste des copiétonneuses //////////

function CowalkerList({cowalk}) {
    const [isOwner,setIsOwner] = useState(false)
    const [isMember, setIsMember] = useState()
    const [userData, setUserData] = useState({})
    const {currentUser} = useAuth();


    const memberList =[{
        email:"maxime.pinet@hotmail.fr",
        firstname:"moi",
        id:"CGxDIKIvHSVcyHCE7PM00TLP9JG2",
        lastname:"moi",
        phoneNumber:"0946433443",
        role:"user"
    }]
    

    useEffect(() => {
        currentUser.uid === cowalk.owner ? setIsOwner(true) : setIsOwner(false)
    }, [])

    useEffect(() => {
        database.users.doc(currentUser.uid)
            .get()
            .then(doc => {
                setUserData(database.formatDoc(doc))
            })

        database.membersPending(cowalk.id).doc(currentUser.uid)
            .get()
            .then((memberPending) => {
                if (memberPending.exists) {
                    setIsMember(true);
                }
            })
            .catch(error => {
                console.log('Error getting collection')
            })
    },[cowalk.id, cowalk.owner, currentUser.uid])


    function handleJoinCowalk() {
        database.membersPending(cowalk.id).doc(currentUser.uid)
            .set(
                userData
            )
            .then(() => {
                database.notifications(cowalk.owner)
                    .add({
                        cowalkRequested: cowalk.id,
                        guest: currentUser.uid,
                        status:'approval request'
                    })
                    .then(() => {
                        console.log('Notif envoyée')
                    })
        })
            .then(()=> {
                setIsMember(true)
        })
    }


    function handleLeaveCowalk() {
        database.membersPending(cowalk.id).doc(currentUser.uid)
            .delete()
            .then(() => {
                setIsMember(false)
            })

    }


    return (
        <div className='cowalkerListcontainer'>
            <div>{ !isOwner &&

                <div className="cowalkerAddIcon">
                {!isMember ? <AddCircleIcon onClick={handleJoinCowalk}/> : <RemoveCircle onClick={handleLeaveCowalk}/>}
                </div>
            }
            </div>
            <ul className="cowalkerList">

            </ul>

        </div>
    )
};


export default CowalkerList;