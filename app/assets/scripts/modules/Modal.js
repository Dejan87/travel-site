import $ from "jquery";

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }

    events() {
        // Clicking the open modal button
        // Bind - by default this will to the object/element that is clicked
        this.openModalButton.click(this.openModal.bind(this));

        // Clicking the x close modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        // Pushes any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e) {
        if(e.keyCode ==  27) { // 27 is escape key on keyboard
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass("modal--is-visible");
        return false; // Prevent the default behavior of scrolling up
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;