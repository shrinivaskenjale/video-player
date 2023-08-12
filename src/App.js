import VideoPlayer from "./components/VideoPlayer";
import myVideo from "./videos/gone.mp4";
import "./App.css";

const App = () => {
  return (
    <section className="section video-section">
      <VideoPlayer video={myVideo} />
    </section>
  );
};

export default App;
