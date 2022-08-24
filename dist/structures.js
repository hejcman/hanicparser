"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.array = [];
    }
    pop() {
        if (this.isEmpty())
            return null;
        return this.array.pop();
    }
    push(data) {
        this.array.push(data);
    }
    peek() {
        if (this.isEmpty())
            return null;
        return this.array[this.array.length - 1];
    }
    isEmpty() {
        return this.array.length === 0;
    }
}
exports.Stack = Stack;
