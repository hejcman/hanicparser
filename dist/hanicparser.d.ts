export declare class HanicParser {
    /** expr_loaded stores true whether an expression came before. */
    private expr_loaded;
    private brace_stack;
    private lexer;
    private parseLeftBrace;
    private parseRightBrace;
    private parseProto;
    private parsePort;
    private parseIp;
    parse(input: string): boolean;
}
