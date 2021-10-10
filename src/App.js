import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [iFrames, setiFrames] = useState([]);
  let [iFrame, setiFrame] = useState("");
  let [isStorageRetrieved, setStorageRetrieved] = useState(false);

  useEffect(() => {
    if (isStorageRetrieved) {
      return;
    }

    let frames = [];
    for (let i = 0; i < 4; i++) {
      let frame = localStorage.getItem(`frame${i}`);
      console.log(frame);
      if (frame == null) {
        continue;
      } else {
        frames.push(frame);
      }
    }
    setiFrames(frames);
    setStorageRetrieved(true);
  }, [isStorageRetrieved]);

  function addiFrame() {
    if (iFrames.length < 4) {
      localStorage.setItem(`frame${iFrames.length}`, iFrame);
      setiFrames([...iFrames, iFrame]);
    }
  }

  function refresh(i) {
    let iFrame = document.getElementById(i.toString());

    if (iFrame == null) {
      return;
    } else {
      iFrame = iFrame.getElementsByTagName("iFrame")[0];
      iFrame.src += "";
    }
  }

  function replace(i) {
    localStorage.setItem(`frame${i}`, iFrame);
    let newFrames = iFrames;
    newFrames[i] = iFrame;
    console.log(newFrames);
    setiFrames(newFrames);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <input
          type="text"
          value={iFrame}
          onChange={(e) => setiFrame(e.target.value)}
        />

        <button onClick={() => addiFrame()}>ADD</button>
        {iFrames.map((frame, index) => {
          return (
            <>
              <button onClick={() => refresh(index)}>
                Refresh {index + 1}
              </button>
              <button onClick={() => replace(index)}>
                Replace {index + 1}
              </button>
            </>
          );
        })}
        <button
          onClick={() => {
            localStorage.clear();
            setiFrames([]);
          }}
        >
          Clear Frame Storage
        </button>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          height: "100%",
        }}
      >
        {iFrames.map((frame, index) => {
          return (
            <IFrameContainer
              iFrame={frame}
              count={iFrames.length}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

const IFrameContainer = (props) => {
  return (
    <div
      id={props.index}
      style={{
        width: props.count > 1 ? "50%" : "100%",
        height: props.count > 2 ? "50%" : "100%",
        backgroundColor: "black",
        flexGrow: 0,
        flexShrink: 0,
      }}
      dangerouslySetInnerHTML={{ __html: props.iFrame }}
    ></div>
  );
};
