import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import "./video.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Remove from '../remover.png';
import NoImg from '../noimg.jpg'

function BackRemove() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [RemoveImage, setRemoveImage] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedImage = e.dataTransfer.files[0];
    if (uploadedImage.type.startsWith('image/')) {
        setFile(uploadedImage);
      }
      else{
        setErrorMessage("Only Image Formate.");
      }
  };

  const BASE_URL = "http://127.0.0.1:5000";

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("video", file);
      const response = await axios.post(`${BASE_URL}/remove`, formData);
      setFile(null);


      if (response.data.success) {
        // Update the state with the QR code image data
        setRemoveImage(response.data.image_data);
      } else {
        setErrorMessage("Failed to generate QR code:", response.data.error);
      }

      console.log("click.....!");
    } catch (error) {
      setErrorMessage("Error uploading video.");
    } finally {
      setUploading(false);
    }
  };

 

  

  return (
    <div className="container mt-5 text-center">
        <Link to="/">
          <button className="btn btn-success btn-block" style={{'marginRight' : '80%'}}>
            {" "}
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back
          </button>
        </Link>{" "}
      <h1
        style={{
          textAlign: "center",
          padding: "10px",
          textTransform: "uppercase",
          textShadow:
            "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
        }}
      >
        
        <img
          src={Remove}
          alt=""
          className="card-img-top"
          style={{ width: "5%", marginRight: "30px" }}
        />
        BackGround Remover
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Drag and Drop Image Here</h5>
              <div
                className="dropzone border rounded p-5 text-center"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {file ? <p>{file.name}</p> : <p>Drag & Drop File Here</p>}
              </div>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
              <button
                className="btn btn-primary mt-3"
                onClick={handleUpload}
                disabled={!file || uploading} // Disable button if no file selected or already uploading
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="col main" style={{ marginLeft: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Download Display</h2>
          <div
            className="container"
            style={{ background: "white", height: "80%" }}
          >
           
            {/* Display the QR code image */}
            {RemoveImage ? (
              <div>
                <img
                  src={`data:image/png;base64,${RemoveImage}`}
                  style={{width: "50%",margin: "10%", marginLeft: "auto" }}
                  alt="QR Code"
                />
                <button className="btn" style={{marginLeft: "auto", background: "green"}}>
                <a
                  href={`data:image/png;base64,${RemoveImage}`}
                  download="qrcode.png"
                  style={{ display: "block", textAlign: "center", textDecoration: "none", color:"white" }}
                >
                  <FaDownload style={{ marginRight: "5px" }} />{" "}
                  Download BGremove
                </a>
                </button>
                
              </div>
            ) : (
              <img
              src={NoImg}
              style={{ width: "40%", margin: "10%", marginLeft: "20%" }}
              alt="QR Code"
            />
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default BackRemove;
