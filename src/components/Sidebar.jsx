import { useContext } from 'react'
import Uploader from './uploader'
import Search from './Search'
import userImage from '../assets/user-icon.png'
import uploadIcon from '../assets/upload-icon.png'
import searchIcon from '../assets/search-icon.png'
import logOutIcon from '../assets/logout.png'
import './Sidebar.css'
import { useState } from 'react'
import authContext from '../context/authContext'


function Sidebar() {
  const [visible,setVisible] = useState(false);
  const [searchVisible,setSearchVisible] = useState(false);
  const authInfo = useContext(authContext);
  // console.log(authInfo.authInfo);
  function visibility(){
    setVisible(prevState => !prevState)
  }
  function searchVisibility(){
    setSearchVisible(prevState => !prevState)
  }
  function logOut(){
    authInfo.setAuthInfo({loggedIn: false, userName: '', email: ''});
  }
  return (
    <aside>
      <div className="side-nav">
        <div className="user">
          <figure>
            <img src={userImage} alt="Image" className='user-img'/>
            <figcaption>{authInfo.authInfo.loggedIn ?`Welcome ${authInfo.authInfo.userName}` : ''}</figcaption>
            <figcaption>{authInfo.authInfo.loggedIn ?authInfo.authInfo.email : ''}</figcaption>
          </figure>
        </div>
        <ul>
          <li><img src={uploadIcon} alt="Upload-Icon" onClick={visibility}/><p onClick={visibility}>Upload</p></li>
          <li><img src={searchIcon} alt="search-Icon" onClick={searchVisibility}/><p onClick={searchVisibility}>Search</p></li>
        </ul>
        <ul>
          <li><img src={logOutIcon} alt="logout icon" onClick={logOut}/><p onClick={logOut}>Logout</p></li>
        </ul>
      </div>
      {visible && <Uploader />}
      {searchVisible && <Search />}
    </aside>
  )
}

export default Sidebar