import { FileEnum } from "../constants/file";
import { EventNameEnum, IResource } from "../types/file";
import { EventEmitter } from "./EventEmitter";

interface IFileLoaderParams {
  extensions: FileEnum[];
}

/** 资源加载器基类 */
class FileLoader extends EventEmitter {
  extensions: FileEnum[];
  resource = {};
  toLoad = 0;
  loaded = 0;

  constructor({ extensions }: IFileLoaderParams) {
    super();
    this.extensions = extensions;
  }

  load(_resource: IResource) {}
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
    // this.emit(EventNameEnum.LoadStart, {});

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

    this.emit(EventNameEnum.LoadEnd, {
      loaded: this.loaded,
      toLoad: this.toLoad,
      name: _resource.name,
      data: data,
    });
  }
}

/** 总资源加载器 */
export class Loader extends EventEmitter {
  imgLoader: FileLoader;
  resource = {};

  constructor() {
    super();
    this.imgLoader = new ImgLoader();

    this.loaders.forEach((loader) => {
      loader.on(EventNameEnum.LoadEnd, ({ name, data }) => {
        this.resource[name] = data;
      });
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
