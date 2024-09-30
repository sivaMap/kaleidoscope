import Kaleidoscope from "./Kaleidoscope";
import TaskBar from "./TaskBar";
import VolumeBar from "./VolumeBar";
import "./css/font.css"
import "./css/index.css"

function App() {
  return (    
    <div className="bg-[#45275E] h-screen flex flex-col "
    >
      <TaskBar />
      <Kaleidoscope />
      <VolumeBar />
    </div>
  );
}
// background: #45275E;

export default App;
