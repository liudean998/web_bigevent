//每次调用ajax请求的时候，会先调用这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //在发起真正的ajax之前先调用这个函数拼接字符串
    options.url = 'http://www.liulongbin.top:3008' +options.url
})