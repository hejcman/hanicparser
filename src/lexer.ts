import internal = require("stream")
import { Token, TokenEnum } from "./tokens"
import { ParsingError } from "./error"
import { Address4, Address6 } from "ip-address"

export class Lexer {
	/** The string that should be converted to the token representation. */
	private text: string
	/** The current index in the string. */
	private pos: number
	/** The currently parsed character. */
	private current_char: string | null = ""

	constructor(text: string = null) {
		if (text !== null && text !== undefined) {
			this.init(text)
		}
	}

	public init(text: string) {
		this.text = text
		this.pos = 0
		if (text.length === 0) {
			this.current_char = ""
		} else {
			this.current_char = text[this.pos]
		}
	}

	/**
	 * Raise an error from the lexer.
	 * @param message The error message.
	 */
	private error(message: string): void {
		throw new ParsingError(message)
	}

	/**
	 * Move the pointer to the current character in the input string.
	 * @param steps The number of steps to move. Defaults to 1.
	 */
	private step(steps: number = 1): void {
		this.pos += steps
		if (this.pos > this.text.length - 1) {
			this.current_char = null //EOF
		} else {
			this.current_char = this.text[this.pos]
		}
	}

	/**
	 * Look at characters ahead of the current pointer without moving it.
	 * @param count The number of characters to look ahead.
	 * @returns The character at the desired index or null if EOF is reached.
	 */
	private peek(count: number): string | null {
		const idx = this.pos + count

		if (idx > this.text.length - 1) {
			return null //EOF
		} else {
			return this.text[idx]
		}
	}

	/**
	 * Get the next word in the string.
	 *
	 * A word is considered to be a list of characters delimited by braces or a space.
	 * @returns The next word.
	 */
	private get_next_word(): string {
		this.skip_whitespace()
		let result = ""

		while (
			this.current_char !== null &&
			this.current_char.match("[^() ]") !== null
		) {
			result += this.current_char
			this.step()
		}
		return result
	}

	/**
	 * Move the current pointer further until it doesn't point to a space character.
	 *
	 * A space character is taken to be space or newline.
	 */
	private skip_whitespace(): void {
		while (this.current_char === " " || this.current_char === "\n") {
			this.step()
		}
	}

	/**
	 * Get the next token from the string.
	 *
	 * If there are no more tokens to be generated from the string, return EOF token.
	 * @returns The next token.
	 */
	public get_next_token(): Token {
		// If there are no more tokens, return EOF.
		if (this.current_char === null || this.current_char === undefined) {
			return new Token(TokenEnum.EOF)
		}

		// Skip whitespace to get to the next character.
		this.skip_whitespace()

		if (this.current_char === "(") {
			this.step()
			return new Token(TokenEnum.LEFT_BRACE)
		}
		if (this.current_char === ")") {
			this.step()
			return new Token(TokenEnum.RIGHT_BRACE)
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
				let address = null
				let number = null

				try {
					address = new Address4(word)
					if (address.isCorrect()) {
						return new Token(TokenEnum.IP_ADDR, address.address)
					} else {
						throw new ParsingError(
							"The IPv4 address " + word + " is not valid!"
						)
					}
				} catch (e: any) {}

				try {
					address = new Address6(word)
					if (address.isCorrect()) {
						return new Token(TokenEnum.IP_ADDR, address.address)
					} else {
						throw new ParsingError(
							"The IPv6 address " + word + " is not valid!"
						)
					}
				} catch (e: any) {}

				number = parseInt(word, 10)
				if (!isNaN(number)) {
					return new Token(TokenEnum.NUMBER, number)
				}

				// FIXME: Add parsing for IP addresses.

				this.error(`Unknown token "${word}"!`)
				break
		}
	}
}
