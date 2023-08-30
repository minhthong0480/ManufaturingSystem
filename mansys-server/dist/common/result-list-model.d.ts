export declare class ResultListModel<T> {
    isSuccess: boolean;
    code: number;
    subCode: number;
    message: string;
    data: Array<T>;
    totalRows: number;
    private static readonly const_code_success;
    private static readonly const_code_fail;
    private static readonly const_message_success;
    private static readonly const_message_fail;
    indicateSuccess(): boolean;
    static success<T>(value: Array<T>, totalRows: number, message: string): ResultListModel<T>;
    static fail<T>(value: Array<T>, message: string): ResultListModel<T>;
}
