$(function () {
  // 点击去注册
  $('#go2Reg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  // 点击去登录
  $('#go2Login').on('click', function () {
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })
  // 需要从 layui对象身上取到 form
  const form = layui.form
  const layer = layui.layer
  form.verify({
    // 添加自定义规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 确认密码框
    repwd: function (value) {
      // 拿到密码框和再次确认密码作比较
      // 属性选择器：$('[name=xxx]').val()
      if ($('#password').val() !== value) {
        return '两次密码不一致，请重新输入'
      }
    }
  })
  // 将key=value形式的数据，转成json格式的字符串
 
  // 给注册表单添加提交事件（会刷新浏览器）
  // $('#formReg').submit(function () {})
  $('#formReg').on('submit', function (e) {
    e.preventDefault()
    // 发请求了 ajax
    // 经过分析：1、修改 Content-Type 2、需要将参数转成 json 格式
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // data: JSON.stringify({
      //   // 可以将对象转成json格式的字符串
      //   username: $('#formReg [name=username]').val(),
      //   password: $('#formReg [name=password]').val(),
      //   repassword: $('#formReg [name=repassword]').val()
      // }),
      // data: format2Json($(this).serialize()),
      data:$(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        $('#go2Login').click()
        // $('#go2Login').trigger('click')
        layer.msg('注册成功')
        // 打开登录表单(模拟点击操作：1、click 2、trigger('click') 3、triggerHandler('click'))
      }
    })
  })
  $('#formLogin').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // data: format2Json($(this).serialize()),
      data:$(this).serialize(),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
       localStorage.setItem('big_news_token',res.token)
      //  token的意思是令牌的意思(下一次去请求权限的接口的时候“带着”)
      // 固定写法：Bearer token字符串、Bearer译为持票人拿着token去请求
       location.href = '/home.html'
      }
    })
  })




})