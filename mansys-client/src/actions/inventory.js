import { InventoryService } from "../services/inventory-service";
import { showErrorMessage } from "../commons/utilities"

export const updateInventory = (iventory) => async (dispatch) => {
    const result = await InventoryService.update(iventory);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the inventory!')
        return;
    }
    window.location.reload()
};

export const createInventory = (iventory, navigate) => async (dispatch) => {
    const result = await InventoryService.create(iventory);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the inventory!')
        return;
    }
    const path = `/inventory_edit/${result.data.data.id}`
    navigate(path);
};