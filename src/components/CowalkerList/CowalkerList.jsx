/// ----- Import Components ----- ///
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './cowalkerList.css'

// IMPORT MODULES
import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import {database} from '../../firebase'
import {RemoveCircle} from "@material-ui/icons";
import CowalkerItem from "../CowalkerItem/CowalkerItem";

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
    }, [])

    useEffect(() => {
        return database.membersApproved(cowalk.id).onSnapshot((querySnapshot) => {
            const approvedMembers = [];
            querySnapshot.forEach((doc) => {
                approvedMembers.push(database.formatDoc(doc))
            })
            setMembersList(approvedMembers)
        });
    }, [])


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
    }, [cowalk.id, cowalk.owner, currentUser.uid])


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
        
    }


    return (
        <>
        {!loading && 
        <div className='cowalkerListcontainer'>
            <div>{!isOwner &&

            <div className="cowalkerAddIcon">
                {!isMember ? <AddCircleIcon onClick={handleJoinCowalk}/> : <><p>MEMBER </p><RemoveCircle onClick={handleLeaveCowalk}/></>}
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