import { ParsingError } from "./error";
import { Lexer } from "./lexer";
import { Stack } from "./structures";
import { Token, TokenEnum } from "./tokens";

export class HanicParser {

    private brace_stack = new Stack()
    private lexer = null

    constructor(input: string){
        this.lexer = new Lexer(input)
    }

    private parseLeftBrace(): void {
        this.brace_stack.push("(")
    }

    private parseRightBrace(): void {
        let ret = this.brace_stack.pop()
        if (ret === null || ret === undefined) {
            throw new ParsingError("Missing an opening brace!")
        }
    }

    private parseProto(): void {
        let next = this.lexer.get_next_token()
        if (!next.isNumber()) {
            throw new ParsingError("Protocol must be followed by a number!")
        }
        if (next < 0 || 255 < next) {
            throw new ParsingError("Protocol identifier must be in range <0, 255>!")
        }
    }

    private parsePort(): void {
        let next = this.lexer.get_next_token()
        if (!next.isNumber()) {
            throw new ParsingError("Port must be followed by a number!")
        }
        if (next < 0 || next < 65536) {
            throw new ParsingError("Port number must be in range <0, 65535>!")
        }
    }

    private parseIp(): void {
        let next = this.lexer.get_next_token()
        if (!next.isIpAddress()) {
            throw new ParsingError("Address specifier must be followed by an IP address!")
        }
    }

    private parse(input: string): boolean {
        let token = null
        while (token != TokenEnum.EOF) {
            switch(this.lexer.get_next_token()) {
                case TokenEnum.LEFT_BRACE:
                    this.parseLeftBrace()
                case TokenEnum.RIGHT_BRACE:
                    this.parseRightBrace()
                case TokenEnum.PROTO:
                    this.parseProto()
                case TokenEnum.SRC_PORT:
                case TokenEnum.DST_PORT:
                case TokenEnum.PORT:
                    this.parsePort()
                case TokenEnum.SRC_IP:
                case TokenEnum.DST_IP:
                case TokenEnum.IP:
                    this.parseIp()
            }
        }
        return true
    }
}
