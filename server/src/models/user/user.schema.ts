import { Schema } from "mongoose";
import { UserInterface } from "../../interfaces/user.interfaces";

const UserSchema = new Schema<UserInterface>({
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
        required: false,
    },
});

export default UserSchema;
