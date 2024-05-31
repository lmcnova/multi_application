// import React, { useState, useRef, useEffect } from 'react';
// import JSZip from 'jszip';

// function WebcamCapture() {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [stream, setStream] = useState(null);
//     const [frameCount, setFrameCount] = useState(0);
//     const [maxFrameCount, setMaxFrameCount] = useState(50); // Default value
//     const [isCapturing, setIsCapturing] = useState(false);
//     const [videoUrl, setVideoUrl] = useState(null);
//     const [capturedImages, setCapturedImages] = useState([]);

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then((stream) => {
//                 setStream(stream);
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//             })
//             .catch((err) => {
//                 console.error('Error accessing webcam:', err);
//             });

//         return () => {
//             if (stream) {
//                 stream.getTracks().forEach((track) => {
//                     track.stop();
//                 });
//             }
//         };
//     }, []);

//     const captureAndSendImage = () => {
//         if (frameCount >= maxFrameCount) {
//             setIsCapturing(false);
//             return;
//         }

//         if (canvasRef.current) {
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
//             context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//             const imageData = canvas.toDataURL('image/jpeg');
//             setCapturedImages(prevImages => [...prevImages, imageData]);
//             setFrameCount(prevCount => prevCount + 1);
//         }
//     };

//     useEffect(() => {
//         let intervalId;
//         if (isCapturing) {
//             intervalId = setInterval(captureAndSendImage, 1000);
//         }

//         return () => {
//             clearInterval(intervalId);
//         };
//     }, [frameCount, isCapturing]);

//     const handleCountChange = (e) => {
//         const count = parseInt(e.target.value);
//         setMaxFrameCount(count);
//     };

//     const handleStartCapture = () => {
//         setCapturedImages([]);
//         setFrameCount(0);
//         setIsCapturing(true);
//     };

//     const handleDownloadImages = () => {
//         const zip = new JSZip();
//         capturedImages.forEach((imageData, index) => {
//             zip.file(`image_${index}.jpeg`, imageData.split(';base64,')[1], { base64: true });
//         });
//         zip.generateAsync({ type: 'blob' }).then((blob) => {
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = 'captured_images.zip';
//             document.body.appendChild(link);
//             link.click();
//         });
//     };

//     const handleDownloadVideo = () => {
//         // Call your server endpoint to download the video
//         // Example:
//         // fetch('/download_video')
//         //     .then(response => {
//         //         if (response.ok) {
//         //             return response.blob();
//         //         } else {
//         //             throw new Error('Failed to download video');
//         //         }
//         //     })
//         //     .then(blob => {
//         //         const url = URL.createObjectURL(blob);
//         //         setVideoUrl(url);
//         //     })
//         //     .catch(error => {
//         //         console.error('Error downloading video:', error);
//         //     });
//     };

//     return (
//         <div className="container">
//         <div className="row">
//             <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
//                 <div className="mb-3">
//                     <label htmlFor="frameCountInput" className="form-label">Number of Images to Capture:</label>
//                     <input type="number" className="form-control" id="frameCountInput" value={maxFrameCount} onChange={handleCountChange} />
//                 </div>
//             </div>
//             <div className="col-md-6 position-relative">
//                 <div className="image-gallery position-absolute top-0 start-0">
//                     {capturedImages.map((imageData, index) => (
//                         <img key={index} src={imageData} alt={`Captured frame ${index}`} />
//                     ))}
//                 </div>
//                 {videoUrl && (
//                     <video controls className="w-100 position-absolute bottom-0 start-0">
//                         <source src={videoUrl} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                 )}
//                 <div className="webcam-container w-100 position-absolute top-0 end-0">
//                     <video ref={videoRef} className="w-100" autoPlay></video>
//                     <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//                     {/* You can add other elements or buttons here if needed */}
//                 </div>
//             </div>
//         </div>
//     </div>
    
    
    
//     );
// }

// export default WebcamCapture;




// import React, { useState, useRef } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = () => {
//   const webcamRef = useRef(null);
//   const [images, setImages] = useState([]);
//   const [captureLimit, setCaptureLimit] = useState(5);

//   const captureImage = () => {
//     if (webcamRef.current && captureLimit > 0) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImages(prevImages => [...prevImages, imageSrc]);
//       setCaptureLimit(prevLimit => prevLimit - 1);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="img-fluid"
//           />
//           <button
//             onClick={captureImage}
//             className="btn btn-primary mt-3"
//             disabled={captureLimit === 0}
//           >
//             Capture Image
//           </button>
//           <p className="mt-2">Captures left: {captureLimit}</p>
//         </div>
//         <div className="col-md-6">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Captured ${index + 1}`}
//               className="img-fluid mt-2"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebcamCapture;




import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './web.css';
import axios from 'axios'; 
import { Button, Modal } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { Link } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Webcam_img from '../webcam.png';




const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [captureLimitReached, setCaptureLimitReached] = useState(false);
    const [captureLimit, setCaptureLimit] = useState(50);
    const [videoGenerated, setVideoGenerated] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [captureCount, setCaptureCount] = useState(0);
    const [capturingInProgress, setCapturingInProgress] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [generatingVideo, setGeneratingVideo] = useState(false);
    const [stopCapture, setStopCapture] = useState(false);



    // const resetCapture = () => {
        
    // };
    

    const resetCapture =  async () => {
        try {
            // Make an HTTP POST request to your backend endpoint
            const response = await axios.post('http://127.0.0.1:5000/reset_image');
            if (response.status === 200) {
                setCapturedImages([]);
                setCaptureLimitReached(false);
                setCaptureCount(0);
                setCapturingInProgress(false);
                setVideoGenerated(false); 
                setGeneratingVideo(false);
                
                console.log('Data reset successfully');
            } else {
                console.error('Failed to reset data');
            }
        } catch (error) {
            console.error('Error resetting data:', error);
        }
        finally {
            setShowConfirmation(false);
        }
    };

    const captureImages = async () => {
        try {
            setCapturingInProgress(true);
            setStopCapture(false);
            let capturedImagesArray = [];

            for (let i = 0; i < captureLimit; i++) {
                if (stopCapture) break; 
                

                const imageSrc = webcamRef.current.getScreenshot();
                const blob = await (await fetch(imageSrc)).blob(); 
                const formData = new FormData();
                formData.append('image', blob, `${i}.jpeg`);
                setCaptureCount(i + 1); 
    
                
                const response = await fetch('http://127.0.0.1:5000/upload_image', {
                    method: 'POST',
                    body: formData,
                });
    
                if (response.ok) {
                    console.log(`Image ${i + 1} uploaded successfully`);
                    setCapturedImages(prevImages => [...prevImages, imageSrc]);
                    capturedImagesArray.push(imageSrc);
                } else {
                    console.error(`Failed to upload image ${i + 1}`);
                    
                }
            }

            setCapturedImages(capturedImagesArray);
           
            console.log(capturedImages)
            if (capturedImagesArray.length === captureLimit) {
                setCaptureLimitReached(true);
                console.log("---caputre limti reached")
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        } finally {
            setCapturingInProgress(false);
            console.log("-----finallly") 
        }
    };
    

    const handleDeleteImage = async (index) => {
        try {
            
            const updatedImages = [...capturedImages];
            const filenameToDelete = `${index}.jpeg`;
            console.log(filenameToDelete)
            updatedImages.splice(index, 1); // Remove the image at the specified index
            setCapturedImages(updatedImages);

            // Send request to backend to delete the corresponding image
            const response = await fetch('http://127.0.0.1:5000/delete_image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: filenameToDelete }), // Pass the filename of the image to delete
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete image from backend');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };


    const stopCaptureProcess = () => {
        setStopCapture(true);
        console.log("Stop button clicked. Stopping image capture...");
    };
    
    

    const handleCaptureLimitChange = (event) => {
        // Convert the input value to a number and update the capture limit
        setCaptureLimit(Number(event.target.value));
    };

    const generateVideo = () => {
        if (!generatingVideo) { // Check if video generation process is not already running
            setGeneratingVideo(true); // Set generatingVideo to true to indicate generation process started
            
            fetch('http://127.0.0.1:5000/generate_video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ images: capturedImages }),
            })
            .then(response => {
                if (response.ok) {
                    setVideoGenerated(true);
                } else {
                    console.error('Failed to generate video');
                }
                setGeneratingVideo(false); // Set generatingVideo back to false after generation process is complete
            })
            .catch(error => {
                console.error('Error generating video:', error);
                setGeneratingVideo(false); // Set generatingVideo back to false in case of error
            });
        }
    };

    const downloadVideo = () => {
        fetch('http://127.0.0.1:5000/download_video')
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

    const styles = {
        imageGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            overflowY: 'auto',
            background: "black",
            padding: "10px",
            
        },
        gridItem: {
            width: '100%',
            height: '100%',
        },
    };

    const galleryHeight = capturedImages.length > 4 ? '500px' : 'auto';

    return (

    
        <div className='container'>
            <Link to='/'><button className="btn btn-success btn-block" style={{marginTop: "10px"}}> <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back</button></Link>
            <h1 className="mt-5" style={{
              textAlign: "center",
              padding: "10px",
              textTransform: "uppercase",
              textShadow:
                "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
            }}> <img
            src={Webcam_img}
            alt=""
            className="card-img-top"
            style={{ width: "5%", marginRight: "30px" }}
          />Frame To Video Maker</h1>
             <div className="row">
                <div className="col-md-12">
        <div className="container-fluid">
            {/* Row for webcam area and image gallery */}
            <div className="row">
                {/* Column for webcam area */}
                <div className="col-md-6">
                    <div className="webcam-container mt-2">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            className="webcam"
                            mirrored={true}
                        />
                        <label htmlFor="captureLimitInput" className="form-label">
                            Number of Images to Capture:
                        </label>
                        <input
                            type="number"
                            className="form-control mb-2 w-25"
                            id="captureLimitInput"
                            min={50}
                            placeholder="50"
                            value={captureLimit}
                            onChange={handleCaptureLimitChange}
                        />
                        
                        {!captureLimitReached && (
                <button className="btn btn-primary" onClick={captureImages} disabled={capturingInProgress}>
                    {`Capture (${captureCount}/${captureLimit})`}
                </button>
            )}

            {/* Stop button */}
            {capturingInProgress && (
                <button className="btn btn-danger" onClick={stopCaptureProcess}>
                    Stop
                </button>
            )}
                        {captureLimitReached && (
                            <div>
                                <button className="btn btn-secondary" onClick={() => setShowConfirmation(true)}>
                                    Reset Capture
                                </button>

                                <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to reset the data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                    <Button variant="danger" onClick={resetCapture}>Reset</Button>
                </Modal.Footer>
            </Modal>
                            </div>
                        )}
                    </div>
                </div>
                {/* Column for image gallery */}
                <div className="col-md-6">
                    <div className="image-gallery mt-2" style={{ ...styles.imageGrid, height:"500px" }}>
                    {capturedImages.map((imageSrc, index) => {
    const initialIndex = index;
    return (
        <div key={index} className="image-thumbnail" style={styles.gridItem}>
            <img src={imageSrc} alt={`Captured Image ${initialIndex}`} className="img-thumbnail" style={{ width: '100%' }} />
            <div><p className="delete-button2">{initialIndex + 1}</p></div>
            <button className="delete-button" onClick={() => handleDeleteImage(index)}>
                <FontAwesomeIcon icon={faTrash} className='icon' /> {/* Use the appropriate icon class */}
            </button>
        </div>
    );
})}
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-primary" onClick={generateVideo} disabled={capturedImages.length === 0 || videoGenerated || generatingVideo}>
                {generatingVideo ? "Generating..." : "Generate Video"}
            </button>
            <button className="btn btn-success" onClick={downloadVideo} disabled={!videoGenerated}>
                Download Video
            </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
             </div>
        </div>
    );
};

export default WebcamCapture;





// import React, { useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = () => {
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       captureAndSendImage();
//     }, 1000); // Capture and send image every second

//     return () => clearInterval(intervalId);
//   }, []); // Run only once on component mount

//   const captureAndSendImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     sendImageToBackend(imageSrc);
//   };

//   const sendImageToBackend = async (imageSrc) => {
//     try {
//       const formData = new FormData();
//       formData.append('image', imageSrc);

//       const response = await fetch('/upload_image', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }
//       console.log('Image uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Webcam Image Capture</h1>
//       <div id="camera">
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={640}
//           height={480}
//         />
//       </div>
//     </div>
//   );
// };

// export default WebcamCapture;





