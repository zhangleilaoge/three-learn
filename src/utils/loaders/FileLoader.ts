import { FileEnum } from "../../constants/file";
import { IResource } from "../../types/file";
import { EventEmitter } from "../EventEmitter";

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

export default FileLoader;
