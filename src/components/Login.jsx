import { useRef,useEffect } from 'react'
import './Login.css'


export default function Login({loginState}) {
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
  const close = useRef(null);

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

  return (<>
        <div className="wrapper" ref={wrapper}>
          <span className="icon-close" ref={close}><ion-icon name="close-outline"></ion-icon></span>            
          <div className="form-box login">
            <h2>login</h2>
            <form action="#">
              <div className="input-box">
            <span className="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
                <input type="email" name='email' id='email' placeholder='email @' required/>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" name='password' id='password' placeholder='*****' required/>
              </div>
                <button className="submit--button">Login</button>
                <div className="login-register">
                  <p>Do not have an account? <a href="#" className="register-link" ref={registerLink} onClick={handleRegisterClick}>Register</a></p>
                </div>
            </form>
          </div>

          <div className="form-box register">
            <h2>Register</h2>
            <form action="#">
            <div className="input-box">
                <span className="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                <input type="text" name='name' id='name' placeholder="'name'" required/>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
                <input type="email" name='email' id='email' placeholder='email @' required/>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" name='password' id='password' placeholder='****' required/>
              </div>
                <button className="submit--button">Register</button>
                <div className="login-register">
                  <p>Already have an account? <a href="#" className="login-link" ref={loginLink} onClick={handleLoginClick}>Login</a></p>
                </div>
            </form>
          </div>
    </div>
    
  </>)
}
