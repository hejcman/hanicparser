const ERROR_NAME = "ParsingError"

export class ParsingError extends Error {
	private date: Date
	constructor(...params: any[]) {
		super(...params)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ParsingError)
		}

		this.name = ERROR_NAME
		this.date = new Date()
	}
}
