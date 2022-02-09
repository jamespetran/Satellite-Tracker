import { useHistory } from "react-router-dom";

function UserDetails() {
  const history=useHistory();

  const setLocation = () => {
    console.log('in setLocation');
    history.push('/location');
  }

  return (
    <div id="user-details" className="detail-item">
      <div className="user-item">
        <h3 className="details-title">User Details:</h3>
      </div>
      <div className="user-item" id="orbit-details-btn">
        <button className="main-btn button-80" onClick={() => setLocation()}>Set Location</button>
      </div>

    </div>
  )
}

export default UserDetails;