import { ProductsService } from "../services/products-service";

export const getAllProducts = (payload) => async () => {
    const result = await ProductsService.getAll();
    const { onSuccess = () => { } } = payload;
    if (result.status !== 200) {
        return onSuccess();
    }
    return onSuccess(result);
}