import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import Barcode1 from "../bar1.png";
import "./barcode.css";
import Nodata from "../nodata.jpg";
import { FaDownload } from 'react-icons/fa';

function Barcode() {
  const [data, setData] = useState("");
  const [qrcodeImage, setQRCodeImage] = useState("");

  const handleGenerateQRCode = async () => {
    try {
    //   console.log("line : 21", data, backgroundColor, qrcodeColor);
      if (data == "") {
        alert("please the fill the data");
      } else {
        const response = await axios.post("http://127.0.0.1:5000/barcode", {
          data
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
          src={Barcode1}
          alt=""
          className="card-img-top"
          style={{ width: "5%", marginRight: "30px" }}
        />
        BarCode Maker
      </h1>

      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col main">
          <div className="mb-3">
            <h2 style={{ textAlign: "center" }}>Data Entry</h2>
            <label htmlFor="formGroupExampleInput" className="form-label">
              Data
            </label>
            <input
              type="text"
              className="form-control input-fill"
              id="formGroupExampleInput"
              placeholder="Fill the Data "
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleGenerateQRCode}
          >
            Generate Bar Code
          </button>
        </div>
        <div className="col main" style={{ marginLeft: "20px" }}>
          <h2 style={{ textAlign: "center" }}>BarCode Display</h2>
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
                  Download BarCode
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

export default Barcode;
