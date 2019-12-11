import React from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordconfirmation: "",
    errors: [],
    loading: false
  };

  isFormValid = () => {
      let errors = []
      let error;


    if (this.isFormEmpty(this.state)) {
     error = {message: 'please fill all fields'};
     this.setState({errors: errors.concat(error)})
     return false;
    } else if (!this.isPasswordValid(this.state)) {
        error = {message: 'password is invalid'};
        this.setState({errors: errors.concat(error)})
        return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({username,email,password,passwordconfirmation}) => {
     return !username.length || !email.length || !password.length || !passwordconfirmation.length
  }

  isPasswordValid = ({password,passwordconfirmation}) => {
    if(password.length<6 || passwordconfirmation.length<6){
        return false;
    } 

    else if (password !== passwordconfirmation){
        return false;
    }
    else {
        return true;
    }
  }

displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>)
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
    this.setState({errors:[], loading:true})
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          this.setState({loading:false})
        })

        .catch(err => {
          console.log(err);
          this.setState({errors:this.state.errors.concat(err), loading: false})
        });
    }
  };

  handleInputError = (errors,inputName) => {
     return errors.some(error =>
        error.message.toLowerCase().includes(inputName)
        )
        ? "error"
        : ''
  }
  render() {
    const { username, email, password, passwordconfirmation,loading,errors } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="purple" textAlign="center">
            <Icon name="american sign language interpreting" color="violet" />
            Register for HolaChat!
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                className={this.handleInputError(errors,'email')}
                value={email}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange} 
                className={this.handleInputError(errors,'password')}
                value={password}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordconfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                className={this.handleInputError(errors,'passwordconfirmation')}
                value={passwordconfirmation}
                type="password"
              />
              <Button disabled = {loading} className={loading ? 'loading' : ''}  color="violet" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 && (
              <Message error>
                  <h3>Error</h3>
                  {this.displayErrors(this.state.errors)}
              </Message>
          )}
          <Message>
            Already a user ? <Link to="/login"> Login </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Register;
