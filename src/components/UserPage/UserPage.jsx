import React from 'react';
import { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // if user email === \null\, then set this state to '' (blank string) 
  // (react doesn't like assigning \null\ to the value below)
  const [emailInput, setEmailInput] = useState(
    user.email === null ? "" : user.email
  );


  const handleSubmit = (evt) => {
    //prevent page refresh
    evt.preventDefault();

    //do logic on email input
    console.log("email is", emailInput);

    //clear inputs
    setEmailInput('');
  }
  
  const cancelForm = () => {

  }
  return (
    <div className="main-content container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
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
        <input type="submit" />
        <button onClick={() => cancelForm()}>
          Cancel
        </button>
      </form>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
