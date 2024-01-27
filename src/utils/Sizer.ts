import { SizeEventEnum } from "../constants/event";
import { EventEmitter } from "./EventEmitter";

export type EventName = SizeEventEnum.Resize;

export type EventDataMap = {
  [SizeEventEnum.Resize]: {
    width: number;
    height: number;
  };
};

interface Sizer {
  emit: <T extends EventName>(eventType: EventName, eventData: EventDataMap[T]) => void;
  on: (eventType: EventName, callback) => void;
}

class Sizer extends EventEmitter {
  // sizeViewport;
  // viewport = {
  //   width: 0,
  //   height: 0
  // };
  width = 0;
  height = 0;

  constructor() {
    super();
    // this.sizeViewport = document.createElement('div')
    // this.sizeViewport.style.width = '100vw'
    // this.sizeViewport.style.height = '100vh'
    // this.sizeViewport.style.position = 'absolute'
    // this.sizeViewport.style.top = 0
    // this.sizeViewport.style.left = 0
    // this.sizeViewport.style.pointerEvents = 'none'
    window.addEventListener(SizeEventEnum.Resize, this.resize.bind(this));

    this.resize();
  }

  resize() {
    // document.body.appendChild(this.sizeViewport)
    // this.viewport.width = this.sizeViewport.offsetWidth
    // this.viewport.height = this.sizeViewport.offsetHeight
    // document.body.removeChild(this.sizeViewport)

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    console.log(this);
    this.emit(SizeEventEnum.Resize, {
      width: this.width,
      height: this.height,
    });
  }
}

export default Sizer;
