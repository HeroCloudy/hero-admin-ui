/**
 * 将字符串转换为中划线分隔
 * @param str
 */

export const convertToStrikeThrough = (str: string): string => {
  return str
    .replace(/([a-zA-Z])([A-Z])/g, '$1-$2')
    .toLocaleLowerCase()
}

/**
 * 复制文本
 */
export const copyText = (text: string):void => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  // 选择输入框的操作
  input.select()
  // 执行复制操作
  document.execCommand('Copy')

  document.body.removeChild(input)
}
