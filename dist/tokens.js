"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenEnum = void 0;
var TokenEnum;
(function (TokenEnum) {
    TokenEnum["SRC_IP"] = "sip";
    TokenEnum["DST_IP"] = "dip";
    TokenEnum["IP"] = "ip";
    TokenEnum["SRC_PORT"] = "sport";
    TokenEnum["DST_PORT"] = "dport";
    TokenEnum["PORT"] = "port";
    TokenEnum["PROTO"] = "proto";
    TokenEnum["IFC"] = "ifc";
    TokenEnum["CAM"] = "cam";
    TokenEnum["LEFT_BRACE"] = "(";
    TokenEnum["RIGHT_BRACE"] = ")";
    TokenEnum["AND_OPERATOR"] = "and";
    TokenEnum["OR_OPERATOR"] = "or";
    TokenEnum["NUMBER"] = "NUMBER";
    TokenEnum["IP_ADDR"] = "IP_ADDR";
    TokenEnum["EOF"] = "EOF";
})(TokenEnum = exports.TokenEnum || (exports.TokenEnum = {}));
class Token {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
    }
    /**
     * Convert the token to string.
     * @returns The string representation of the token.
     */
    toString() {
        if (this.value === null || this.value === undefined) {
            return `Token<${this.type}>`;
        }
        else {
            return `Token<${this.type} - ${this.value}>`;
        }
    }
    isSrcIp() {
        return this.type === TokenEnum.SRC_IP;
    }
    isDstIp() {
        return this.type === TokenEnum.DST_IP;
    }
    isIp() {
        return this.type === TokenEnum.IP;
    }
    isSrcPort() {
        return this.type === TokenEnum.SRC_PORT;
    }
    isDstPort() {
        return this.type === TokenEnum.DST_PORT;
    }
    isPort() {
        return this.type === TokenEnum.PORT;
    }
    isProto() {
        return this.type === TokenEnum.PROTO;
    }
    isIfc() {
        return this.type === TokenEnum.IFC;
    }
    isCam() {
        return this.type === TokenEnum.CAM;
    }
    isLeftBrace() {
        return this.type === TokenEnum.LEFT_BRACE;
    }
    isRightBrace() {
        return this.type === TokenEnum.RIGHT_BRACE;
    }
    isAndOperator() {
        return this.type === TokenEnum.AND_OPERATOR;
    }
    isOrOperator() {
        return this.type === TokenEnum.OR_OPERATOR;
    }
    isNumber() {
        return this.type === TokenEnum.NUMBER;
    }
    isIpAddress() {
        return this.type === TokenEnum.IP_ADDR;
    }
}
exports.Token = Token;
