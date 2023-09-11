export default class Modal {
    constructor(params) {
        this._modal = document.getElementById(params.modalId)
        this._openBtn = document.getElementById(params.openBtnId);
        this._closeBtn = document.getElementById(params.closeBtnId);

        this.setEventListeners()
    }

    open() {
        this._modal.style.display = 'flex';
    }
    
    close() {
        this._modal.style.display = 'none';
    }

    setEventListeners() {
        this._closeBtn.addEventListener('click', this.close.bind(this));
        this._openBtn.addEventListener('click', this.open.bind(this));
        this._modal.addEventListener('click', (evt) => {
            if (evt.target == this.modal) {
                this.close();
            }
          }
        );
    }
}