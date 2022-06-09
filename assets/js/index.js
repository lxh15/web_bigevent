// 获取用户信息
function getUserInfo() {
    // 
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // 身份认证字段，才能正常访问成功
        headers: { Authorization: localStorage.getItem('token') },
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('获取数据成功')
            renderAvatar(res.data)
        }
    })
}

// 
const renderAvatar = (user) => {
    const name = user.nickname || user.username
    // 欢迎语
    $("#welcome").html(`欢迎${name}`)
    // 判断头像是否已经设置过
    if (user.user_pic !== null) {
        // 设置过头像就用
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        // 没有设置过就用 用户名第一个大写
        let firstName = name[0].toUpperCase();

        $(".text-avatar").html(firstName).show()
        $('.layui-nav-img').hide()

    }
}

// 退出登录
$("#btnLogout").click(function () {
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
        // 清空本地缓存
        localStorage.removeItem('token')
        // 退出到登陆页面
        location.href = '/login.html'
        // window.history.forward(1);
        location.replace('/login.html')

    });
})

// 获取用户信息
getUserInfo()