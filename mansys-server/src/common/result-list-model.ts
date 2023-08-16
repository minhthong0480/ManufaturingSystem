export class ResultListModel<Array> {
  public isSuccess: boolean;
  public code: number;
  public subCode: number;
  public message: string;
  public data: Array;

  private static readonly const_code_success = 200;
  private static readonly const_code_fail = 400;
  private static readonly const_message_success = 'Success!';
  private static readonly const_message_fail = 'Fail!';

  public indicateSuccess() {
    return this.isSuccess == true;
  }

  public static success<Array>(
    value: Array,
    message: string,
  ): ResultListModel<Array> {
    const result = new ResultListModel<Array>();
    result.isSuccess = true;
    result.code = ResultListModel.const_code_success;
    result.data = value;
    result.message = this.const_message_success;
    return result;
  }

  public static fail<Array>(
    value: Array,
    message: string,
  ): ResultListModel<Array> {
    const result = new ResultListModel<Array>();
    result.isSuccess = false;
    result.code = ResultListModel.const_code_fail;
    result.data = value;
    result.message = this.const_message_fail;
    return result;
  }
}
