export class Failure {
    constructor(
        readonly message: string,
        readonly code: number,
        readonly data?: any
    ){}

    toString(): string {
        return `Failure: ${this.message} ${this.code ? `(${this.code})` : ''}`;
    }
}