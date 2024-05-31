import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import Qrcode from "../qr-code.png";
import "./qrcode.css";
import Nodata from "../nodata.jpg";
import { FaDownload } from 'react-icons/fa';

function QRcode1() {
  const [data, setData] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [qrcodeColor, setQrcodeColor] = useState("#000000");
  const [borderSize, setBorderSize] = useState(1);
  const [boxSize, setBoxSize] = useState(10);
  const [qrcodeImage, setQRCodeImage] = useState("");

  const handleGenerateQRCode = async () => {
    try {
    //   console.log("line : 21", data, backgroundColor, qrcodeColor);
      if (data == "") {
        alert("please the fill the data");
      } else {
        const response = await axios.post("http://127.0.0.1:5000/qrcode", {
          data,
          backgroundColor,
          borderSize,
          qrcodeColor,
          boxSize,
        });

        if (response.data.success) {
          // Update the state with the QR code image data
          setQRCodeImage(response.data.image_data);
        } else {
          console.error("Failed to generate QR code:", response.data.error);
        }
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="container" style={{ background: "white", marginTop: "3%" }}>

     <Link to='/'><button className="btn btn-success btn-block"> <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back</button></Link>
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
          src={Qrcode}
          alt=""
          className="card-img-top"
          style={{ width: "5%", marginRight: "30px" }}
        />
        qrcode master
      </h1>

      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col main">
          <div className="mb-3">
            <h2 style={{ textAlign: "center" }}>Data Entry</h2>
            <label htmlFor="formGroupExampleInput" className="form-label">
              Data
            </label>
            <textarea
              type="text"
              className="form-control input-fill"
              id="formGroupExampleInput"
              placeholder="Fill the Data "
              value={data}
              onChange={(e) => setData(e.target.value)}
            ></textarea>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label
                  htmlFor="formGroupBackgroundColor"
                  className="form-label"
                >
                  Background Color
                </label>
                <input
                  type="color"
                  className="form-control input-fill"
                  id="formGroupBackgroundColor"
                  placeholder="Enter the background color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{
                    border: "none",
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="formGroupQrcodeColor" className="form-label">
                  Qrcode Color
                </label>
                <input
                  type="color"
                  className="form-control input-fill"
                  id="formGroupQrcodeColor"
                  placeholder="Enter the background color"
                  value={qrcodeColor}
                  onChange={(e) => setQrcodeColor(e.target.value)}
                  style={{
                    border: "none",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="formGroupBorderSize" className="form-label">
                  Box Size
                </label>
                <input
                  type="number"
                  className="form-control input-fill"
                  id="formGroupBoxSize"
                  placeholder="Enter the border size"
                  value={boxSize}
                  onChange={(e) => setBoxSize(e.target.value)}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="formGroupBorderSize" className="form-label">
                  Border Size
                </label>
                <input
                  type="number"
                  className="form-control input-fill"
                  id="formGroupBorderSize"
                  placeholder="Enter the border size"
                  value={borderSize}
                  onChange={(e) => setBorderSize(e.target.value)}
                  min={1}
                  max={10}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleGenerateQRCode}
          >
            Generate QR Code
          </button>
        </div>
        <div className="col main" style={{ marginLeft: "20px" }}>
          <h2 style={{ textAlign: "center" }}>QR Code Display</h2>
          <div
            className="container"
            style={{ background: "white", height: "80%" }}
          >
            {/* Display the QR code image */}
            {qrcodeImage ? (
              <div>
                <img
                  src={`data:image/png;base64,${qrcodeImage}`}
                  style={{width: "auto",margin: "10%", marginLeft: "30%" }}
                  alt="QR Code"
                />
                <button className="btn" style={{marginLeft: "32%", background: "green"}}>
                <a
                  href={`data:image/png;base64,${qrcodeImage}`}
                  download="qrcode.png"
                  style={{ display: "block", textAlign: "center", textDecoration: "none", color:"white" }}
                >
                  <FaDownload style={{ marginRight: "5px" }} />{" "}
                  {/* Download icon */}
                  Download QR Code
                </a>
                </button>
                
              </div>
            ) : (
              <img
                src={Nodata}
                style={{ width: "40%", margin: "10%", marginLeft: "30%" }}
                alt="QR Code"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRcode1;
