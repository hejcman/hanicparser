"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HanicParser = void 0;
const error_1 = require("./error");
const lexer_1 = require("./lexer");
const structures_1 = require("./structures");
const tokens_1 = require("./tokens");
class HanicParser {
    constructor() {
        this.brace_stack = new structures_1.Stack();
        this.lexer = new lexer_1.Lexer();
    }
    parseLeftBrace() {
        this.brace_stack.push("(");
    }
    parseRightBrace() {
        let ret = this.brace_stack.pop();
        if (ret === null || ret === undefined) {
            throw new error_1.ParsingError("Missing an opening brace!");
        }
    }
    parseProto() {
        let next = this.lexer.get_next_token();
        if (!next.isNumber()) {
            throw new error_1.ParsingError("Protocol must be followed by a number!");
        }
        if (next.value < 0 || 255 < next.value) {
            throw new error_1.ParsingError("Protocol identifier must be in range <0, 255>!");
        }
    }
    parsePort() {
        let next = this.lexer.get_next_token();
        if (!next.isNumber()) {
            throw new error_1.ParsingError("Port must be followed by a number!");
        }
        if (next.value < 0 || 65535 < next.value) {
            throw new error_1.ParsingError("Port number must be in range <0, 65535>!");
        }
    }
    parseIp() {
        let next = this.lexer.get_next_token();
        if (!next.isIpAddress()) {
            throw new error_1.ParsingError("Address specifier must be followed by an IP address!");
        }
    }
    parse(input) {
        /** Prepare the lexer and inner state for parsing. */
        this.lexer.init(input);
        this.expr_loaded = false;
        /** Get the first token. If it is empty, return true, as that is a valid filter. */
        let token = this.lexer.get_next_token();
        /** While we are not at the end of the filter, keep going. */
        while (token.type !== tokens_1.TokenEnum.EOF) {
            switch (token.type) {
                /** Left braces and right braces must be equal in number, use a stack to store them. */
                // TODO: Perhaps a simple counter would be enough?
                case tokens_1.TokenEnum.LEFT_BRACE:
                    this.parseLeftBrace();
                    break;
                case tokens_1.TokenEnum.RIGHT_BRACE:
                    this.parseRightBrace();
                    break;
                case tokens_1.TokenEnum.PROTO:
                    if (this.expr_loaded)
                        throw new error_1.ParsingError("You must include an and/or operator between expressions!");
                    this.parseProto();
                    this.expr_loaded = true;
                    break;
                case tokens_1.TokenEnum.SRC_PORT:
                case tokens_1.TokenEnum.DST_PORT:
                case tokens_1.TokenEnum.PORT:
                    if (this.expr_loaded)
                        throw new error_1.ParsingError("You must include an and/or operator between expressions!");
                    this.parsePort();
                    this.expr_loaded = true;
                    break;
                case tokens_1.TokenEnum.SRC_IP:
                case tokens_1.TokenEnum.DST_IP:
                case tokens_1.TokenEnum.IP:
                    if (this.expr_loaded)
                        throw new error_1.ParsingError("You must include an and/or operator between expressions!");
                    this.parseIp();
                    this.expr_loaded = true;
                    break;
                case tokens_1.TokenEnum.OR_OPERATOR:
                case tokens_1.TokenEnum.AND_OPERATOR:
                    if (!this.expr_loaded)
                        throw new error_1.ParsingError("The and/or operators must be placed between two expressions!");
                    this.expr_loaded = false;
                    break;
            }
            token = this.lexer.get_next_token();
        }
        return true;
    }
}
exports.HanicParser = HanicParser;
