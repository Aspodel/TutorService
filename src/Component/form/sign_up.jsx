import React, { Component } from 'react';

class SignUp extends Component {
    state = {  }
    render() { 
        return ( 
            <form className="form">
        <input
          type="text"
          className="account"
          placeholder="Enter your account"
          spellCheck="false"
        />
        <input
          type="password"
          className="password"
          placeholder="Enter your password"
          spellCheck="false"
        />

        <input
          type="password"
          className="password"
          placeholder="Re-enter your password"
          spellCheck="false"
        />

        <input className="submit" type="submit" value="Sign Up" />
      </form>
         );
    }
}
 
export default SignUp;
