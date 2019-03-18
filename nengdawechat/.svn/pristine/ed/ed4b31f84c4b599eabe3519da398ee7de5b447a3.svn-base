//文件地址
export const fileUrl = 'http://api.epoweroad.com:8907/API';
//图片地址
export const imgUrl = 'http://api.epoweroad.com:8907';
// api接口地址
// export const apiUrl = 'http://api.epoweroad.com:8907/API/';//服务器

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}
