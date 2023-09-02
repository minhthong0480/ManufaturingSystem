import { CategoryService } from "../services/category-service";
export const getAllCategory = (payload) => async () => {
    const result = await CategoryService.getAll();
    const { onSuccess = () => { } } = payload;
    if (result.status !== 200) {
        return onSuccess();
    }
    return onSuccess(result);
}