import { LoadEventEnum } from "../../constants/event";
import { FileEnum } from "../../constants/file";
import { IResource } from "../../types/file";
import FileLoader from "./FileLoader";

export type EventName = LoadEventEnum.LoadEnd;

export type EventDataMap = {
  [LoadEventEnum.LoadEnd]: {
    name: string;
    data: any;
  };
};

interface ImgLoader {
  emit: <T extends EventName>(eventType: EventName, eventData: EventDataMap[T]) => void;
  on: (eventType: EventName, callback) => void;
}

/** 图片资源加载器 */
class ImgLoader extends FileLoader {
  constructor() {
    super({
      extensions: [FileEnum.Png, FileEnum.Jpg],
    });
  }

  load(_resource: IResource) {
    this.toLoad += 1;

    const image = new Image();

    image.addEventListener("load", () => {
      this.loadEnd(_resource, image);
    });
    image.addEventListener("error", () => {
      this.loadEnd(_resource, image);
    });

    image.src = _resource.source;
  }

  loadEnd(_resource: IResource, data: any) {
    this.toLoad -= 1;
    this.loaded += 1;
    this.resource[_resource.name] = data;

    this.emit(LoadEventEnum.LoadEnd, {
      name: _resource.name,
      data: data,
    });
  }
}

export default ImgLoader;
