var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// another connection format
mongoose.connect("mongodb://localhost/eventtra");


mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    created_at: Date,
    updated_at: Date



});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            // console.log("err " + err);
            // console.log("hash " + hash);
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });


    // console.log('i got here');
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();

});

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

UserSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.password);
    },
    encryptPassword: function(password){
        if(!password)
            return "";
        else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
    }
}


var User = mongoose.model('users', UserSchema);

module.exports = User;