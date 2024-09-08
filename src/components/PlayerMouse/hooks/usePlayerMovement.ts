import { useFrame } from "@react-three/fiber";

import { useAnimations, useFBX, useKeyboardControls } from "@react-three/drei";
import React, { useCallback, useEffect } from "react";
import { Group, Object3DEventMap } from "three";
import { useJoystickControls } from "../../Ecctrl/stores/useJoystickControls.ts";
import { RUN_SPEED, WALK_SPEED } from "../Player.constant.ts";

export const usePlayerMovement = (
  group: React.RefObject<Group<Object3DEventMap>>,
  action: React.MutableRefObject<{
    current_action: string;
    prev_action: string;
  }>,
) => {
  const run_fbx = useFBX("/animations/Run.fbx");
  const idle_fbx = useFBX("/animations/Idle.fbx");
  const jog_fbx = useFBX("/animations/Jogging.fbx");

  run_fbx.animations[0].name = "run";
  jog_fbx.animations[0].name = "jog";
  idle_fbx.animations[0].name = "idle";

  const animations = useAnimations(
    [run_fbx.animations[0], jog_fbx.animations[0], idle_fbx.animations[0]],
    group,
  );

  const [, get] = useKeyboardControls();

  const changeAnim = useCallback(
    (prev: string, newAction: string) => {
      animations.actions[prev]?.fadeOut(0.5);
      animations.actions[newAction]?.reset();
      animations.actions[newAction]?.fadeIn(0.5);
      animations.actions[newAction]?.play();
    },
    [animations],
  );

  useEffect(() => {
    changeAnim("idle", "idle");
  }, [animations]);

  const getJoystickValues = useJoystickControls(
    (state) => state.getJoystickValues,
  );

  useFrame(() => {
    // Normalize delta to prevent extreme values on frame drops

    // Ensure the character stays above ground level

    let movement = { x: 0, z: 0 };
    const movementState = get();

    if (movementState.forward) movement.z = 1;

    if (movementState.backward) movement.z = -1;
    if (movementState.leftward) movement.x = -1;
    if (movementState.rightward) movement.x = 1;

    let speed = movementState.run ? RUN_SPEED : WALK_SPEED;
    const { joystickDis, runState } = getJoystickValues();

    if (joystickDis > 0.1) {
      speed = runState ? RUN_SPEED : WALK_SPEED;
      movement = {
        x: Math.sin(joystickDis) * speed,
        z: Math.cos(joystickDis) * speed,
      };
    }
    if (movement.x !== 0 || movement.z !== 0) {
      action.current.prev_action = action.current.current_action;
      action.current.current_action = speed === RUN_SPEED ? "run" : "jog";
    } else {
      action.current.prev_action = action.current.current_action;
      action.current.current_action = "idle";
    }
    if (action.current.prev_action !== action.current.current_action) {
      changeAnim(action.current.prev_action, action.current.current_action);
    }
  });
  return action.current.current_action;
};
