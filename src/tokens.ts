
import * as IpAddress from 'ip-address'
import { isNullOrUndefined } from 'util';

export enum TokenEnum {
    SRC_IP = "sip",
    DST_IP = "dip",
    IP = "ip",
    SRC_PORT = "sport",
    DST_PORT = "dport",
    PORT = "port",
    PROTO = "proto",
    IFC = "ifc",
    CAM = "cam",
    LEFT_BRACE = "(",
    RIGHT_BRACE = ")",
    AND_OPERATOR = "and",
    OR_OPERATOR = "or",
    NUMBER = "NUMBER",
    IP_ADDR = "IP_ADDR",
    EOF = "EOF"
}

export class Token {

    constructor(public type: TokenEnum, public value: number | string | null = null){}

    /**
     * Convert the token to string.
     * @returns The string representation of the token.
     */
    public toString(): string {
        if (this.value === null || this.value === undefined) {
            return `Token<${this.type}>`
        } else {
            return `Token<${this.type} - ${this.value}>`
        }
    }

    public isSrcIp(): boolean {
        return this.type === TokenEnum.SRC_IP;
    }

    public isDstIp(): boolean {
        return this.type === TokenEnum.DST_IP;
    }

    public isIp(): boolean {
        return this.type === TokenEnum.IP;
    }

    public isSrcPort(): boolean {
        return this.type === TokenEnum.SRC_PORT;
    }

    public isDstPort(): boolean {
        return this.type === TokenEnum.DST_PORT;
    }

    public isPort(): boolean {
        return this.type === TokenEnum.PORT;
    }

    public isProto(): boolean {
        return this.type === TokenEnum.PROTO;
    }

    public isIfc(): boolean {
        return this.type === TokenEnum.IFC;
    }

    public isCam(): boolean {
        return this.type === TokenEnum.CAM;
    }

    public isLeftBrace(): boolean {
        return this.type === TokenEnum.LEFT_BRACE;
    }

    public isRightBrace(): boolean {
        return this.type === TokenEnum.RIGHT_BRACE;
    }

    public isAndOperator(): boolean {
        return this.type === TokenEnum.AND_OPERATOR;
    }

    public isOrOperator(): boolean {
        return this.type === TokenEnum.OR_OPERATOR;
    }

    public isNumber(): boolean {
        return this.type === TokenEnum.NUMBER;
    }

    public isIpAddress(): boolean {
        return this.type === TokenEnum.IP_ADDR;
    }
}

