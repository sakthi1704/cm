import React from 'react';
import store from 'store';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as routes from '../../components/Constants/appRoutes';
import isLoggedIn from '../../components/helpers/is_logged_in';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    this.setState({ error: false });
    
    if (!(username === '' && password === '')) {
      return this.setState({ error: true });
    }

    store.set('loggedIn', true);
    history.push(routes.HOME);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  render() {
    const { error } = this.state;

    if (isLoggedIn()) {
      return <Redirect to={routes.HOME} />;
    }
    return (
        <div id="parent">
             <form style={{ height: '65vh',backgroundColor:"blue", paddingTop:"20%", textAlign:"center", color:"white" }}  onSubmit={this.onSubmit} autoComplete="off">
                       <div>
                        <TextField
                           label='E-mail' 
                           name='username'
                           color="white"
                           value={this.state.username}
                           onChange={this.handleChange}
                           />
                           </div>
                           <div>
                            <TextField
                           label='Password' 
                           name='password'
                           color="white"
                           value={this.state.password}
                           onChange={this.handleChange}
                           />
                           </div><br /> <br />
                           <div>
                            <Button
                            type="submit"
                            size="medium"
                            variant="contained"
                            color="secondary"
                        >
                            Login
                        </Button>
                        </div>
                 </form>   
        </div>
    )
}

}


