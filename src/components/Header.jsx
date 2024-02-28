import { useState } from 'react'
import Login from './Login';
import './Header.css'
function Header() {
  const [login,setLogin] = useState(false);
  function handleClick(){
    setLogin(prevState => !prevState)
  }
  return (<>
    <header className="header">
        <h2 className='logo'>Lanes</h2>
      <nav className="navigation">
        <a href="#">About</a>
        <a href="#">Contributions</a>
        <a href="#">Api</a>
        <button className='login--button' onClick={handleClick}>Login</button>
      </nav>
    </header>
    <Login loginState={login}/>
  </>
  )
}

export default Header