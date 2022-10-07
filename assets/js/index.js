let layer = layui.layer
$(function(){
  getUserInfo()
})

 function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    headers:{
      // Authorization:localStorage.getItem('big_news_token')||''
    },
    success:function(res){
      // console.log(res);
      if(res.code!==0) return layer.msg(res.message)
      renderAvatar(res)
    }
  })
}

const renderAvatar=(res)=>{
  if(res.user_pic){
    $('.text-avatar').hide()
    $('.user-box img').attr('src',res.user_pic).show()
  }else{
    $('.layui-nav-img').hide()
    const name = res.data.nickname || res.data.username
    // const char = res.data.username.charAt(0).toUpperCase()
    const char = name[0].toUpperCase()
    $('.text-avatar').html(char).show()
  }
  $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}
  
$('#btnLogout').on('click',function(){
  layer.confirm('您确定要退出吗？', {icon: 3, title:'提示'}, function(index){
    //do something
    localStorage.removeItem('big_news_token')
    location.href = '/login.html'
    layer.close(index);
  });
  
})
