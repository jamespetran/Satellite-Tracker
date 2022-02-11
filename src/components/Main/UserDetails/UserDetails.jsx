import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

function UserDetails() {
  const history=useHistory();

  const location = useSelector(store => store.location)

  const goToLocationPage = () => {
    history.push('/location');
  }

  return (
    <div id="user-details" className="detail-item">
      <div className="user-item">
        <h3 className="details-title">User Details:</h3>
        {location.formattedAddress === null ?
        <p>
          Choose your address with the button below
        </p>
        :
        <div>
          <p>Your Address is {location.formattedAddress}</p>
        </div>
        }
      </div>
      <div className="user-item" id="orbit-details-btn">
        <button className="main-btn btn" onClick={() => goToLocationPage()}>Set Location</button>
      </div>

    </div>
  )
}

export default UserDetails;