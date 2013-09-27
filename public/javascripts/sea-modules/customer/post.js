/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-26
 * Time: 上午10:16
 * To change this template use File | Settings | File Templates.
 */
define(function(require, module, exports) {
    var $ = require('$');
    var Editor = require('editor');

    $(function() {
        Editor.getEditor('myEditor', {
            UEDITOR_HOME_URL: 'javascripts/sea-modules/ueditor/',
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars: [
                ['fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe','insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
                    'print', 'preview', 'searchreplace', 'help']
            ],
            shortcutMenu: ["fontfamily", "fontsize", "bold", "italic", "underline", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist"],
            // 自动高度，默认true
            autoHeightEnabled: false,
            //focus时自动清空初始化时的内容
            autoClearinitialContent: true,
            //关闭字数统计
            wordCount: true,
            //关闭elementPath
            elementPathEnabled: false,
            //默认的编辑区域高度
            initialFrameHeight: 300,
            initialFrameWidth: 800
            //更多其他参数，请参考ueditor.config.js中的配置项
        })

//        var title = $("#acticle_title").val();
//        var tags = $("#tags").val();
//        var img = document.getElementById("acticle_img");

//        $("#complete").click(complete);
//        function complete() {
//            $.ajax({
//                url: '/post',
//                type: 'post',
//                dataType: 'json',
//                data: {title :title, tagz: tags, img: img},
//                success: function() {
//                    alert("submit");
//                }
//            })
//        }

    });


})