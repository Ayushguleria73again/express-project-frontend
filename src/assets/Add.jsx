import { useState } from "react";
import Webcam from "react-webcam";

function Add() {
  const [imageSrc, setImageSrc] = useState(null);

  const videoConstraints = {
    width: 3840,
    height: 2160,
    facingMode: "user", 
  };

  return (
    <>
      <Webcam
        audio={false}
        height={360}
        width={640}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        videoStyle={{
          transform: "scaleX(-1)",
        }}
      >
        {({ getScreenshot }) => (
          <>
            <button
              onClick={() => {
                const imageSrc = getScreenshot();
                setImageSrc(imageSrc);
              }}
            >
              Capture photo
            </button>

            {imageSrc && (
              <div>
                <h3>Captured Image:</h3>
                <img src={imageSrc} alt="Captured" />
              </div>
            )}
          </>
        )}
      </Webcam>
    </>
  );
}

export default Add;
