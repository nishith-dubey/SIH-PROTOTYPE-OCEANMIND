import React from 'react';

const VideoBackground = () => {
  const videoId = 'sO8e0T9s_0A'; // An abstract underwater video
  const videoSrc = `https://youtu.be/4zSEyYcLl9g?si=bkrW-zPoCLs6yqQ2&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none">
      <iframe
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
      ></iframe>
    </div>
  );
};

export default VideoBackground;