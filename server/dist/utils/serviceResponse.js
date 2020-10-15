"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildServiceResponse = function (error, statusCode, message, data) {
    return {
        error: error,
        statusCode: statusCode,
        message: message,
        data: data,
    };
};
exports.default = buildServiceResponse;
