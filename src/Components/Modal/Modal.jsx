import {Component} from "react";
import {createPortal} from "react-dom";
import {Backdrop, BackdropModal} from "./Modal.styled";

const modalRoot = document.getElementById('modalRoot');

class Modal extends Component {

    componentDidMount = () => {
        window.addEventListener('keydown', this.closeModalByEsc)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModalByEsc)
    }

    closeModalByEsc = (e) => {
        if (e.code === 'Escape') {
            this.props.onToggleClick()
        }
    }

    onBackdropClick = (e) => {
        if(e.currentTarget === e.target) {
            this.props.onToggleClick()
        }
    }

    render() {
        const {onBackdropClick} = this
        const {top, left} = this.props.position
        return createPortal(<Backdrop onClick={onBackdropClick}>
            <BackdropModal top={top} left={left}>
                {this.props.children}
            </BackdropModal>
        </Backdrop>, modalRoot);
    }
}

export default Modal;