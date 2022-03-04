$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.loginbox').hide()
        $('.regbox').show()
    })
    $('#link_login').on('click', function () {
        $('.loginbox').show()
        $('.regbox').hide()
    })

    // 从layui中获取form对象
    var form = layui.form   /* layui中获取元素的方法就是layui */
    var layer = layui.layer


    // 通过layui提供的form.verify自定义校验规则
    form.verify({
        // 自定义了pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'], /* [\S]表示非空格字符 */
        // 校验两次密码输入是否一致
        repwd: function (value) {
            // 通过形参拿到确认密码框中的内容
            var pwd = $('.regbox [name = password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件  把输入信息post接口
    var data = {
        uesrname: $('#form_reg[name = username]').val(),
        password: $('#form_reg[name = password]').val()
    }
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()  //阻止默认行为
        $.post('http://www.liulongbin.top:3008/api/reg',
            data,
            function (res) {
                if (res.code !== 0) {

                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                // 如果注册成功，模拟点击去登录链接，触发，回到登录页面
                $('#link_login').click()
            })
    })


    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'http://www.liulongbin.top:3008/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layer.msg('登陆失败')
                } 
                layer.msg('登录成功')

                //将登录成功得到的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)

                // 登陆成功后跳转到主页
                location.herf = '/index.html'
            }
        })
    })
})