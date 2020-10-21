import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { Schema } from "mongoose";
import { UserDocument } from "./user.types";

const UserSchema = new Schema({
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
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
});

UserSchema.methods.generateAuthToken = function () {
    const User = this;
    const access = "user";
    const token = JWT.sign({ _id: User._id.toHexString(), access }, process.env.JWT_SECRET as string).toString();
    return token;
};

UserSchema.statics.findByToken = function (token: string) {
    var User = this;
    let decoded: { _id: string; access: "user" };

    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET as string) as { _id: string; access: "user" };
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
    });
};

UserSchema.statics.findByCredentials = function (email: string, password: string) {
    var User = this;

    return User.findOne({ email }).then((user: UserDocument) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

UserSchema.pre<UserDocument>("save", function (this: UserDocument, next) {
    var user = this;

    if (!this.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

export default UserSchema;
