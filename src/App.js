import { useState } from "react";
import Kaleidoscope from "./Kaleidoscope";
import TaskBar from "./TaskBar";
import VolumeBar from "./VolumeBar";
import { constants } from "./constants";
import "./css/font.css"
import "./css/index.css"

function App() {
  const [isShowRunning, setIsshowRunning] = useState(constants.isShowRunning);

  return (
    <div className="bg-[#45275E] h-screen flex flex-col "
    >
      <TaskBar />
      <Kaleidoscope setIsshowRunning={setIsshowRunning} />
      <VolumeBar isShowRunning={isShowRunning} />
    </div>
  );
}
// background: #45275E;

export default App;
