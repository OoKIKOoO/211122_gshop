// ajax请求函数模块
// 返回值：promise对象(异步返回的值是reponse.data)
import axios from 'axios'
export default function ajax(url, data={}, type='GET'){
  return new Promise(function(resolve, reject){
    let promise
    if(type === 'GET'){
      // 准备url query 参数数据
      let dataStr = ''   // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' +data[key] + '&'
      })
      if(dataStr !== ''){
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url +'?' + dataStr
      }
      // 发送GET请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }

    promise.then(function(response){
      resolve(response.data)
    }).catch(function(error){
      reject(error)
    })
  })
}