import { readFile } from "node:fs/promises";
import { extname } from "node:path";

// 读取文件内容，并确保异常处理
export const getFileContent = async (filePath: string): Promise<string> => {
  try {
    // 如果文件不存在，fs.readFileSync 将会抛出异常
    const content = await readFile(filePath, "utf8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return ""; // 或者你可以重新抛出异常
  }
};

// 获取文件的扩展名
export const getFileExtension = async (filePath: string): Promise<string> => {
  try {
    const ext = await extname(filePath);
    return ext;
  } catch (error) {
    console.error(
      `Error getting file extension from ${filePath}: ${error.message}`
    );
    return "";
  }
};
