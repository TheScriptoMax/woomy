// IMPORT REACT
import {useAuth} from "../../contexts/AuthContext";
import {useState, useEffect} from 'react';
import NotifCard from '../NotificationCard/NotifCard'

// IMPORT FIREBASE
import {database} from '../../firebase'

// CSS IMPORT
import './notification.css';


//PAGE NOTIFICATIONS
function Notification() {

  const [notifs, setNotifs] = useState([])
  
  const {currentUser} = useAuth();

            
  useEffect(() => {
    return database.notifications(currentUser.uid).onSnapshot((querySnapshot)=>{
      let notif = []
      querySnapshot.forEach((doc)=>{
        notif.push(database.formatDoc(doc))
      })
      setNotifs(notif)
    },(error)=>{
      console.log(error)
    })
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  

    return (
      <div className="container">
          <div className="notif-header">
              <p>Notifications : {notifs.length}</p>
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