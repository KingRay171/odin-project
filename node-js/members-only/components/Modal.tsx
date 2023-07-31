import React, { useRef } from "react";
import ReactDOM from "react-dom";
import {useSession} from 'next-auth/react'
import Router from "next/router";

const Modal = ({ onClose }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const titleRef = useRef()
    const contentRef = useRef()
    const {data, status} = useSession()

    const modalContent = (
        
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={async (e) => {
                            e.preventDefault()
                            console.log(titleRef)
                            const status = await fetch("/api/post", {method: "POST", body: JSON.stringify({
                                title: titleRef.current.value,
                                content: contentRef.current.value,
                                name: data.user?.username
                            })})
                            Router.reload()
                            onClose()
                        }}>
                            <input type="text" ref={titleRef} placeholder="Post Title"/>
                            <input type="text" ref={contentRef} placeholder="Post Content" />
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
            <style jsx>
                {`.modal-wrapper {
                  width: 500px;
                  height: 600px;
                }

                .modal {
                  background: white;
                  height:100%;
                  width:100%;
                  border-radius: 15px;
                  padding: 15px;
                }

                .modal-overlay {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: rgba(0, 0, 0, 0.5);
                }

                .modal-body {
                  padding-top: 10px;
                }

                .modal-header {
                  display: flex;
                  justify-content: flex-end;
                  font-size: 25px;
                }`}
            </style>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root") as Element
    );
};

export default Modal