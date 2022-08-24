export class ParsingError extends Error {
	constructor(...params: any[]) {
		super(...params)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ParsingError)
		}

		this.name = "ParsingError"
	}
}
