export class ResultListModel<T> {
  public isSuccess: boolean;
  public code: number;
  public subCode: number;
  public message: string;
  public data: Array<T>;
  public totalRows: number;

  private static readonly const_code_success = 200;
  private static readonly const_code_fail = 400;
  private static readonly const_message_success = 'Success!';
  private static readonly const_message_fail = 'Fail!';

  public indicateSuccess() {
    return this.isSuccess == true;
  }

  public static success<T>(
    value: Array<T>,
    totalRows : number,
    message: string,
  ): ResultListModel<T> {
    const result = new ResultListModel<T>();
    result.isSuccess = true;
    result.code = ResultListModel.const_code_success;
    result.data = value;
    result.totalRows = totalRows;
    result.message = !message ? this.const_message_success : message;
    return result;
  }

  public static fail<T>(
    value: Array<T>,
    message: string,
  ): ResultListModel<T> {
    const result = new ResultListModel<T>();
    result.isSuccess = false;
    result.code = ResultListModel.const_code_fail;
    result.data = value;
    result.totalRows = 0;
    result.message = !message ? this.const_message_fail : message;
    return result;
  }
}
