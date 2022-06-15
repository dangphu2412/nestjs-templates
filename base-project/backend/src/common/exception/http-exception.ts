export class HttpException extends Error {
  constructor(private readonly status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
