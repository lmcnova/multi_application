import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Webcam from './webcam.png';
import Down from './down.png';
import Video from './video.png';
import Qrcode from './qr-code.png';
import Barcode from './bar1.png';
import Remove from './remover.png';
import './home.css';



function Home() {
  return (
    <>
      <div
        className="container"
        style={{ background: "white", marginTop: "20px" }}
      >
        <div className="row ">
          <h1
            style={{
              textAlign: "center",
              padding: "10px",
              textTransform: "uppercase",
              textShadow:
                "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
            }}
            className="head"
          >
            Simple Application in React js and flask
          </h1>
        </div>
        <div
          className="row"
          style={{textAlign: "center", padding: "10px", margin:"10%", marginTop:"20px" }}
        >
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={Webcam} alt="" className="card-img-top" style={{width:"50%", marginLeft:"25%", marginTop:"10%"}} />
              <div className="card-body">
                <h5 className="card-title">Webcam To Video</h5>
                <p className="card-text">
                 Convert the real time webcam view into video and download
                </p>
                <a href="/frame" className="btn">
                 Convert
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={Down} alt="" className="card-img-top" style={{width:"50%", marginLeft:"25%", marginTop:"10%"}}/>
              <div className="card-body">
                <h5 className="card-title">Youtube Download</h5>
                <p className="card-text">
                  Paste the Youtube link and download the video high Video
                </p>
                <a href="/youtube" className="btn">
                  Download
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={Video} className="card-img-top" alt="" style={{width:"50%", marginLeft:"25%", marginTop:"10%"}}/>
              <div className="card-body">
                <h5 className="card-title">Video To Image</h5>
                <p className="card-text">
                  Upload your Video convert into image download the zip file
                </p>
                <a href="/video" className="btn">
                  Convert
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={Qrcode} alt="" className="card-img-top" style={{width:"50%", marginLeft:"25%", marginTop:"10%"}} />
              <div className="card-body">
                <h5 className="card-title">Qrcode Master</h5>
                <p className="card-text">
                 Change Color Border in style color in qrcode
                </p>
                <a href="/qrcode" className="btn">
                 Make Qrcode 
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={Barcode} alt="" className="card-img-top" style={{width:"50%", marginLeft:"25%", marginTop:"10%"}} />
              <div className="card-body">
                <h5 className="card-title">BarCode Maker</h5>
                <p className="card-text">
                 create a barcode and download
                </p>
                <a href="/barcode" className="btn">
                 Make Barcode
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={Remove} alt="" className="card-img-top" style={{width:"50%", marginLeft:"25%", marginTop:"10%"}} />
              <div className="card-body">
                <h5 className="card-title">Background Remove</h5>
                <p className="card-text">
                 upload the image to remove the background
                </p>
                <a href="/remove" className="btn">
                 Make Remove
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
