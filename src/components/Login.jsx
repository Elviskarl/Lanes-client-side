import { useRef,useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './Login.css'

Login.propTypes = {
  loginState: PropTypes.bool.isRequired,
};

export default function Login({loginState}) {
  const [formLoginData, setFormLoginData] = useState({
    email: '',
    password: ''
  });
  const [formRegisterData, setFormRegisterData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [loginError, setLoginError] = useState({});
  const [registerError, setRegisterError] = useState({});


  useEffect(() => {
  if (wrapper.current) {
    if (loginState) {
      wrapper.current.classList.add('active-popup');
    } else {
      wrapper.current.classList.remove('active-popup');
    }
  }
}, [loginState]);
  const wrapper = useRef(null);
  const registerLink = useRef(null);
  const loginLink = useRef(null);
  const loginForm = useRef(null);
  const registerForm = useRef(null);

  console.log(formLoginData);
  console.log(formRegisterData);

  function handleRegisterClick(){
    if (wrapper.current) {
      wrapper.current.classList.add('active');
    }
  }
  function handleLoginClick(){
    if (wrapper.current) {
      wrapper.current.classList.remove('active');
    }
  }
  function handleLogin(e){
    if(loginForm.current && loginForm.current.checkValidity()){
      e.preventDefault();
      const validationErrors = {}
      if(!formLoginData.email.trim()){
        validationErrors.email = 'Email is required';
      }else if(!/\S+@\S+\.\S+/.test(formLoginData.email)){
        validationErrors.email = 'Email is not valid';
      }
      if(!formLoginData.password.trim()){
        validationErrors.password = 'Password is required';
      }else if(formLoginData.password.length < 6){
        validationErrors.password = 'Password should at least 6 characters';
      }
      setLoginError(validationErrors);
      if(Object.keys(validationErrors).length > 0) return;
    }
  }
  function handleRegister(e){
    if(registerForm.current && registerForm.current.checkValidity()){
      e.preventDefault();
      const validationErrors = {};
      if(!formRegisterData.userName.trim()){
        validationErrors.userName = 'Name is required';
      }
      if(!formRegisterData.email.trim()){
        validationErrors.email = 'Email is required';
      }else if(!/\S+@\S+\.\S+/.test(formRegisterData.email)){
        validationErrors.email = 'Email is not valid';
      }
      if(!formRegisterData.password.trim()){
        validationErrors.password = 'Password is required';
      }else if(formRegisterData.password.length < 6){
        validationErrors.password = 'Password should at least 6 characters';
      }
      setRegisterError(validationErrors);
      if(Object.keys(validationErrors).length > 0) return;
    }
  }

  return (<>
        <div className="wrapper" ref={wrapper}>
          <span className="icon-close" ref={close}><ion-icon name="close-outline"></ion-icon></span>            
          <div className="form-box login">
            <h2>login</h2>
            <form ref={loginForm}>
              <div className="input-box">
            <span className="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
                <input type="email" name='email' id='login-email' placeholder='email @' onChange={e => {
                  const {name,value} = e.target;
                  setFormLoginData(prevVal => ({
                    ...prevVal,
                    [name]: value
                  }));
                  }} autoComplete='off' required/>
                  {loginError.email && <span className="error">{loginError.email}</span>}
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" name='password' id='login-password' placeholder='*****' onChange={e => {
                  const {name,value} = e.target;
                  setFormLoginData(prevVal => ({
                    ...prevVal,
                    [name]: value
                  }));
                }} required/>
              </div>
              {loginError.password && <span className="error">{loginError.password}</span>}
                <button className="submit--button" onClick={handleLogin}>Login</button>
                <div className="login-register">
                  <p>Do not have an account? <a href="#" className="register-link" ref={registerLink} onClick={handleRegisterClick}>Register</a></p>
                </div>
            </form>
          </div>

          <div className="form-box register">
            <h2>Register</h2>
            <form ref={registerForm}>
            <div className="input-box">
                <span className="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                <input type="text" name='userName' id='register-name' placeholder="name" onChange={e => {
                const {name,value} = e.target;
                  setFormRegisterData(prevVal => ({
                    ...prevVal,
                    [name]: value
                  }));
                }} autoComplete='off' required/>
                {registerError.userName && <span className="error">{registerError.userName}</span>}
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
                <input type="email" name='email' id='register-email' placeholder='email @' onChange={e => {
                  const {name,value} = e.target;
                  setFormRegisterData(prevVal => ({
                    ...prevVal,
                    [name]: value
                  }));
                  }} autoComplete='off' required/>
                  {registerError.email && <span className="error">{registerError.email}</span>}
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" name='password' id='register-password' placeholder='****' onChange={e => {
                  const {name,value} = e.target;
                  setFormRegisterData(prevVal => ({
                    ...prevVal,
                    [name]: value
                  }));
                  }} required/>
                  {registerError.password && <span className="error">{registerError.password}</span>}
              </div>
                <button className="submit--button" onClick={handleRegister}>Register</button>
                <div className="login-register">
                  <p>Already have an account? <a href="#" className="login-link" ref={loginLink} onClick={handleLoginClick}>Login</a></p>
                </div>
            </form>
          </div>
    </div>
    
  </>)
}
