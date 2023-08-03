import React from "react";

export default function Modal(props){
    return (
        <div className="modal flex-container flex-center">
          <div className="modal-dialog flex-container flex-center">
            <header className="modal-dialog--header flex-container flex-center">
              <i className="material-icons md-48">exit_to_app</i>
              <h2 className="modal-dialog--title">End session ?</h2>
            </header>
            <div className="modal-dialog--content"> Would you like to end this session ?</div>
            <div className="modal-dialog--actions flex-container flex-center">
                <button className="modal-dialog--btn btn-transition" onClick={props.endSession}>Quit</button>
                <button className="modal-dialog--btn btn-transition" onClick={props.closeModal}>Cancel</button>
            </div>
          </div>
        </div>
    )
}