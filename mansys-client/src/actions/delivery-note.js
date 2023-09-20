import { DeliveryNoteService } from "../services/delivery-note-service";
import { showErrorMessage } from "../commons/utilities"

export const updateDeliveryNote = (deliveryNote) => async (dispatch) => {
    const result = await DeliveryNoteService.update(deliveryNote);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the delivery note!')
        return;
    }
    window.location.reload()
};

export const createDeliveryNote = (deliveryNote, navigate) => async (dispatch) => {
    const result = await DeliveryNoteService.create(deliveryNote);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the delivery note!')
        return;
    }
    const path = `/delivery_note/${result.data.data.id}`
    navigate(path);
};