$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    //退出按钮
    $('#btn_loginout').on('click', function () {
        console.log('ok')
        // 提示用户是否确认退出
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = '/login.html'

            //关闭confirm询问框
            layer.close(index);
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象,配置权限
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function (res) {
            // console.log(res)
            if (res !== 0) {
                //弹出层
                return layui.layer.msg('获取用户信息失败')
            }
            //调用渲染头像函数
            randerAvatar(res.data)
        },
        //写在baseAPI中进行全局挂载
        /* complete:function(res){
            console.log(res)
            //res.responseJSON拿到响应回来的数据
            if (res.response.JSON.status === 1 || res.responseJSON.message === '身份认证失败'){
                //强制清空token
                localStorage.removeItem('token')
                //强制跳转到登录页面
                location.herf = '/login.html'
            }
        } */
    })
}

// 渲染头像函数
function randerAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //按需渲染用户头像
    if (user.uese_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show
        $('.text-avatar').hide()
    }
    else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('text-avatar').html(first).show
    }
}