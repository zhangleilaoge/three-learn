import { IResource } from "../../../types/file";
import contactTwitterLabel from "../../../assets/img/contact-twitter-label.png";

export enum ResourceNameEnum {
  ContactTwitterLabelTexture = "ContactTwitterLabelTexture",
}

export const RESOURCES: IResource[] = [
  {
    name: ResourceNameEnum.ContactTwitterLabelTexture,
    source: contactTwitterLabel,
  },
];
