$(function(){
  const form = layui.form
  const layer = layui.layer
  form.verify({
    nickname:function(value){
      if(value.length>6){
        return '昵称长度必须在1~6个字符之间'
      }

    }
  })

  const initInfo=()=>{
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res){
        if(res.code!==0) return layer.msg('请求用户信息失败')
        console.log(res);
        form.val('userForm',res.data)//如果res.data存在则为赋值，不存在为取值
      }
    })
  }
  initInfo()


  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initInfo()
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      data: form.val('userForm'),
      success(res){
        if(res.code!==0) return layer.msg('更新用户信息失败！')
        window.parent.getUserInfo()
        layer.msg('更新用户信息成功')
      }
    })
  })




})
