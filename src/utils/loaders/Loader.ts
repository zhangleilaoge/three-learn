import { LoadEventEnum } from "../../constants/event";
import { IResource } from "../../types/file";
import { EventEmitter } from "../EventEmitter";
import FileLoader from "./FileLoader";
import ImgLoader, { EventDataMap as ImgLoaderEventDataMap } from "./ImgLoader";

export type EventName = LoadEventEnum.LoadEnd;

export type EventDataMap = {
  [LoadEventEnum.LoadEnd]: {};
};

interface Loader {
  emit: <T extends EventName>(eventType: EventName, eventData: EventDataMap[T]) => void;
  on: (eventType: EventName, callback) => void;
}

/** 总资源加载器 */
class Loader extends EventEmitter {
  imgLoader: FileLoader;
  resource = {};

  constructor() {
    super();
    this.imgLoader = new ImgLoader();

    this.loaders.forEach((loader) => {
      loader.on(
        LoadEventEnum.LoadEnd,
        ({ name, data }: ImgLoaderEventDataMap[LoadEventEnum.LoadEnd]) => {
          this.resource[name] = data;
          if (this.toLoad === 0) {
            this.emit(LoadEventEnum.LoadEnd, {});
          }
        },
      );
    });
  }

  load(_resources: IResource[]) {
    _resources.forEach((_resource) => {
      const extensionMatch = _resource.source.match(/\.([a-z]+)$/);

      if (extensionMatch.length < 2) {
        console.warn(`Cannot found extension of ${_resource}`);
        return;
      }

      const extension = extensionMatch[1];
      const loader = this.loaders.find((_loader) =>
        _loader.extensions.find((_extension) => _extension === extension),
      );

      if (!loader) {
        console.warn(`Cannot found loader for ${_resource}`);
        return;
      }

      loader.load(_resource);
    });
  }

  get loaders() {
    return [this.imgLoader];
  }

  get toLoad() {
    return this.loaders.map((loader) => loader?.toLoad || 0).reduce((pre, cur) => pre + cur, 0);
  }
}

export default Loader;
