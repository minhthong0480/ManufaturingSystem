"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModel = void 0;
class ResultModel {
    indicateSuccess() {
        return this.isSuccess == true;
    }
    static success(value, message) {
        const result = new ResultModel();
        result.isSuccess = true;
        result.code = ResultModel.const_code_success;
        result.data = value;
        result.message = !message ? this.const_message_success : message;
        return result;
    }
    static fail(value, message) {
        const result = new ResultModel();
        result.isSuccess = false;
        result.code = ResultModel.const_code_fail;
        result.data = value;
        result.message = !message ? this.const_message_fail : message;
        return result;
    }
}
exports.ResultModel = ResultModel;
ResultModel.const_code_success = 200;
ResultModel.const_code_fail = 400;
ResultModel.const_message_success = "Success!";
ResultModel.const_message_fail = "Fail!";
//# sourceMappingURL=result-model.js.map