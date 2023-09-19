import { ReceivingNoteService } from "../services/receiving-note-service";
import { showErrorMessage } from "../commons/utilities"

export const updateReceivingNote = (receivingNote) => async (dispatch) => {
    const result = await ReceivingNoteService.update(receivingNote);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the receiving note!')
        return;
    }
    window.location.reload()
};

export const createReceivingNote = (receivingNote, navigate) => async (dispatch) => {
    const result = await ReceivingNoteService.create(receivingNote);
    if (result.code >= 400) {
        showErrorMessage(result.message || 'An error is occurred while updating the receiving note!')
        return;
    }
    const path = `/receiving_note/${result.data.data.id}`
    navigate(path);
};