import {useAuth} from "../../contexts/AuthContext";
import {useState, useEffect} from 'react';
import {database} from '../../firebase'
import { doc, onSnapshot } from "firebase/firestore";
import NotifCard from '../NotificationCard/NotifCard'

// MATERIAL UI IMPORT
import MessageCard from "../MessageCard/messageCard";

// CSS IMPORT
import './notification.css';


//PAGE NOTIFICATIONS
function Notification() {

  const [notifs, setNotifs] = useState([])
  
  const {currentUser} = useAuth();

  
        
            
  useEffect(() => {
    database.notifications(currentUser.uid).onSnapshot((querySnapshot)=>{
      let notif = []
      querySnapshot.forEach((doc)=>{
        notif.push(database.formatDoc(doc))
      })
      setNotifs(notif)
      console.log(notif)
    },(error)=>{
      console.log(error)
    })
  }, [])

  console.log(notifs)

  

    return (
      <div className="container">
          <div className="notif-header">
              <p>Notifications : {notifs.length}</p>
              <p>Messages : </p>
          </div>
          <ul>
          {notifs&&
            notifs.map((notif,index)=>{
              return <NotifCard notif={notif} key={index}/>
            })
          }
          </ul>
          
          
      </div>
    );
  }
  export default Notification;