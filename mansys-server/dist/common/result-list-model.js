"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultListModel = void 0;
class ResultListModel {
    indicateSuccess() {
        return this.isSuccess == true;
    }
    static success(value, totalRows, message) {
        const result = new ResultListModel();
        result.isSuccess = true;
        result.code = ResultListModel.const_code_success;
        result.data = value;
        result.totalRows = totalRows;
        result.message = !message ? this.const_message_success : message;
        return result;
    }
    static fail(value, message) {
        const result = new ResultListModel();
        result.isSuccess = false;
        result.code = ResultListModel.const_code_fail;
        result.data = value;
        result.totalRows = 0;
        result.message = !message ? this.const_message_fail : message;
        return result;
    }
}
exports.ResultListModel = ResultListModel;
ResultListModel.const_code_success = 200;
ResultListModel.const_code_fail = 400;
ResultListModel.const_message_success = 'Success!';
ResultListModel.const_message_fail = 'Fail!';
//# sourceMappingURL=result-list-model.js.map