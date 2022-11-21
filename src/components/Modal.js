import React from 'react'
import ReactDOM from 'react-dom'

// styles
import './Modal.css'
import close from '../assets/close.svg'

export default function Modal({ children, handleClose }) {
    
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal" >
                <div className="close-btn">
                    <img src={close} 
                    alt="close"
                    style={{cursor: 'pointer'}}
                    onClick={handleClose}
                    />
                </div>
                {children}
            </div>
        </div>
    ), document.body)
}

