import React, { useEffect } from "react";
import { animate, stop } from "./utils";

const Cube = () => {
  useEffect(() => {
    animate();

    return () => {
      stop();
    };
  }, []);

  return (
    <div>
      <canvas className="canvas js-canvas"></canvas>
    </div>
  );
};

export default Cube;
