export declare enum TokenEnum {
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
export declare class Token {
    type: TokenEnum;
    value: number | string | null;
    constructor(type: TokenEnum, value?: number | string | null);
    /**
     * Convert the token to string.
     * @returns The string representation of the token.
     */
    toString(): string;
    isSrcIp(): boolean;
    isDstIp(): boolean;
    isIp(): boolean;
    isSrcPort(): boolean;
    isDstPort(): boolean;
    isPort(): boolean;
    isProto(): boolean;
    isIfc(): boolean;
    isCam(): boolean;
    isLeftBrace(): boolean;
    isRightBrace(): boolean;
    isAndOperator(): boolean;
    isOrOperator(): boolean;
    isNumber(): boolean;
    isIpAddress(): boolean;
}
