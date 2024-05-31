import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import "./video.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Video from "../video.png";

function FileUploader() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const BASE_URL = "http://127.0.0.1:5000";

  const handleUpload = async () => {
    try {
      setUploading(true);
      setUploadedImages([]);
      const formData = new FormData();
      formData.append("video", file);
      const response = await axios.post(`${BASE_URL}/upload`, formData);
      fetchImageURLs();
      setFile(null);

      console.log("click.....!");
    } catch (error) {
      setErrorMessage("Error uploading video.");
    } finally {
      setUploading(false);
    }
  };

  const fetchImageURLs = async () => {
    try {
      const response1 = await axios.get(`http://127.0.0.1:5000/get_image_list`);
      console.log(response1.data);
      if (!response1.data) {
        throw new Error("No image URLs found");
      }
      setUploadedImages(response1.data);
      console.log(response1.data);
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      setErrorMessage("Error fetching image URLs");
    }
  };

  const handleDownloadZip = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "frames.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Remove the link after download

      window.URL.revokeObjectURL(url); // Clean up resources
    } catch (error) {
      console.error("Error downloading zip file:", error);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <Link to="/">
        <button
          className="btn btn-success btn-block"
          style={{ marginRight: "80%" }}
        >
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
          src={Video}
          alt=""
          className="card-img-top"
          style={{ width: "5%", marginRight: "30px" }}
        />
        Video to Image Extract
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Drag and Drop Video Here</h5>
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
          <div className="mt-3">
            <button
              className="btn btn-success"
              onClick={handleDownloadZip}
              disabled={uploadedImages.length === 0}
            >
              Download Zip File
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Image Gallery</h5>
          <div
            className="shadow p-3 mb-5 bg-white rounded"
            style={{ height: "500px", overflowY: "scroll" }}
          >
            <div className="row">
              {uploadedImages.map((imageUrl, index) => (
                <div className="col-md-4 image-container" key={index}>
                  <img
                    src={imageUrl}
                    className="img-fluid p-1 image-overlay"
                    alt={`Image ${index}`}
                  />
                  <a
                    href={imageUrl}
                    download={`${index}`}
                    className="download-link"
                  >
                    {/* <FaDownload size={12} /> */}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
