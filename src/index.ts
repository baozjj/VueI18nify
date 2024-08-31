import { writeFile } from 'node:fs/promises'
import { getFileContent, getFileExtension } from './service/utils'
import { fileTypeHandlers } from './handlers'

const main = async () => {
  // js 文件测试
  // const path = "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test.js";
  // const resultpath =
  //   "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test-result.js";

  // vue 文件测试
  const path = '/Users/baozhangjie/Desktop/VueI18nify/src/test/vue2-test.vue'
  const resultpath = '/Users/baozhangjie/Desktop/VueI18nify/src/test/vue2-test-result.vue'

  const content = await getFileContent(path)
  const fileExtname = await getFileExtension(resultpath)

  const codeRes = fileTypeHandlers(fileExtname, content)

  writeFile(resultpath, codeRes)
}

main()
