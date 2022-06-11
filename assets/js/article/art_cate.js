// console.log(1);
$(function () {
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                // 获取文章分类
                console.log(res);
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
})