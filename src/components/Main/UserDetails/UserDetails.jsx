function UserDetails() {

  return (
    <div id="user-details" className="detail-item">
      <div className="user-item">
        <h3 className="details-title">User Details:</h3>
      </div>
      <div className="user-item" id="orbit-details-btn">
        <button onClick={() => setOrbiter()}>Select Your Satellite!</button>
      </div>

    </div>
  )
}

export default UserDetails;