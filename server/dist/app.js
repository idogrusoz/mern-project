"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = require("./config/db");
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
exports.app = express_1.default();
db_1.connectDb();
exports.app.use(express_1.json());
exports.app.use(cors_1.default({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));
if (process.env.NODE_ENV === "development") {
    exports.app.use(morgan_1.default("dev"));
}
var PORT = process.env.NODE_ENV === "development" ? process.env.PORT : process.env.TEST_PORT;
exports.app.use("/", routes_1.default);
exports.server = exports.app.listen(PORT, function () {
    return console.log("Server running in " + process.env.NODE_ENV + " mode on port " + PORT);
});
process.on("unhandledRejection", function (err, promise) {
    console.log("Error: " + err.message);
    exports.server.close(function () { return process.exit(1); });
});
