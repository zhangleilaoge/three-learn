import React, { useEffect } from "react";
import Application from "./service/Application";
import s from "./style.m.scss";

const Text = () => {
  useEffect(() => {
    const app = new Application();
    app.start();

    return () => {
      app.stop();
    };
  }, []);

  return <canvas className={s["jsCanvas"]}></canvas>;
};

export default Text;
