/**
 * 匹配网站url正则
 */
const URL_REG =
  /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

/**
 * 识别文本中的超链接
 * @param text
 * @desc 
 */
const smartText = (text?: string) => {
  if (!text) {
    return text;
  }
  const reg = new RegExp(URL_REG, "gi");    //g:global match  i:ignore case
    text.replaceAll(reg, "<a href='$1' target='_blank'>$1</a>");    
    return text;
};

export default smartText;
