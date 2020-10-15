"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_route_1 = __importDefault(require("./auth.route"));
var routes = express_1.Router();
routes.use("/api/v1/auth", auth_route_1.default);
exports.default = routes;
