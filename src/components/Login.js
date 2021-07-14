import React from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import fire from './fire';
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username:'',
            password:'',
        }
    }
    
    handleRead = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleLogin = ()=>{
        if(this.state.username!='' && this.state.password!='')
        {
            var ref1 = 0;
            var ref = fire.database().ref("user");
            ref.orderByChild("un").equalTo(this.state.username).on("child_added", function(snapshot) {
                    ref1 = 1;
              });
             if(ref1 == 1)
             {
                this.props.history.push({pathname:'/kroger',state:{na:this.state.username}});
             }   
        }
        else{
            if(this.state.username=='')
            {
                alert('UserName is required');
            }
            else{
                alert('Password is required');
            }
        }
    }
    render()
    {
        return(
                <div id="login">
                <h3 class="text-center text-white pt-5">Login form</h3>
                <div class="container">
                    <div id="login-row" class="row justify-content-center align-items-center">
                        <div id="login-column" class="col-md-6">
                            <div id="login-box" class="col-md-12">
                                <form id="login-form" class="form">
                                    <h3 class="text-center text-info">Login</h3>
                                    <div class="form-group">
                                        <label for="username" class="text-info">Username:</label><br/>
                                        <input onChange={(e)=>this.handleRead(e)} style={{fontSize:'16px'}} type="text" value={this.state.username} name="username" id="username" class="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="text-info">Password:</label><br/>
                                        <input onChange={(e)=>this.handleRead(e)} value={this.state.password} type="password" name="password" id="password" class="form-control"/>
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <input onClick={()=>this.handleLogin()} style={{fontSize:'16px'}} type="button" name="submit" class="btn btn-info btn-md" value="Login"/>
                                    </div>
                                    <br/>
                                    <div id="register-link" class="text-right">
                                        <a style={{cursor:'pointer'}} onClick={()=>this.props.history.push('/register')} class="text-info">Register here</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);