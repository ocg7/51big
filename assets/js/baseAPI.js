// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = decodeURIComponent(kv[1])
    })
    return JSON.stringify(target)
  }
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url
  options.contentType='application/json;charset=utf-8'
  // options.data = ''&&format2Json(options.data)
  // if(typeof config.data==='object'){
  // }else{
      options.data = options.data && format2Json(options.data)
    // }
  
  
  if(options.url.includes('/my')){
    options.headers={
      Authorization:localStorage.getItem('big_news_token')||''
    }
  }
  options.error = function(err){
    if(err.responseJSON?.code===1&&err.responseJSON?.message==='身份认证失败！'){
      localStorage.clear()
      location.href = '/login.html'
    }
  }
})
