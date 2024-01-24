type ICallbackParams = Record<string, any>;

type ICallback = (params: ICallbackParams) => void;

interface ICallbacks {
  [key: string]: ICallback[];
}

/** @description 事件订阅触发器 */
export class EventEmitter {
  callbacks: ICallbacks = {};

  constructor() {}

  /** @description 订阅 */
  on(eventName: string, callback: ICallback) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = [];
    }

    this.callbacks[eventName].push(callback);
  }

  /** @description 取消订阅 */
  off(eventName: string, callback?: ICallback) {
    if (!this.callbacks[eventName]) {
      return;
    }
    if (!callback) {
      this.callbacks[eventName] = [];
      return;
    }

    this.callbacks[eventName] = this.callbacks[eventName].filter((cb) => cb !== callback);
  }

  /** @description 触发回调 */
  emit(eventName: string, params: ICallbackParams) {
    if (!this.callbacks[eventName]) {
      return;
    }

    this.callbacks[eventName]?.forEach((cb) => cb(params));
  }

  /** @description 冒泡 */
  pop(eventNames: string[], eventEmitters: EventEmitter[]) {
    eventEmitters.forEach((eventEmitter) => {
      eventNames.forEach((eventName) => {
        eventEmitter.on(eventName, (params) => {
          this.emit(eventName, params);
        });
      });
    });
  }
}
