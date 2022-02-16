import { useSelector } from 'react-redux';
import RenderLocationOptions from './RenderLocationOptions'

function UserDetails() {
  const location = useSelector(store => store.location)

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
        <RenderLocationOptions />
      </div>

    </div>
  )
}

export default UserDetails;