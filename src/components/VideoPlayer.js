import "./VideoPlayer.css";
import posterImage from "../images/poster.png";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { useRef, useState } from "react";

const VideoPlayer = ({ video }) => {
  const [videoStatus, setVideoStatus] = useState("stopped");
  const [progressValue, setProgressValue] = useState(0);
  const [timestamp, setTimestamp] = useState("00:00");
  const videoRef = useRef();

  // Handler to play and pause the video
  const handleToggleVideoStatus = () => {
    const videoEl = videoRef.current;
    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  };

  // Update status of video.
  const handlePlayPauseStatus = () => {
    const videoEl = videoRef.current;
    if (videoEl.paused) {
      setVideoStatus("paused");
    } else {
      setVideoStatus("playing");
    }
  };

  // Handler to stop video when user presses stop button.
  const handleStopVideo = () => {
    const videoEl = videoRef.current;
    // There is no stop() method to stop the video in video api. Instead we use currentTime property and pause() method together.
    videoEl.currentTime = 0;
    videoEl.pause();
    setVideoStatus("stopped");
  };

  // Whenever time of the video updates, keep timestamp and progressbar in sync with it.
  const handleUpdateProgress = () => {
    const videoEl = videoRef.current;
    const valueInPercent = (videoEl.currentTime / videoEl.duration) * 100;
    setProgressValue(valueInPercent);

    // Get minutes
    let mins = String(Math.floor(videoEl.currentTime / 60));
    mins = mins.padStart(2, "0");

    //  Get seconds
    let secs = String(Math.floor(videoEl.currentTime % 60));
    secs = secs.padStart(2, 0);

    setTimestamp(mins + ":" + secs);
  };

  const handleSetVideoProgress = (e) => {
    const videoEl = videoRef.current;
    const valueInPercent = Number(e.target.value);
    const valueInSeconds = (valueInPercent / 100) * videoEl.duration;
    videoEl.currentTime = valueInSeconds;
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={video}
        className="video"
        poster={posterImage}
        onClick={handleToggleVideoStatus}
        onTimeUpdate={handleUpdateProgress}
        onPlay={handlePlayPauseStatus}
        onPause={handlePlayPauseStatus}
      >
        <p>Your browser doesn't support HTML video.</p>
      </video>
      <div className="video-controls">
        <button
          type="button"
          className="play"
          onClick={handleToggleVideoStatus}
        >
          {videoStatus !== "playing" ? <FaPlay /> : <FaPause />}
        </button>
        <button type="button" className="stop" onClick={handleStopVideo}>
          <FaStop />
        </button>
        <input
          type="range"
          className="progress"
          min={0}
          max={100}
          value={progressValue}
          onChange={handleSetVideoProgress}
        />
        <small className="timestamp">{timestamp}</small>
      </div>
    </div>
  );
};

export default VideoPlayer;
