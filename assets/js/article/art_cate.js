// console.log(1);
$(function () {
    const form = layui.form
    // 
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                // 获取文章分类
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取文章分类失败')
                // 添加
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }
    initArtCateList();

    // 
    const layer = layui.layer;
    let indexAdd = null
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html()
        });
    });
    // 
    $("body").on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('添加图书失败')
                layer.msg('添加图书成功')
                initArtCateList();
                layer.close(indexAdd)
            }
        })
    })
    // 事件委托 编辑层弹出框
    let indexEdit = null;
    $("tbody").on('click', '.btn-edit', function (e) {
        const id = $(this).attr('data-id');
        // console.log(id);
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })
        // 发起请求获取对应分类的数据
        $.ajax({
            type: "GET",
            url: '/my/article/cates/' + id,
            success: res => {
                if (res.status !== 0) return layer.msg(res.message)
                // console.log(res);
                form.val('btn-edit', res.data)
            }
        })

    })
    // 
    $("body").on('submit', '#form-edit', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                initArtCateList(); // 更新渲染数据
                layer.close(indexEdit) //关闭弹出层
            }

        })
    })

    // 删除文章分类
    $("tbody").on("click", "#btn-delete", function () {
        const id = $(this).attr("data-id");
        // 提示用户是否删除
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！");
                    }
                    layer.msg("删除分类成功！");
                    layer.close(index);
                    initArtCateList();
                },
            });
        });
    });
})