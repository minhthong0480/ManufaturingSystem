import { AxiosClient } from "../commons/axios-client";
import { API_PRODUCTS, API_PRODUCTS_CREATE, API_BILL_PRODUCT } from "../commons/enum";
import { requestSucess, requestFail } from "../commons/utilities";

export const ProductsService = {
  getAll: async function () {
    const filterResult = await AxiosClient.get(API_PRODUCTS, {});
    if (!filterResult) return requestFail();
    return filterResult;
  },

  createProducts: async function (payload) {
    const filterResult = await AxiosClient.post(API_PRODUCTS_CREATE, payload);
    return filterResult;
  },

  update: async function (product) {
    const api = `${API_PRODUCTS}/${product.id}`;
    const result = await AxiosClient.patch(api, product);
    if (result.status >= 400 || !result.data.isSuccess)
      return requestFail(result.message);
    return requestSucess({
      data: result.data.data,
    });
  },

  getProductBill: async function (productId) {
    const api = `${API_BILL_PRODUCT}/${productId}`;
    const result = await AxiosClient.get(api);
    if (result.status >= 400 || !result.data.isSuccess)
      return requestFail(result.message);
    return requestSucess({
      data: result.data.data,
    });
  }
};
