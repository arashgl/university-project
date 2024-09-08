import { useEffect, useMemo } from "react";

export const useMouseCapture = () => {
  // Create a memoized object to store mouse coordinates
  const mouse = useMemo(() => ({ x: 0, y: 0 }), []);

  // Function to request pointer lock (capture mouse)
  const capture = () => {
    // Ask the browser to lock the pointer
    const element = document.getElementById("canvas-gameplay");
    const shouldNotLockElement = document.getElementById("popup");
    if (!element) return null;
    element.requestPointerLock =
      element.requestPointerLock ||
      (element as any).mozRequestPointerLock ||
      (element as any).webkitRequestPointerLock;
    element.requestPointerLock();
  };
  function isPointerLocked() {
    return document.pointerLockElement !== null;
  }

  useEffect(() => {
    // Add event listeners for mouse movement and click
    const element = document.getElementById("canvas-gameplay");
    if (element) {
      element.addEventListener("click", capture);

      // Clean up the event listeners when the component unmounts
      return () => {
        element.removeEventListener("click", capture);
      };
    }
  });

  return { mouse, isPointerLocked }; // Return the mouse object with the current mouse coordinates
};
