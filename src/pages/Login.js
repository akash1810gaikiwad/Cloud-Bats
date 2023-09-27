import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../Global'
import {  useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const defaultParams = {  email: '', password: ''};  
    const [params, setParams] = useState(defaultParams);
    const changeValue = (e) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    
  return (
   <div id="wrapper" className="theme-cyan">
    <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
            <div className="auth-box">
                <div className="top">
                    {/* <img src="assets/images/logo-white.svg" alt="CloudBATS" width="5%" height="10%"/> */}
                        <h6 style={{color: "white",fontSize : 38,fontWeight : 'bold'}} className="header">CloudBATS</h6>
                </div>
                <div className="card">
                    <div className="header">
                        <p className="lead">Login to your account</p>
                    </div>
                    <div className="body">
                       
                            <div className="form-group">
                                <label  className="control-label sr-only">Email</label>
                                <input type="email" className="form-control" id="email"  placeholder="Email" 
                                name="email"
                                defaultValue={params.email || ''}
                                onChange={(e) => changeValue(e)}
                                required
                                />
                            </div>
                            <div className="form-group">
                                <label  className="control-label sr-only">Password</label>
                                <input type="password" className="form-control" id="password"  placeholder="Password"
                                name="password"
                                defaultValue={params.password || ''}
                                 onChange={(e) => changeValue(e)}
                                required
                                />
                            </div>
                            <div className="form-group clearfix">
                                <label className="fancy-checkbox element-left">
                                    <input type="checkbox"/>
                                    <span>Remember me</span>
                                </label>								
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={()=>LoginApi(dispatch,navigate,params)}>LOGIN</button>
                            <div className="bottom">
                                <span className="helper-text m-b-10"><i className="fa fa-lock"></i> <a href="page-forgot-password.html">Forgot password?</a></span>
                                <span>Don't have an account? <a href="#">Register</a></span>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login