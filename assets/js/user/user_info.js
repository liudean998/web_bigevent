$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res)

                //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止默认重置行为
        e.preventDafult()
        //初始化表单内容
        initUserInfo()
    })

    // 重置资料
    $('.layui-btn').on('click', function (e) {
        e.preventDafult()  //阻止表单的默认提交行为
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面index的方法，重新渲染头像和信息
                window.parent.getUserInfo()
            }
        })
    })


})