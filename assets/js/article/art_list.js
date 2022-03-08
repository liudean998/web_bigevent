$(function () {

    // 定义美化时间过滤器
    template.defaults.imports.dataFormat = function (data) {
        new dt = new Data(data)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(di.getSeconds())

        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }
    //定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //定义一个查询对象，即将来请求数据的时候需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,  //默认请求第一页的数据
        pagesize: 2,  /* 默认显示两条数据 */
        cate_id: '',  //文章分类的id
        state: ''   //文章的发布状态
    }

    initTable()
    initCate()

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('获取文章列表失败')
                }

                // 使用模板引擎渲染页面的数据
                var htmlStr = template('#tpl-table', res)
                $('tbody').html(htmlStr)
                // 调用渲染分页区域
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                // 调用模板引擎
                var htmlStr = template('#tpl-cate', res)
                $(['name = cate_id']).html(htmlStr)
                form.render()
            }
        })
    }

    //监听表单提交事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name = cate_id]').val()
        var state = $('[name = state]').val()
        //把获取值赋值到q中
        q.cate_id = cate_id
        q.state = state
        //根据最新的筛选条件重新渲染表格数据
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        //调用laypage.render（）方法渲染分页结构
        laypage.render({
            elem: 'pageBox',    //分页容器id
            count: total,       //总数据条数
            limit: q.pagesize,  //设置每页显示几条数据
            curr: q.pagenum,     //设置默认选中页数
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],   //顺序很重要
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {     //分页切换时触发jump函数，切换每页条数时也会触发jump函数
                //调用jump的两种方式，1.点击分页，first返回值是undefined；2.调用renderPage返回true
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数

                q.pagenum = obj.curr     //把点击的页码值赋值给q查询参数
                q.pagesize = obj.limit   //每页的条数赋值给q查询参数
                //调用表格渲染方法 直接调用会发生死循环
                //调用renderPage方法触发jump函数返回值是true，取反，来解决死循环问题
                if (!first) {
                    //do something
                    initTable()
                }
            }
        })
    }

    //通过代理形式为删除按钮绑定点击事件
    $('tbody').on('click', '#btn-delete', function () {
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //获取文章id；先添加自定义属性
            var id = $(this).attr('data-id')
            var len = $('.btn-delete').length  //获取删除按钮的格式使用length方法；注意因为id属性的唯一性，这里只能用类选择器
            $.ajax({
                method: 'DELETE',
                url: '/my/article/info:' + id,
                success: function (res) {
                    if (res.code !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index);
        });



    })

})