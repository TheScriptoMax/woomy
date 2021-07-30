
import MessageCard from "../MessageCard/messageCard";
import NotificationCard from "../MessageCard/messageCard";
import './notification.css'



function Notification() {
    return (
      <div className="container">
        <div className="notif-header">
            <p>Notifications : </p>
            <p>Messages : </p>
        </div>
          <MessageCard/>
          {/* <NotificationCard/> */}
        </div>
    );
  }
  export default Notification;