/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-26
 * Time: 上午9:27
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('./db'),
    markdown = require('markdown').markdown;

function Post(name, head, title, tags, img, post, desc) {
    this.name = name;
    this.head = head;
    this.title = title;
    this.tags = tags;
    this.img = img;
    this.post = post;
    this.desc = desc;
}

module.exports = Post;

Post.prototype.save = function(callback) {
    var date = new Date();
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth()+1),
        day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
    }
    var post = {
        name: this.name,
        head: this.head,
        time: time,
        title:this.title,
        tags: this.tags,
        post: this.post,
        img: this.img,
        desc: this.desc,
        comments: [],
        pv: 0
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(post, {safe: true}, function(err, doc) {
                mongodb.close();
                callback(err, post);
            })
        })
    })
}
Post.getOne = function(name, day, title, callback) {//获取一篇文章
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、发表日期及文章名进行精确查询
            collection.findOne({"name":name,"time.day":day,"title":title},function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err, null);
                }
                if (!doc) {
                    return  callback("muyou", null);
                }
                //doc.post = markdown.toHTML(doc.post);
                callback(null, doc);//返回特定查询的文章
            });
            collection.update({"name":name,"time.day":day,"title":title},{$inc:{"pv":1}});
        });
    });
};
Post.getTen = function(name, page, callback) {//一次获取十篇文章
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //使用 count 返回总文档数 total           //考虑name？？？？？？？？？？？？？
            collection.count(function(err, total){
                //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的10个结果
                collection.find(query,{skip:(page-1)*5,limit:5}).sort({
                    time: -1
                }).toArray(function (err, docs) {
                        mongodb.close();
                        if (err) {
                            callback(err, null);//失败！返回 null
                        }
                        callback(null, docs, total);
                    });
            });
        });
    });
};
Post.getTags = function(tag, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
//            collection.find({})
        })
    })
}