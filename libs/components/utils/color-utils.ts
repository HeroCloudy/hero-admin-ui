export const getOpacityColor = (thisColor: string, thisOpacity: string): string => {
  let theColor = thisColor.toLowerCase()
  // 十六进制颜色值的正则表达式
  const r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (theColor && r.test(theColor)) {
    if (theColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1))
      }
      theColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let j = 1; j < 7; j += 2) {
      sColorChange.push(parseInt('0x' + theColor.slice(j, j + 2)))
    }
    return 'rgba(' + sColorChange.join(',') + ',' + thisOpacity + ')'
  }
  // 如果是rgba或者rgb
  if (theColor.startsWith('rgb')) {
    let numbers = theColor.match(/(\d(\.\d+)?)+/g)
    if (numbers !== null) {
      numbers = numbers.slice(0, 3).concat(thisOpacity)
      return 'rgba(' + numbers.join(',') + ')'
    }
  }

  return theColor
}
