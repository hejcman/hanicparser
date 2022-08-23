export class Stack<T> {
    
    private array: T[] = [];
    
    pop(): T | null {
        if (this.isEmpty()) return null;
        return this.array.pop();
    }
    
    push(data: T): void {
        this.array.push(data);
    }
    
    peek(): T | null {    
        if (this.isEmpty()) return null;
        return this.array[this.array.length - 1];
        
    }
    
    isEmpty(): boolean {
        return this.array.length === 0;
    }
}