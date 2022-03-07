//每次调用ajax请求的时候，会先调用这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax之前先调用这个函数拼接字符串
    options.url = 'http://www.liulongbin.top:3008' + options.url
    //统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // console.log(res)   查看响应回来的数据在哪
        //res.responseJSON拿到响应回来的数据
        if (res.response.JSON.status === 1 || res.responseJSON.message === '身份认证失败') {
            //强制清空token
            localStorage.removeItem('token')
            //强制跳转到登录页面
            location.herf = '/login.html'
        }
    }
})