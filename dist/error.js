"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingError = void 0;
class ParsingError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParsingError);
        }
        this.name = "ParsingError";
    }
}
exports.ParsingError = ParsingError;
