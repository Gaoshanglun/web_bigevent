$(function () {
    //点击去注册账号链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    //点击去登录链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //从layui中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义一个pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            //通过形参拿到确认密码框中的内容
            //还需拿到密码框中的内容
            //如果判断失败，则return一个错误消息
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }
    });

    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            // console.log('注册成功！');
            layer.msg('注册成功！');
            //模拟人的点击行为
            $('#link_login').click();
        })
    })

    //监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        // var data = { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() };
        // $.post('http://ajax.frontend.itheima.net/api/login', data, function (res) {
        //     if (res.status !== 0) {
        //         // return console.log(res.message);
        //         return layer.msg(res.message);
        //     }
        //     // console.log('注册成功！');
        //     layer.msg('登录成功！');
        // })
        $.ajax({
            url: '/api/login', 
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                //将登陆成功的token字符串保存到locaStorage中
                localStorage.setItem('token', res.token);
                // console.log(res.token);
                //跳转到后台主页
                location.href = './index.html';
            }
        })
    })



});