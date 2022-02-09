// import {history as }

function UserDetails() {

  const setLocation = () => {
    console.log('in setLocation');

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