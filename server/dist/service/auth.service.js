"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.signInUser = exports.registerNewUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = require("./../models/user/user.model");
var serviceResponse_1 = __importDefault(require("../utils/serviceResponse"));
exports.registerNewUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var getExistingUser, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, findUser(user.email)];
            case 1:
                getExistingUser = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                if (!(getExistingUser === null)) return [3 /*break*/, 4];
                return [4 /*yield*/, createUser(user)];
            case 3:
                newUser = _a.sent();
                console.log("New user created");
                if (newUser) {
                    return [2 /*return*/, serviceResponse_1.default(false, 200, "", newUser)];
                }
                else {
                    return [2 /*return*/, serviceResponse_1.default(true, 500, "An error occured")];
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, serviceResponse_1.default(true, 401, "This email is already in use")];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, serviceResponse_1.default(true, 500, "An error occured")];
            case 7: return [2 /*return*/];
        }
    });
}); };
var findUser = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var findUserByEmailCredentials = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.UserModel.findByCredentials(email, password)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var createUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.UserModel.create(data)];
            case 1:
                newUser = _a.sent();
                return [2 /*return*/, newUser];
        }
    });
}); };
exports.signInUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userWithEmail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, findUserByEmailCredentials(data.email, data.password)];
            case 1:
                user = _a.sent();
                if (!(user === null)) return [3 /*break*/, 3];
                return [4 /*yield*/, findUser(data.email)];
            case 2:
                userWithEmail = _a.sent();
                if (userWithEmail === null) {
                    return [2 /*return*/, serviceResponse_1.default(true, 404, "This user doesn't exist")];
                }
                else {
                    return [2 /*return*/, serviceResponse_1.default(true, 404, "Wrong password")];
                }
                return [3 /*break*/, 4];
            case 3: return [2 /*return*/, serviceResponse_1.default(false, 200, "", buildUser(user))];
            case 4: return [2 /*return*/];
        }
    });
}); };
var buildUser = function (user) {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        email: user.email,
    };
};
exports.signToken = function (userId) {
    return jsonwebtoken_1.default.sign({ _id: userId, access: "user" }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};
