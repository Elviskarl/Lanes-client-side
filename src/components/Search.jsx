import { useState } from "react";
import { PulseLoader } from 'react-spinners';
import './Search.css';

export default function Search() {
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function getUserDetails() {
    if (searchValue === '') {
      setError(true);
      setErrorMessage('Please enter a valid username');
      return;
    }

    setLoading(true); // Set loading to true before fetching data

    try {
      const request = new Request('https://lanes-server.onrender.com/api/v1/images/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchValue }),
      });

      const response = await fetch(request);
      const data = await response.json();
      
      if (!response.ok) {
        setError(true);
        setErrorMessage(data.message);
        return;
      }

      setUserImages(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
      setErrorMessage('An error occurred while fetching data');
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  return (
    <>
      <div className="query-container">
        <h3>Search by Name</h3>
        <div className="search-user-div">
          <input type="search" name="search" id="search-box" placeholder="Search by Name" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <label htmlFor="search-box">Search </label>
          <span className="search-button" onClick={getUserDetails}>&#128269;</span>
        </div>
        <div className="image-error">
          {error && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="user-image">
          <div className="dropdown">
            {loading ? (
              <PulseLoader color="aqua" loading={loading} size={15} />
            ) : userImages.length > 0 ? (
              <>
                <h1 className="btn">{searchValue} has contributed {userImages.length} times.</h1>
                {userImages.map((image) => (
                  <div key={image._id} className="image-container">
                    <p>Severity: {image.severity}</p>
                    <p>Date Taken: {image.dateTaken}</p>
                    <p>{image.location.type}</p>
                    <p>latitude: {image.location.coordinates[0]}</p>
                    <p>latitude: {image.location.coordinates[1]}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>search for a registered user</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
