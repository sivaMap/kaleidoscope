import Kaleidoscope from "./Kaleidoscope";
import TaskBar from "./TaskBar";
import VolumeBar from "./VolumeBar";
import { constants } from "./constants";
import { KaleidoscopeCrudContext } from "./context/kaleidoscopeCrudContext"
import "./css/font.css"
import "./css/index.css"

function App() {  

  return (
    <div
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      className=" h-screen flex flex-col "
    >
      <KaleidoscopeCrudContext>
        <TaskBar />
        <Kaleidoscope />
        <VolumeBar />
      </KaleidoscopeCrudContext>
    </div>
  );
}

export default App;