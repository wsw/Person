/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-25
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */
define(function(require, module, exports) {
    var $ = require('$');

    if ($("#login_panel").size() == 0) {
        $("#username").css("display", "block");
    }
    $("#login_btn").click(function() {
        login();
    });
    $("#logout").click(function(){
       logout();
    });

    function login() {
        var email = $("#login_email").val();
        var psw = $("#login_psw").val();

        if (!(email && psw)) {
            alert("请填写完整！");
            return;
        }
        $.ajax({
            url: '/login',
            type: "post",
            data: {email: email, psw: psw},
            dataType: "json",
            success: function(data) {
                if (data.info == "登录成功") {
                    $("#login_panel").css("display", "none");
                    $("#username").css("display", "block").find("span").html(email);
                } else {
                   alert("error")
                }
            }
        })
    }
    function logout() {
        $.ajax({
            url: '/logout',
            type: 'get',
            success: function() {
                  window.location.href="/";
            }
        })
    }
})
