"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            "Please use a valid email address",
        ],
        maxlength: [30, "Email can not be longer than 30 characters"],
    },
    firstName: {
        type: String,
        unique: false,
        trim: true,
        maxlength: [50, "First name can not be longer than 50 characters"],
    },
    lastName: {
        type: String,
        unique: false,
        trim: true,
        maxlength: [50, "Last name can not be longer than 50 characters"],
    },
    displayName: {
        type: String,
        unique: false,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "user";
    var token = jsonwebtoken_1.default.sign({ _id: user._id.toHexString(), access: access }, process.env.JWT_SECRET).toString();
    return token;
};
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
    });
};
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email: email }).then(function (user) {
        if (!user) {
            return Promise.reject();
        }
        return new Promise(function (resolve, reject) {
            bcrypt_1.default.compare(password, user.password, function (err, res) {
                if (res) {
                    resolve(user);
                }
                else {
                    reject();
                }
            });
        });
    });
};
UserSchema.pre("save", function (next) {
    var user = this;
    if (!this.isModified("password"))
        return next();
    bcrypt_1.default.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
exports.default = UserSchema;
