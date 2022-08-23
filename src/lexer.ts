import internal = require("stream");
import { Token, TokenEnum } from "./tokens";
import { ParsingError } from "./error";
import { runInThisContext } from "vm";
import { Address4 } from "ip-address";

export class Lexer {
    private text: string;
    private pos: number = 0;
    private current_char: string | null = "";


    constructor(text: string) {
        this.text = text;
        this.current_char = text[this.pos]
    }

    private error(message: string): void {
        throw new ParsingError(message);
    }

    private step(steps: number = 1): void {
        this.pos += steps;
        if (this.pos > this.text.length - 1) {
            this.current_char = null; //EOF
        } else {
            this.current_char = this.text[this.pos];
        }
    }

    private peek(count: number): string | null {
        const idx = this.pos + count;

        if (idx > this.text.length - 1) {
            return null; //EOF
        } else {
            return this.text[idx];
        }
    }

    private match_string(str: string): boolean {
        for (let i = 0; i < str.length; i++) {
            const c = str.charAt(i);
            if (this.peek(i) !== c) {
                return false;
            }
        }
        return true;
    }

    private get_next_word(): string {
        this.skip_whitespace()
        let result = "";

        while (this.current_char.match("[^() ]") !== null) {
            result += this.current_char
            this.step()
        }
        return result
    }

    /**
     * Whitespace is taken to be:
     *     - space character
     *     - tab character
     *     - carriage return character
     *     - newline character
     *     - vertical tab character
     *     - form feed character
     * 
     * For only whitespace, the regex should be "/^ *$/"
     */
    private is_space(): boolean {
        return this.current_char.match("/^\s*$/") !== null
    }

    private skip_whitespace(): void {
        while (this.current_char === " " || this.current_char === "\n") {
            this.step()
        }
    }

    public get_next_token(): Token {

        if (this.current_char === null || this.current_char === undefined) {
            return new Token(TokenEnum.EOF)
        }

        this.skip_whitespace()

        if (this.current_char === "(") {
            this.step()
            return new Token(TokenEnum.LEFT_BRACE);
        }

        if (this.current_char === ")") {
            this.step()
            return new Token(TokenEnum.RIGHT_BRACE);
        }

        let word = this.get_next_word()

        switch (word) {
            case "and":
                return new Token(TokenEnum.AND_OPERATOR)
            case "or":
                return new Token(TokenEnum.OR_OPERATOR)
            case "sip":
                return new Token(TokenEnum.SRC_IP)
            case "dip":
                return new Token(TokenEnum.DST_IP)
            case "ip":
                return new Token(TokenEnum.IP)
            case "sport":
                return new Token(TokenEnum.SRC_PORT)
            case "dport":
                return new Token(TokenEnum.DST_PORT)
            case "port":
                return new Token(TokenEnum.PORT)
            case "proto":
                return new Token(TokenEnum.PROTO)
            case "ifc":
                return new Token(TokenEnum.IFC)
            case "cam":
                return new Token(TokenEnum.CAM)
            default:

                let number = parseInt(word, 10);
                if (!isNaN(number)) {
                    return new Token(TokenEnum.NUMBER, number)
                }

                this.error(`Unknown token "${word}"!`)
                break;
        }            
    }
}


