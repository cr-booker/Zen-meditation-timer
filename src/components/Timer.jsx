import React from "react";

export default function Timer(props){
  return (
    <div id="timer" className="timer flex-container flex-center">
      <div className="timer-display flex-container">
        <span className="time">{props.time}</span>
      </div>
      <div className ="timer-controls flex-container">
        <button className="timer-controls--btn timer-home-btn btn-transition" type="button" onClick={props.showHome}>
          <i className="material-icons md-56">home</i>
        </button>
        <button className="timer-controls--btn timer-reset-btn btn-transition" type="button" onClick={props.resetTimer}>
          <i className="material-icons md-56">refresh </i>
        </button>
        <button className="timer-controls--btn timer-pause-btn btn-transition" type="button" onClick={props.isTimerRunning ? props.stopTimer : props.startTimer}>
          <i className="material-icons md-56">{props.isTimerRunning ? "pause" : "play_arrow"}</i>
        </button>
      </div>
    </div>
  )
}