import { ParsingError } from "./error"
import { Lexer } from "./lexer"
import { Stack } from "./structures"
import { Token, TokenEnum } from "./tokens"

export class HanicParser {
	/** expr_loaded stores true whether an expression came before. */
	private expr_loaded: boolean
	private brace_stack = new Stack()
	private lexer = new Lexer()

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
		if (next.value < 0 || 255 < next.value) {
			throw new ParsingError(
				"Protocol identifier must be in range <0, 255>!"
			)
		}
	}

	private parsePort(): void {
		let next = this.lexer.get_next_token()
		if (!next.isNumber()) {
			throw new ParsingError("Port must be followed by a number!")
		}
		if (next.value < 0 || 65535 < next.value) {
			throw new ParsingError("Port number must be in range <0, 65535>!")
		}
	}

	private parseIp(): void {
		let next = this.lexer.get_next_token()
		if (!next.isIpAddress()) {
			throw new ParsingError(
				"Address specifier must be followed by an IP address!"
			)
		}
	}

	public parse(input: string): boolean {
		/** Prepare the lexer and inner state for parsing. */
		this.lexer.init(input)
		this.expr_loaded = false

		/** Get the first token. If it is empty, return true, as that is a valid filter. */
		let token = this.lexer.get_next_token()

		/** While we are not at the end of the filter, keep going. */
		while (token.type !== TokenEnum.EOF) {
			switch (token.type) {
				/** Left braces and right braces must be equal in number, use a stack to store them. */
				// TODO: Perhaps a simple counter would be enough?
				case TokenEnum.LEFT_BRACE:
					this.parseLeftBrace()
					break
				case TokenEnum.RIGHT_BRACE:
					this.parseRightBrace()
					break
				case TokenEnum.PROTO:
					if (this.expr_loaded)
						throw new ParsingError(
							"You must include an and/or operator between rules!"
						)
					this.parseProto()
					this.expr_loaded = true
					break
				case TokenEnum.SRC_PORT:
				case TokenEnum.DST_PORT:
				case TokenEnum.PORT:
					if (this.expr_loaded)
						throw new ParsingError(
							"You must include an and/or operator between rules!"
						)
					this.parsePort()
					this.expr_loaded = true
					break
				case TokenEnum.SRC_IP:
				case TokenEnum.DST_IP:
				case TokenEnum.IP:
					if (this.expr_loaded)
						throw new ParsingError(
							"You must include an and/or operator between rules!"
						)
					this.parseIp()
					this.expr_loaded = true
					break
				case TokenEnum.OR_OPERATOR:
				case TokenEnum.AND_OPERATOR:
					if (!this.expr_loaded)
						throw new ParsingError(
							"The and/or operators must be places between two expressions!"
						)
					this.expr_loaded = false
					break
			}
			token = this.lexer.get_next_token()
		}
		return true
	}
}
