// import React from 'react';
// import '../App.css';
// // import { Button } from './Button';
// import './HeroSection.css';

// function HeroSection({resultRef}) {
//   const onSubmit = (e) => {
//     e.preventDefault();
//     resultRef.current.scrollIntoView({ behavior: "smooth" });
//   };
//   return (
//     <div className='hero-container'>
//       {/* <video src='/videos/yacht1.mp4' autoPlay loop muted /> */}
//       <h1>WELCOME BACK</h1>
//       <p>Hello!</p>
//     </div>
//   );
// }

// export default HeroSection;
import React from 'react';
// import logo from './logo.svg';
import '../App.css';
import './HeroSection.css';
import {config} from '../Config';
import  {PublicClientApplication} from '@azure/msal-browser'
import { Component } from 'react';

// function App() {
class HeroSection extends Component {

  constructor(props) {
    super(props);
    this.state={
      error:null,
      isAuthenticated: false,
      user: {}
    };
    this.login = this.login.bind(this)
    //Initialize the msal application object
    this.PublicClientApplication = new PublicClientApplication({
      auth: {
        clientId:config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache: {
        cacheLocation:"sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }

  async login(){
    try {
      await this.PublicClientApplication.loginPopup(
        {
          scopes:config.scopes,
          prompt: "select_account"
        }
      );
      this.setState({isAuthenticated:true})
    }
    catch(err){
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err
      })
    }
  }

  logout(){
    this.PublicClientApplication.logoutPopup();
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {this.state.isAuthenticated ?
          <><div className='hero-container'>
              <h1>WELCOME BACK</h1>
              <p>Hello!</p>
            </div><p>
                Login Success
              </p></> :
          <p>
            <button className='login-button' onClick={()=> this.login()}> Login here </button>
          </p> 
          }
        </header>
      </div>
    );
  }
}

export default HeroSection;

