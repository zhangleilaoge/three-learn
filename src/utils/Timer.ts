import { EventEmitter } from "./EventEmitter";

export default class Timer extends EventEmitter {
  start = 0;
  current = 0;
  ticker: number;

  constructor() {
    super();

    this.start = this.current = Date.now();
  }

  tick() {
    this.ticker = requestAnimationFrame(() => this.tick());

    const current = Date.now();
    this.current = current;
    this.emit("tick", {});
  }

  stop() {
    window.cancelAnimationFrame(this.ticker);
  }
}
