import { EventEmitter } from "./EventEmitter";
import { TimeEventEnum } from "../constants/event";

export type EventName = TimeEventEnum.Tick;

export type EventDataMap = {
  [TimeEventEnum.Tick]: {};
};

interface Timer {
  emit: <T extends EventName>(eventType: EventName, eventData: EventDataMap[T]) => void;
  on: (eventType: EventName, callback) => void;
}

class Timer extends EventEmitter {
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
    this.emit(TimeEventEnum.Tick, {});
  }

  stop() {
    window.cancelAnimationFrame(this.ticker);
  }
}

export default Timer;
