/// ----- Import Components ----- ///

// IMPORT MATERIAL
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {RemoveCircle} from "@material-ui/icons";

// IMPORT CSS
import './cowalkerList.css'

// IMPORT REACT
import {useEffect, useState} from "react";

// IMPORT COMPONENT
import CowalkerItem from "../CowalkerItem/CowalkerItem";

// IMPORT FIREBASE
import {database} from '../../firebase'
import firebase from 'firebase/app';
import {useAuth} from "../../contexts/AuthContext";

///////// liste des copiétonneuses //////////

function CowalkerList({cowalk}) {
    const [isOwner, setIsOwner] = useState(false);
    const [isMember, setIsMember] = useState();
    const [owner, setOwner] = useState({})
    const [membersList, setMembersList] = useState([]);
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({});
    const {currentUser} = useAuth();

    useEffect(() => {
        database.users.doc(cowalk.owner)
            .get()
            .then((owner) => {
                setOwner(database.formatDoc(owner))
                setLoading(false)
            })
            .catch(() => {
                console.log('Couldnt retrieve the owner')
            })

    }, [cowalk]) 


    useEffect(() => {
        return database.membersApproved(cowalk.id).onSnapshot((querySnapshot) => {
            const approvedMembers = [];
            querySnapshot.forEach((doc) => {
                approvedMembers.push(database.formatDoc(doc))
            })
            setMembersList(approvedMembers)
        });

    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {
        currentUser.uid === cowalk.owner ? setIsOwner(true) : setIsOwner(false)

    }, [cowalk]) // eslint-disable-line react-hooks/exhaustive-deps


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
        database.membersApproved(cowalk.id).doc(currentUser.uid)
            .get()
            .then((memberApproved) => {
                if (memberApproved.exists) {
                    setIsMember(true);
                }
            })
            .catch(error => {
                console.log('Error getting collection')
            })
    }, [cowalk]) // eslint-disable-line react-hooks/exhaustive-deps


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
                        status:'pending request',
                        requestDate:new Date()
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
            .then(()=>{
                database.notifications(cowalk.owner).where("guest", "==", currentUser.uid).where("cowalkRequested", "==", cowalk.id)
                .get()
                .then(onSnapshot => {
                    onSnapshot.forEach(doc => {
                        console.log(database.formatDoc(doc))            
                        database.notifications(cowalk.owner).doc(doc.id)
                        .delete()
                        .then(()=>{
                            console.log('Notif supprimée')
                        })   
                    })
                })   
            })

        database.membersApproved(cowalk.id).doc(currentUser.uid)
            .delete()
            .then(() => {
                setIsMember(false)
            })
        database.users.doc(currentUser.uid)
            .update({
                approvalCowalk:firebase.firestore.FieldValue.arrayRemove(
                    cowalk.id
                )
            })
    }


    return (
        <>
        {!loading && 
        <div className='cowalkerListcontainer'>
            <div>{!isOwner &&

            <div className="cowalkerAddIcon">
                {!isMember ? <AddCircleIcon onClick={handleJoinCowalk}/> : <RemoveCircle onClick={handleLeaveCowalk}/>}
            </div>
            }
            </div>
            <ul className="cowalkerList">
                <CowalkerItem key={owner.id} member={owner} />

                {membersList.map(member => {
                    return <CowalkerItem key={member.id} member={member}/>

                })}

            </ul>
        </div>
        }
        </>
    )
};


export default CowalkerList;