"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = require("./../controllers/auth.controller");
var express_1 = require("express");
var auth_controller_2 = require("../controllers/auth.controller");
var auth = express_1.Router();
auth.route("/register").post(auth_controller_2.register);
auth.route("/signin").post(auth_controller_1.signIn);
exports.default = auth;
