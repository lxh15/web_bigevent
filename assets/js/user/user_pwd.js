$(function () {
    //
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],

        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return '新密码不能和旧密码相同'
        },
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) {
                return '新密码和确认密码不相同'
            }
        }
    })
    // 

    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/my/updatepwd",
            data: $('.layui-form').serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.location.href = '/login.html'
            }

        })
    })

})