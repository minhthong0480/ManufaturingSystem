import { ProductsService } from "../services/products-service";

export const getAllProducts = (payload) => async () => {
    const result = await ProductsService.getAll();
    const { onSuccess = () => { } } = payload;
    if (result.status !== 200) {
        return onSuccess();
    }
    return onSuccess(result);
}
export const createProducts = (payload) => async () => {
    const result = await ProductsService.createProducts(payload);
    const { onSuccess = () => { } } = payload;
    if (result.status !== 200) {
        return onSuccess(result.data);
    }
    return onSuccess(result.data);
}
export const updateProduct = (payload) => async () => {
    const result = await ProductsService.update(payload);
    const { onSuccess = () => { } } = payload;
    if (result.status !== 200) {
        return onSuccess(result.data);
    }
    return onSuccess(result.data);
}