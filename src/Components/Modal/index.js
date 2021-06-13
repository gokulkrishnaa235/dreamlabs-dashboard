import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import closeIcon from "../../assets/close.svg";
import PropTypes from "prop-types";

const appElement = document.getElementById("root");

const Modal = ({ header, children, updateModalState }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOverlayClick = (event) => {
      if (!(modalRef.current && modalRef.current.contains(event.target))) {
        updateModalState();
        window.removeEventListener("click", handleOverlayClick);
      }
    };

    window.addEventListener("click", handleOverlayClick);

    return () => {
      appElement.removeAttribute("aria-hidden");
      window.removeEventListener("click", handleOverlayClick);
    };
  }, [updateModalState]);

  const onCloseHandler = () => {
    updateModalState();
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-wrapper" ref={modalRef}>
        <button className="modal-close" onClick={onCloseHandler}>
          <img src={closeIcon} alt="close" />
        </button>
        <div className="mode-header">
          <h2>{header}</h2>
        </div>
        <hr />
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button onClick={onCloseHandler}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  updateModalState: PropTypes.func,
  children: PropTypes.array,
};

export default Modal;
