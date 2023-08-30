export declare class ResultModel<T> {
    isSuccess: boolean;
    code: number;
    subCode: number;
    message: string;
    data: T;
    private static readonly const_code_success;
    private static readonly const_code_fail;
    private static readonly const_message_success;
    private static readonly const_message_fail;
    indicateSuccess(): boolean;
    static success<R>(value: R, message: string): ResultModel<R>;
    static fail<R>(value: R, message: string): ResultModel<R>;
}
