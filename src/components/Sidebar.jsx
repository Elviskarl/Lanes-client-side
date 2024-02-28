import Uploader from './uploader'
import userImage from '../assets/user-icon.png'
import uploadIcon from '../assets/upload-icon.png'
import searchIcon from '../assets/search-icon.png'
import logOutIcon from '../assets/logout.png'
import './Sidebar.css'
import { useState } from 'react'


function Sidebar() {
  const [visible,setVisible] = useState(false);
  function visibility(){
    setVisible(prevState => !prevState)
  }
  return (
  <aside>
    <div className="side-nav">
      <div className="user">
        <figure>
          <img src={userImage} alt="Image" className='user-img'/>
          <figcaption>Welcome Elvis</figcaption>
          <figcaption>kenjaku24@yahoo.com</figcaption>
        </figure>
      </div>
      <ul>
        <li><img src={uploadIcon} alt="Upload-Icon" onClick={visibility}/><p onClick={visibility}>Upload</p></li>
        <li><img src={searchIcon} alt="search-Icon" /><p>Search</p></li>
      </ul>
      <ul>
        <li><img src={logOutIcon} alt="logout icon" /><p>Logout</p></li>
      </ul>
    </div>
    {visible && <Uploader />}
  </aside>)
}

export default Sidebar