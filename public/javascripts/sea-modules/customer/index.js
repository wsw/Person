define(function(require, moudle, exports) {
    var $ = require('$');
    var width = document.width;
    var height = document.height;
    var index = 1;
    var $pic_bg = $(".pic_bg");
    $("#nav_top").css("background", "rgba(16,16,16,0.5)");
    $pic_bg.css("width", width).css('height', height);
    $("#carousel").css("display", "block");
    setInterval(function(){
        index = index%3;
        $pic_bg.eq(index).animate({opacity:1}, function(){
            for (i = 0; i < 3; i++) {
                if (i != index) {
                    $pic_bg.eq(index).animate({opacity: 0});
                }
            }
        });
        index++;
    }, 5000);
    $("#register").click(function() {
        register();
    });
    function register(){
        var email = $("#email").val();
        var psw = $("#psw").val();
        var repsw = $("#repsw").val();

        if (!(email && psw && repsw)) {
            $("#tip").text("请填写完整！");
            return;
        }
        if (psw != repsw) {
            $("#tip").text("两次密码不一样！");
        } else {
            $.ajax({
                url: '/register',
                data: {email: email, psw: psw},
                dataType: "json",
                type: "post",
                success: function(data){
                    $("#tip").text(data.info);
                }
            })
        }
    }
})