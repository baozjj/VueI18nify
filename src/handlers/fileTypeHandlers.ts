import { FileType } from "../types/interface";
import { handleJs } from "./jsHandler";
import { handleVue } from "./vueHandler";

export const fileTypeHandlers = (fileType: string, content: string) => {
  let codeRes: string = "";
  switch (fileType) {
    case FileType.JS:
    case FileType.TS:
      codeRes = handleJs(content);
      break;
    case FileType.VUE:
      codeRes = handleVue(content);
      break;
    default:
      console.error(`Unsupported file type: ${fileType}`);
  }

  return codeRes;
};
