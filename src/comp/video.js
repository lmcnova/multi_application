// AppVideo.js

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import socketIOClient from 'socket.io-client';


function AppVideo() {
  const [imageSrc, setImageSrc] = useState(null);
  const socket = socketIOClient('http://127.0.0.1:5000');
  const webcamRef = useRef(null);
  const processedImageRef = useRef(null); // Reference to the processed image

  useEffect(() => {
    const captureAndSendImage = () => {
      const imageData = webcamRef.current.getScreenshot();
      socket.emit('image', imageData);
    };

    const interval = setInterval(captureAndSendImage, 1000);

    socket.on('processedImage', (imageData) => {
      setImageSrc(imageData);
      // Update the src of the processed image
      if (processedImageRef.current) {
        processedImageRef.current.src = imageData;
      }
    });

    return () => {
      clearInterval(interval);
      socket.off('processedImage');
    };
  }, [socket]);

  return (
    <div className="container">
      <div className="webcam-container" style={{ position: 'relative' }}>
        {/* Overlay processed image on top of webcam */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Processed"
            style={{
              position: 'absolute',
              top: 50,
              left: 0,
              width: '100%',
              maxWidth: '400px',
              zIndex: 1, // Ensure it's above the webcam preview
            }}
            ref={processedImageRef}
          />
        )}
        <h2>Live Camera Preview</h2>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', maxWidth: '300px', zIndex: 0 }} // Ensure it's below the processed image
        />
      </div>
    </div>
  );
}

export default AppVideo;
