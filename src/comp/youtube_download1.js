import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Down from '../down.png';

function YouTubeDownload() {
  const [videoLink, setVideoLink] = useState('');
  const [message, setMessage] = useState('');
  const [downloadedVideoPath, setDownloadedVideoPath] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownloading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/down', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ video_link: videoLink })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      if (responseData.success) {
        setMessage(`Video downloaded successfully!`);
        setDownloadedVideoPath(responseData.video_path);
        
      } else {
        setMessage(`Failed to download video: ${responseData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    finally {
      setDownloading(false); // Set downloading state back to false after the download process completes
    }
  };
  
  

  const handleDownload = () => {
    fetch('http://127.0.0.1:5000/videos')
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Failed to download video');
            }
        })
        .then(blob => {
            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([blob]));
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'video.mp4');
            // Simulate a click on the link to start the download
            document.body.appendChild(link);
            link.click();
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading video:', error);
        });
};

  return (
    
    <div className="container mt-5">
      <Link to='/'><button className="btn btn-success btn-block mt-3"> <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back</button></Link>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4 head" style={{
              textAlign: "center",
              padding: "10px",
              textTransform: "uppercase",
              textShadow:
                "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
            }}> <img
            src={Down}
            alt=""
            className="card-img-top"
            style={{ width: "8%", marginRight: "30px" }}
          />YouTube Video Downloader</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Enter YouTube video link" />
            </div>
            <button type="submit" className="btn btn-primary btn-block"disabled={downloading}>{downloading ? `Downloading...` : 'Download'}</button>
          </form>
          <div id="message" className="mt-3">{message}</div>
          {downloadedVideoPath && (
            <button className="btn btn-success btn-block mt-3" onClick={handleDownload}>Download Video</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default YouTubeDownload;
