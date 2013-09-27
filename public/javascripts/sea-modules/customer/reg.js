define(function(require, module, exports) {
    var $ =require('$');

    function register(){
        var email = $("#email").val();
        var psw = $("#psw").val();
        var repsw = $("repsw").val();

        if (psw != repsw) {
            $("#tip").text("两次密码不一样！");
        } else {
            $.ajax({
                url: '/register',
                data: {email: email, psw: psw},
                dataType: "json",
                type: "post",
                success: function(data){
                    alert(data.info);
                }
            })
        }
    }
    exports.regist = register;
})