import React from 'react';
import { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // console.log('user:', user);
  // if user email === \null\, then set this state to '' (blank string) 
  // (react doesn't like assigning \null\ to the input below)
  const [emailInput, setEmailInput] = useState(
    user.email === null ? "" : user.email
  );

  const [emailEdit, setEmailEdit] = useState(false);
  const [checked, setChecked] = useState(false);


  const handleSubmit = (evt) => {
    //prevent page refresh
    evt.preventDefault();

    //do logic on email input
    console.log("email is", emailInput);
    dispatch({
      type: "SET_EMAIL",
      payload: emailInput,
    })

    //clear inputs
    setEmailInput('');
    setEmailEdit(false)
  }

  const unSaveLocation = () => {
    // code that sets user.saveLocation to FALSE
    // console.log(`unsave`);
    dispatch({
      type: 'UNSET_SAVE_LOCATION'
    })

  }

  const saveLocation = () => {
    // code that sets user.saveLocation to TRUE
    // console.log(`save`);
    dispatch({
      type: 'SET_SAVE_LOCATION'
    })
  }


  return (
    <div className="main-content container">
      <div id="subheader">
        <h2>Your Account</h2>
      </div>
      <div className="user-container">
        <div className="user-item">
          <h2>Welcome, {user.username}!</h2>
          <p>Your ID is: {user.id}</p>
          {emailEdit === false ?
            <div>
              <p>Current Email Address: {user.email}</p>
              <button className="btn" id="edit-mode-email-btn" onClick={() => setEmailEdit(true)}>Change</button>
            </div>
            :
            <form onSubmit={(evt) => handleSubmit(evt)}>
              <label htmlFor="email-input">Email Address:</label>
              <br />
              <input
                type="email"
                id="email-input"
                value={emailInput}
                onChange={(evt) => setEmailInput(evt.target.value)}
                required
              />
              <br />
              <input type="submit" className="btn" />
              <button className="btn" onClick={() => setEmailEdit(false)}>
                Cancel
              </button>
            </form>
          }
          <br />
          {user.saveLocation ?
            <input type="checkbox" id="location-check" checked onChange={() => unSaveLocation()} />
            :
            <input type="checkbox" id="location-check" onChange={() => saveLocation()} />

          }
          {/* <input type="checkbox" id="location-check" value={checked} /> */}
          <span>Remember My Location
            <br />
            (Warning: will immediately delete previously stored location data)
          </span>
        </div>
        <div className="user-item">
          <LogOutButton className="logout-btn btn" />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
