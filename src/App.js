import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserFields from './UserFields'


Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_oVLmLa59y',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '3pr9u7isskvduv2r0l41rrgdpe',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'nautilus-software-inc.auth.us-east-1.amazoncognito.com',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://example.com/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

class App extends React.Component {

  render() {
    return (
      <div>
        <div className='home__background-divider'></div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
          <h1 style={{color: 'white', fontFamily: 'monospace'}}>Nautilus Update Request Page</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}}>
          <UserFields/>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App);
