export interface IResource {
  name: string;
  source: any;
  type?: string;
}

export enum EventNameEnum {
  LoadStart = "loadStart",
  LoadEnd = "loadEnd",
}
