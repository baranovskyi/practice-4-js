
export default function renderDialog(el, dialogId) {
    el.innerHTML = `
        <div class="modal fade" id="${dialogId}" tabindex="-1" role="dialog" aria-labelledby="${dialogId}Label" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${dialogId}Label">Question</h5>
                    </div>
                    <div class="modal-body">
                        Do you agree?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger no" data-dismiss="modal">No</button>
                        <button type="button" class="btn btn-outline-success yes">Yes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert" role="alert" id="${dialogId}Alert">
            
        </div>`;
}
