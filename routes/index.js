
/*
 * GET home page.
 */
var crypto = require('crypto');
    User = require('../models/user.js'),
    images = require('node-images'),
    fs = require('fs'),
    Post = require('../models/post');

module.exports = function(app) {
    app.get('/', function(req, res){
        console.log(req.session);
        res.render('index', {
            title: "wsw",
            user: req.session.user, //这里可以调用ejs模板的local.user访问到
            error: req.flash('error').toString(), //这里可以调用ejs模板的local.error访问到
            success: req.flash('success').toString() //这里可以调用ejs模板的local.success访问到
        });
    });
    app.get('/list/:name', function(req, res) {
        var name = req.params.name;
        Post.getTen(name, 1, function(err, docs, total) {
             if (err) {
                 res.send("出错了")
             }
            for (var i = 0; i < docs.length; i++){
                docs[i].img = docs[i].img && docs[i].img.replace("./public/", "");
                if (!docs[i].img) {
                    docs[i].img = "images/pic1.jpg";
                }
            }
            res.render('list', {
                title: "博客",
                posts: docs,
                totalPages: total/5+1,
                user: req.session.user, //这里可以调用ejs模板的local.user访问到
                error: req.flash('error').toString(), //这里可以调用ejs模板的local.error访问到
                success: req.flash('success').toString() //这里可以调用ejs模板的local.success访问到
            })
        })

    });
    app.post('/register', function(req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.psw).digest('hex');
        var newUser = new User({
            name: req.body.email,
            password: password,
            email: req.body.email
        })
        newUser.save(function(err, user){
            if (err) {
                res.send({info: err});
                return;
            }
            res.send({info: "注册成功，可以登录了!"});
        })
    })
    app.post('/login', function(req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.psw).digest('hex');
        User.get(req.body.email, function(err, user){
            if (!user) {
                res.send({info: "用户不存在！"});
                return ;
            }
            if (user.password != password) {
                res.send({info: "密码错误！"});
                return;
            }
            req.session.user = user;
            res.send({info: "登录成功"});
            console.log(req.session);
        });
    });
    app.get('/logout', function(req, res){
        req.session.user = null;
        res.send({info: "成功退出"});
    })
    app.get('/post', function(req, res) {
        if (!req.session.user) {
            req.flash('error', "请登录！");
            return res.redirect('/')
        }
        res.render('post',{
            title:"发表文章",
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/post', function(req, res) {
        var tmp_path, target_path;
        if (req.files.thumbnail.size > 0) {  //表示有图片上传
            tmp_path = req.files.thumbnail.path;
            //指定文件上传后的目录
            //重命名图片名字
            var picType = req.files.thumbnail.name.split(".");
            var date = new Date();
            var minute = date.getFullYear() + "" + (date.getMonth()+1) + "" + date.getDate() + "" + date.getHours() + "" + date.getMinutes();
            picType = picType[1];
            target_path = './public/images/post/pic_' + minute + "." + picType;
            //移动file
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                images(target_path).size(400).save(target_path, {quality:7});
            });
        }

        var md5 = crypto.createHash('md5'),
            currentUser = req.session.user,
            email_MD5 = md5.update(currentUser.email.toLowerCase()).digest('hex'),
            head = "本文来自http://wsw.github.com/wenshuwen/" + email_MD5 + "?s=48";
        var newPost = new Post(currentUser.email, head, req.body.title, req.body.tags.split(" "), target_path, req.body.myContent, req.body.desc);

        newPost.save(function(err, doc) {
             if (err) {
                 res.send({info: "出问题了"});
                 return;
             }
//           res.send({info: "发表成功!"});
            console.log(doc['time'])
             var show = "/u/"+ doc.name + "/" + doc['time'].day + "/" + doc.title;
             console.log(show);
             res.redirect(show);
        })
    })
    app.get('/u/:name/:day/:title', function(req, res) {
        Post.getOne(req.params.name, req.params.day, req.params.title, function(err, post){
            if (err) {
                 res.send("出问题了");
            }
            res.render("acticle", {
                title: post.title,
                post: post,
                user: req.session.user
            })
        })
    })
    app.get('/getpage', function(req, res) {
       Post.getTen(req.query.name, req.query.page, function(err, docs, total) {
           if (err) {
               res.send("出错了")
           }
           for (var i = 0; i < docs.length; i++){
               docs[i].img = docs[i].img && docs[i].img.replace("./public/", "");
               if (!docs[i].img) {
                   docs[i].img = "images/pic1.jpg";
               }
           }
           console.log(docs);
           res.send({posts: docs});
       })
    })
    app.get('/data', function(req, res) {
        var key = req.query.key;
        data = {data: ['html5','game','jquery','cocoxd','bootstrap','nono']} ;

        if (data.data.length > 5) {
            data.data.splice(5);
        }
        res.send(data);
    })
}