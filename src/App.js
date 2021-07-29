import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import { Button, InputGroup, FormControl, Form, Row, Col } from 'react-bootstrap';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';



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

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      password: ''
    }
    this.handleIdChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }    
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async login(event) {
    // You can get the current config object

    const user = await Auth.signIn(this.state.username, this.state.password);

    const jwt = user['signInUserSession']['accessToken']['jwtToken']

    await fetch('https://406kjrtu2d.execute-api.us-east-1.amazonaws.com/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify({
        id: this.state.id,
      })
    }).then(response => response.json())
    .then(data => 
      window.location.href = data
    ); 
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className='home__background-divider'></div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
          <h1 style={{color: 'white', fontFamily: 'monospace'}}>Nautilus Update Request Page</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}}>
          <Form>
            <Row>
              <Col sm={20}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name='username'
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </InputGroup>
              </Col>
              <Col sm={20}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    name='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                    type='password'
                  />
                </InputGroup>
              </Col>
              <Col sm={20}>
                <InputGroup className="mb-3">
                  <InputGroup.Text>ID</InputGroup.Text>
                  <FormControl
                    placeholder="User ID"
                    aria-label="User ID"
                    aria-describedby="basic-addon1"
                    name='id'
                    onChange={this.handleChange}
                    value={this.state.id}
                    type='number'
                  />
                  <Button variant='dark' size='lg' onClick={this.login} fontFamily='monospace'>Login</Button>
                </InputGroup>       
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App);
