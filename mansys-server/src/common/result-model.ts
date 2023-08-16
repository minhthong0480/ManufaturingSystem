export class ResultModel<T>{
    public isSuccess: boolean;
    public code : number;
    public subCode: number;
    public message: string;
    public data : T;
 
    private static readonly const_code_success = 200;
    private static readonly const_code_fail = 400;
    private static readonly const_message_success = "Success!";
    private static readonly const_message_fail = "Fail!";

    public indicateSuccess(){
      return this.isSuccess == true;
    }

    public static success<R>(value: R, message: string) : ResultModel<R> {
       const result = new ResultModel<R>()
       result.isSuccess = true;
       result.code = ResultModel.const_code_success;
       result.data = value;
       result.message = this.const_message_success;
       return result;
    }

    public static fail<R>(value: R, message: string) : ResultModel<R> {
        const result = new ResultModel<R>()
        result.isSuccess = false;
        result.code = ResultModel.const_code_fail;
        result.data = value;
        result.message = this.const_message_fail;
        return result;
     }

}