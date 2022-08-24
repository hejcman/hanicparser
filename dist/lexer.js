"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const tokens_1 = require("./tokens");
const error_1 = require("./error");
const ip_address_1 = require("ip-address");
class Lexer {
    constructor(text = null) {
        /** The currently parsed character. */
        this.current_char = "";
        if (text !== null && text !== undefined) {
            this.init(text);
        }
    }
    init(text) {
        this.text = text;
        this.pos = 0;
        if (text.length === 0) {
            this.current_char = "";
        }
        else {
            this.current_char = text[this.pos];
        }
    }
    /**
     * Raise an error from the lexer.
     * @param message The error message.
     */
    error(message) {
        throw new error_1.ParsingError(message);
    }
    /**
     * Move the pointer to the current character in the input string.
     * @param steps The number of steps to move. Defaults to 1.
     */
    step(steps = 1) {
        this.pos += steps;
        if (this.pos > this.text.length - 1) {
            this.current_char = null; //EOF
        }
        else {
            this.current_char = this.text[this.pos];
        }
    }
    /**
     * Look at characters ahead of the current pointer without moving it.
     * @param count The number of characters to look ahead.
     * @returns The character at the desired index or null if EOF is reached.
     */
    peek(count) {
        const idx = this.pos + count;
        if (idx > this.text.length - 1) {
            return null; //EOF
        }
        else {
            return this.text[idx];
        }
    }
    /**
     * Get the next word in the string.
     *
     * A word is considered to be a list of characters delimited by braces or a space.
     * @returns The next word.
     */
    get_next_word() {
        this.skip_whitespace();
        let result = "";
        while (this.current_char !== null &&
            this.current_char.match("[^() ]") !== null) {
            result += this.current_char;
            this.step();
        }
        return result;
    }
    /**
     * Move the current pointer further until it doesn't point to a space character.
     *
     * A space character is taken to be space or newline.
     */
    skip_whitespace() {
        while (this.current_char === " " || this.current_char === "\n") {
            this.step();
        }
    }
    /**
     * Get the next token from the string.
     *
     * If there are no more tokens to be generated from the string, return EOF token.
     * @returns The next token.
     */
    get_next_token() {
        // If there are no more tokens, return EOF.
        if (this.current_char === null || this.current_char === undefined) {
            return new tokens_1.Token(tokens_1.TokenEnum.EOF);
        }
        // Skip whitespace to get to the next character.
        this.skip_whitespace();
        if (this.current_char === "(") {
            this.step();
            return new tokens_1.Token(tokens_1.TokenEnum.LEFT_BRACE);
        }
        if (this.current_char === ")") {
            this.step();
            return new tokens_1.Token(tokens_1.TokenEnum.RIGHT_BRACE);
        }
        let word = this.get_next_word();
        switch (word) {
            case "and":
                return new tokens_1.Token(tokens_1.TokenEnum.AND_OPERATOR);
            case "or":
                return new tokens_1.Token(tokens_1.TokenEnum.OR_OPERATOR);
            case "sip":
                return new tokens_1.Token(tokens_1.TokenEnum.SRC_IP);
            case "dip":
                return new tokens_1.Token(tokens_1.TokenEnum.DST_IP);
            case "ip":
                return new tokens_1.Token(tokens_1.TokenEnum.IP);
            case "sport":
                return new tokens_1.Token(tokens_1.TokenEnum.SRC_PORT);
            case "dport":
                return new tokens_1.Token(tokens_1.TokenEnum.DST_PORT);
            case "port":
                return new tokens_1.Token(tokens_1.TokenEnum.PORT);
            case "proto":
                return new tokens_1.Token(tokens_1.TokenEnum.PROTO);
            case "ifc":
                return new tokens_1.Token(tokens_1.TokenEnum.IFC);
            case "cam":
                return new tokens_1.Token(tokens_1.TokenEnum.CAM);
            default:
                let address = null;
                let number = null;
                try {
                    address = new ip_address_1.Address4(word);
                    if (address.isCorrect()) {
                        return new tokens_1.Token(tokens_1.TokenEnum.IP_ADDR, address.address);
                    }
                    else {
                        throw new error_1.ParsingError("The IPv4 address " + word + " is not valid!");
                    }
                }
                catch (e) { }
                try {
                    address = new ip_address_1.Address6(word);
                    if (address.isCorrect()) {
                        return new tokens_1.Token(tokens_1.TokenEnum.IP_ADDR, address.address);
                    }
                    else {
                        throw new error_1.ParsingError("The IPv6 address " + word + " is not valid!");
                    }
                }
                catch (e) { }
                number = parseInt(word, 10);
                if (!isNaN(number)) {
                    return new tokens_1.Token(tokens_1.TokenEnum.NUMBER, number);
                }
                // FIXME: Add parsing for IP addresses.
                this.error(`Unknown token "${word}"!`);
                break;
        }
    }
}
exports.Lexer = Lexer;
