export class ApiError {
  // private properties
  #type: string;
  #title: string;
  #status: number;
  #errors: string[];

  constructor(rawError: any) {
    this.#type = rawError.type || '';
    this.#title = rawError.title || '';
    this.#status = rawError.status || 0;
    this.#errors = rawError.errors || [];
  }

  get type(): string {
    return this.#type;
  }

  get title(): string {
    return this.#title;
  }

  get status(): number {
    return this.#status;
  }

  getErrorCode(): string {
    return this.#errors[0];
  }

  getErrorsMessage(): string {
    return this.#errors[1];
  }
}
