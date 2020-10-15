"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWithWrongPassword = exports.userWithCorrectPassword = exports.responseUser = exports.mockUserWithId = exports.mockUser = void 0;
exports.mockUser = {
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@test.test",
    password: "password",
};
exports.mockUserWithId = __assign(__assign({}, exports.mockUser), { _id: "userId" });
exports.responseUser = {
    _id: "userId",
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@test.test",
};
exports.userWithCorrectPassword = {
    email: "test@test.test",
    password: "password",
};
exports.userWithWrongPassword = {
    email: "test@test.test",
    password: "wrong",
};
