import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './home';
import YouTubeDownload from "./comp/youtube_download1";
import FileUploader from "./comp/VideotoImage";
import WebcamCapture from "./comp/WebcamCapture";
import QRcode1 from "./comp/qrcode";
import Barcode from "./comp/barcode";
import AppVideo from "./comp/video";
import BackRemove from "./comp/back_remove";



function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Router basename="{process.env.PUBLIC_URL}">
            <Route path="/youtube" element={<YouTubeDownload />} />
            <Route path="/video" element={<FileUploader />} />
            <Route path="/frame" element={<WebcamCapture />} />
            <Route path="/" element={<Home />} />
            <Route path="/qrcode" element={<QRcode1 />} />
            <Route path="/barcode" element={<Barcode />} />
            <Route path="/remove" element={<BackRemove />} />
          </Router>
        </Switch>
      </BrowserRouter>
      {/* <Barcode/> */}
      {/* <AppVideo/> */}
    </>
  );
}

export default App;
