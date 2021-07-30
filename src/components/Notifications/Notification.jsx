// MATERIAL UI IMPORT
import MessageCard from "../MessageCard/messageCard";

// CSS IMPORT
import './notification.css'


//PAGE NOTIFICATIONS
function Notification() {
    return (
      <div className="container">

          <div className="notif-header">
              <p>Notifications : </p>
              <p>Messages : </p>
          </div>
          <MessageCard/>
      </div>
    );
  }
  export default Notification;