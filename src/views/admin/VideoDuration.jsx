import React, { useRef, useState } from 'react';

function VideoDuration({ videoSource, onDurationChange }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    const videoDuration = video.duration;
    onDurationChange(videoDuration);
    setLoaded(true);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videoSource}
        onLoadedMetadata={handleLoadedMetadata}
        muted
      />
      {!loaded && <p>Loading video...</p>}
    </div>
  );
}

export default VideoDuration;
