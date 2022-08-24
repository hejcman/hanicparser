import { Token } from "./tokens";
export declare class Lexer {
    /** The string that should be converted to the token representation. */
    private text;
    /** The current index in the string. */
    private pos;
    /** The currently parsed character. */
    private current_char;
    constructor(text?: string);
    init(text: string): void;
    /**
     * Raise an error from the lexer.
     * @param message The error message.
     */
    private error;
    /**
     * Move the pointer to the current character in the input string.
     * @param steps The number of steps to move. Defaults to 1.
     */
    private step;
    /**
     * Look at characters ahead of the current pointer without moving it.
     * @param count The number of characters to look ahead.
     * @returns The character at the desired index or null if EOF is reached.
     */
    private peek;
    /**
     * Get the next word in the string.
     *
     * A word is considered to be a list of characters delimited by braces or a space.
     * @returns The next word.
     */
    private get_next_word;
    /**
     * Move the current pointer further until it doesn't point to a space character.
     *
     * A space character is taken to be space or newline.
     */
    private skip_whitespace;
    /**
     * Get the next token from the string.
     *
     * If there are no more tokens to be generated from the string, return EOF token.
     * @returns The next token.
     */
    get_next_token(): Token;
}
