import React, { useEffect } from "react";
import animate from "./utils";

const Line = () => {
  useEffect(() => {
    animate();
  }, []);

  return (
    <div>
      <canvas className="canvas js-canvas"></canvas>
    </div>
  );
};

export default Line;
