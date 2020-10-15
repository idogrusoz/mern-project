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
jest.mock("./../../models/user/user.model");
var auth_service_1 = require("./../../service/auth.service");
var user_model_1 = require("./../../models/user/user.model");
var user_1 = require("./../resources/user");
var auth_service_2 = require("../../service/auth.service");
var serviceResponse_1 = __importDefault(require("../../utils/serviceResponse"));
var findOne = user_model_1.UserModel.findOne, create = user_model_1.UserModel.create, findByCredentials = user_model_1.UserModel.findByCredentials;
describe("Auth service tests", function () {
    it("returns error if user exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findOne.mockReturnValue([user_1.mockUser]);
                    expectedResponse = serviceResponse_1.default(true, 401, "This email is already in use");
                    return [4 /*yield*/, auth_service_2.registerNewUser(user_1.mockUser)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(expectedResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns success if user is created", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findOne.mockReturnValue(null);
                    create.mockReturnValue(user_1.mockUser);
                    expectedResponse = serviceResponse_1.default(false, 200, "", user_1.mockUser);
                    return [4 /*yield*/, auth_service_2.registerNewUser(user_1.mockUser)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(expectedResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it("handles creation error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findOne.mockReturnValue(null);
                    create.mockReturnValue(undefined);
                    expectedResponse = serviceResponse_1.default(true, 500, "An error occured");
                    return [4 /*yield*/, auth_service_2.registerNewUser(user_1.mockUser)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(expectedResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns error if user doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findByCredentials.mockReturnValue(null);
                    expectedResponse = serviceResponse_1.default(true, 404, "This user doesn't exist");
                    return [4 /*yield*/, auth_service_1.signInUser(user_1.userWithCorrectPassword)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(expectedResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns error if password is wrong", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findByCredentials.mockReturnValue(null);
                    findOne.mockReturnValue(user_1.mockUser);
                    expectedResponse = serviceResponse_1.default(true, 404, "Wrong password");
                    return [4 /*yield*/, auth_service_1.signInUser(user_1.userWithWrongPassword)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(expectedResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns success if user is signedIn", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findByCredentials.mockReturnValue(user_1.mockUserWithId);
                    expectedResponse = serviceResponse_1.default(false, 200, "", user_1.responseUser);
                    return [4 /*yield*/, auth_service_1.signInUser(user_1.userWithCorrectPassword)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(expectedResponse);
                    return [2 /*return*/];
            }
        });
    }); });
});
