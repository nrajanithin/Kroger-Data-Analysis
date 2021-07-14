import React from 'react'
import {withRouter} from 'react-router-dom'
import fire from './fire'
class Register extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            un:'',
            pwd:'',
            cpwd:'',
            email:'',
        }
    }
    
    handleRead = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleRegister = ()=>{
        if(this.state.un!='' && this.state.pwd==this.state.cpwd && this.state.email!='')
        {
            fire.database().ref().child('user').push(
                this.state,
                err=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        this.props.history.push('/')
                    }
                }
            )
        }
    }
    render()
    {
        return(
                <div>
                     <div id="register">
            <h3 class="text-center text-white pt-5">Registration form</h3>
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">
                            <form id="login-form" class="form">
                                <h3 class="text-center text-info">Register</h3>
                                <div class="form-group">
                                    <label for="username" class="text-info">Username:</label><br/>
                                    <input onChange={(e)=>this.handleRead(e)} style={{fontSize:'16px'}} type="text" name="un" id="username" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="text-info">Email:</label><br/>
                                    <input onChange={(e)=>this.handleRead(e)} style={{fontSize:'16px'}} type="email" name="email" id="email" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="text-info">Password:</label><br/>
                                    <input onChange={(e)=>this.handleRead(e)} type="password" name="pwd" id="password" class="form-control"/>
                                </div>
                                
                                <div class="form-group">
                                    <label for="cpassword" class="text-info">Confirm Password:</label><br/>
                                    <input onChange={(e)=>this.handleRead(e)} type="password" name="cpwd" id="cpassword" class="form-control"/>
                                </div>
                                
                                <div style={{justifyContent:'space-between',display:'flex'}} class="form-group">
                                    <input onClick={()=>this.handleRegister()} style={{fontSize:'16px'}} type="button" name="submit" class="btn btn-info btn-md" value="Register"/>
                                    <input onClick={()=>this.props.history.push('/')} style={{fontSize:'16px'}} type="button" name="submit" class="btn btn-info btn-md" value="<- Back to Login Page"/>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                     </div> 
        );
    }
}
export default withRouter(Register);