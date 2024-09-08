import { Canvas, extend } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import { EcctrlJoystick } from "../../components/Ecctrl/EcctrlJoystick.tsx";
import { NoToneMapping } from "three";
import { useIsMobile } from "../../hooks/useIsMobile.ts";
import Experience from "../../components/Experience.tsx";
import { useCheckSceneLoad } from "../../hooks/store/useCheckSceneLoad.ts";
import { Popup } from "../../components/Popup/Popup.tsx";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen.tsx";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "space", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  // Optional animation key map
  { name: "action1", keys: ["1"] },
  { name: "action2", keys: ["2"] },
  { name: "action3", keys: ["3"] },
  { name: "action4", keys: ["KeyF"] },
  { name: "exit", keys: ["Escape"] },
];

extend({ Experience });

const App = () => {
  const isLoaded = useCheckSceneLoad((state) => state.isLoaded);
  const isMobile = useIsMobile();

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 0, 0, 1)",
          zIndex: !isLoaded ? 1000 : -1,
        }}
      >
        <LoadingScreen />
      </div>
      {isMobile && <EcctrlJoystick />}

      <KeyboardControls map={keyboardMap}>
        <Suspense fallback={<>Loading ...</>}>
          <Canvas
            id={"canvas-gameplay"}
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.2)",
              touchAction: "none",
            }}
            camera={{ fov: 85, near: 0.5, far: 300 }}
            shadows={false}
            gl={{
              powerPreference: "high-performance",
              antialias: true,
              toneMapping: NoToneMapping,
              pixelRatio: Math.min(window.devicePixelRatio, 2),
            }}
            resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
            onCreated={({ gl }) => {
              gl.setClearColor("#000000", 1);
              gl.setPixelRatio(window.devicePixelRatio || 1);
            }}
            dpr={[1, 2]}
          >
            <Experience />
          </Canvas>
        </Suspense>
      </KeyboardControls>
      <Popup />
    </>
  );
};

export default App;
