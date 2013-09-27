var mongodb = require('./db');

function User (user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
};

module.exports = User;

User.prototype.save = function(callback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({email: user.email}, {safe: true}, function(err, doc) {
				if (err) {
					mongodb.close();
					return callback(err);
				}
				if (doc) {
					mongodb.close();
					err = "该用户名已经存在了";
					return callback(err);
				}
				collection.insert(user, {safe: true}, function(err, user) {
					mongodb.close();
					callback(err, user);
				});
			});
		});
	});
};

User.get = function(email, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({email: email}, function(err, doc) {
				mongodb.close();
				if (doc) {
					var user = new User(doc);
					callback(err, user);
				} else {
					callback(err, null);
				}
			});
		});
	});
};
