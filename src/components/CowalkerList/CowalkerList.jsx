/// ----- Import Components ----- ///
import CowalkerItem from "../CowalkerItem/CowalkerItem";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './cowalkerList.css'

// IMPORT MODULES
import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import {database} from '../../firebase'
import {RemoveCircle} from "@material-ui/icons";

///////// liste des copiétonneuses //////////

function CowalkerList({cowalk}) {
    const [isMember, setIsMember] = useState()
    const [userData, setUserData] = useState({})
    const {currentUser} = useAuth();


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
                /*
                querySnapshot.forEach(member => {
                    const tempMembers = [];
                    tempMembers.push(database.formatDoc(member))
                    console.log(tempMembers)
                    tempMembers.forEach(member => {
                        console.log(member.id === currentUser.uid)
                        if (member.id === currentUser.uid) {
                            if (!isMember) {
                                setIsMember(true)
                            }
                        }
                    })
                }) */
            })
            .catch(error => {
                console.log('Error getting collection')
            })
    }, [])


    function handleJoinCowalk() {
        database.membersPending(cowalk.id).doc(currentUser.uid)
            .set(
                userData
            ).then(() => {
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
        <div className='CowalkerListcontainer'>
            {!isMember ? <AddCircleIcon onClick={handleJoinCowalk}/> : <RemoveCircle onClick={handleLeaveCowalk}/>}
            <ul className="cowalkerList">
                <CowalkerItem/>
                <CowalkerItem/>
            </ul>

        </div>
    )
};


export default CowalkerList;