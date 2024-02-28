import { useRef, useState } from 'react';
import exifr from "exifr";
import imageCompression from 'browser-image-compression';
import image from '../assets/icon.png'
import './uploader.css';

function Uploader() {
  const [text, setText] = useState(null);
  const [imageUrl,setImageUrl] = useState('');
  const [metadata,setMetadata] = useState({});
  const [noCoordinatesFound, setNoCoordinatesFound] = useState(false);
  const [degreeOfDamage,setDegreeOfDamage] = useState('');
  const [responseMessage,setResponseMessage] = useState(false);
  const [responseInfo,setResponseInfo] = useState('');
  
  const dragArea = useRef(null);
  const fileButton = useRef(null);
  const spanBtn = useRef(null);
  const damage = useRef(null);

  console.log(metadata);
  console.log(degreeOfDamage);

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  }
  function handleAssessmentChange(){
    let damageAssessment = damage.current.value.toLowerCase();
    setDegreeOfDamage(damageAssessment);
  }
  
  async function handleSubmit() {
    try {
      const request = new Request('/api/v1/images',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64String: imageUrl,
          imageDetails: {
            latitude: metadata.latitude,
            longitude: metadata.longitude,
            dateTaken: metadata.dateTaken,
            severity: degreeOfDamage
          }
        })
      });
      const response = await fetch(request);
      const data = await response.json();
      setResponseMessage(true);
      if (response.ok) {
        console.log(data);
        console.log('Image data submitted successfully');
        setResponseInfo(data.message)
      } else {
        console.log(data);
        setResponseInfo(data.errMessage)
      }
    } catch (error) {
      console.log('Error submitting image data:', error);
    }
  }

  function handleClick(){
    fileButton.current.click();
  }

  function handleThisClick(e){
    e.stopPropagation();
  }

  function handleChange(e){
    const selectedFile = e.target.files[0];
    console.log('originalFile instanceof Blob', selectedFile instanceof Blob); // true
    console.log(`originalFile size ${selectedFile.size / 1024 / 1024} MB`);
    dragArea.current.classList.add('active');
    displayFile(selectedFile);
  }
  function handleDrag(e){
    e.preventDefault();
    setText('Release to Upload');
    dragArea.current.classList.add('active');
    console.log('Drag');
  }
  function handleDragLeave(){
    setText('Drag & drop');
    dragArea.current.classList.remove('active');
    console.log('left');
  }
  async function displayFile(file){
    let fileType = file.type;
    const requiredTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (requiredTypes.includes(fileType)) {
      try {
        let metadata = await exifr.parse(file);
        let dateTaken = metadata.CreateDate;
        console.log(dateTaken);
        let { latitude, longitude } = await exifr.gps(file);
        setMetadata({ latitude, longitude, dateTaken});
        console.log(latitude, longitude);
      } catch (e) {
        console.error('No gps Meta Data :) Try another pix');
        setNoCoordinatesFound(true);
        throw new Error('No gps Meta Data :) Try another pix');
      }
      
      try {
        const compressedFile = await imageCompression(file, options); // Apply compression here
        console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');
        
        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);
  
        fileReader.onload = (e) => {
          let fileUrl = e.target.result;
          setImageUrl(fileUrl);
          setText('success');
        };
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    } else {
      setText('This file is not an Image, check the format.');
      dragArea.current.classList.remove('active');
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Declare file here
    // Reset the imageUrl and text before processing the new file
    console.log('originalFile instanceof Blob', file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    setImageUrl('');
    setText(null);
    setMetadata({}); // Clear coordinates state
    setNoCoordinatesFound(false); // Reset noCoordinatesFound state
    displayFile(file);
  }
  

  return (
    <div className='container uploader-container'>
      <h3>Upload your Image</h3>
      <div className="drag-area" ref={dragArea} onDragOver={handleDrag} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {imageUrl ? (
        <img src={imageUrl} className="new-image" alt="Image" />
      ) : (
        <>
          <figure className='image-icon'>
            <img src={image} alt="Image" width={'40px'} height={'40px'} />
          </figure>
          <span className="drag--header">Drag & drop</span>
          <span className="drag--header">or <span className="button" ref={spanBtn} onClick={handleClick}>browse</span></span>
          <input type="file" ref={fileButton} onClick={handleThisClick} onChange={handleChange} hidden />
          <span className="supports">Supports: JPEG, PNG and JPG</span>
        </>
      )}
    </div>
    <div className="message">
      {text === 'success'
        ?<p className="success">Image Loaded Successfully</p>
        : text === 'This file is not an Image, check the format.' 
        ?<p className="fail">{text}</p>
        :<p className='default--p'>Drop file into drop area</p>}
        {noCoordinatesFound && (
          <p className="fail">No coordinates found. Please try another image.</p>
        )}
        {metadata.latitude && metadata.longitude &&  (
          <div className="coordinate">
            <p className="latitude">Latitude: {metadata.latitude}</p>
            <p className="longitude">Longitude: {metadata.longitude}</p>
            <p className="date">Date Taken: {metadata.dateTaken.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/,/g, '')}</p>
            <label htmlFor="severity">Severity: </label>
            <input type="text" name="severity" id="severity" placeholder='[high, medium, low]' className='input--severity' ref={damage} onChange={handleAssessmentChange}/>
            {responseMessage && <p className="response-message">{responseInfo}</p>}
            
            <button className='submit-btn' onClick={handleSubmit}>Submit</button>
          </div>
        )}
    </div>
    </div>
  )
}

export default Uploader