$(function () {
    var layer = layui.layer


    function initAtrCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            success: function (res) {
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#btnAdd').on('click', function () {
        var indexAdd = null
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })

    // 通过代理的形式为dorm-add绑定提交事件
    $('body').on('click','代理到谁身上',function(){

        根据索引关闭弹出层
        layer.close(indexAdd)
    })
})