import React from "react";

export default function Home(props){
  const greeting = (function(){
    switch(props.getTimeOfDay()){
      case 1:
        return {
          icon: 'wb_twilight',
          greeting: 'Good Morning',
          message: 'Hope your day is as wonderful as you are.',
        };      
      case 2:
        return {
          icon: 'sunny',
          greeting: 'Good Afternoon',
          message: "Don't let anything dull your shine",
        };
      case 3:
        return {
          icon: 'bedtime',
          greeting: 'Good Evening',
          message: 'Remember, every sunset promises a new dawn.',
        };
    }
  })()
  return (
    <div className="home">
      <div className="greeting">
          <i className={"greeting-icon material-icons md-56"}>{greeting.icon}</i>
          <h1>{greeting.greeting}</h1>
          <p className="home--text">{greeting.message}</p>
      </div>
        <div className="settings flex-container flex-center">
            <label htmlFor="timer-length-input" className="settings--label flex-container home--text"> 
              Length:   
              <span className="settings--timer-value home--text">
                {props.rangeValue === "60" ? "1 " : props.rangeValue}
              </span>
              <span className="settings--timer-abbr home--text">
                {props.rangeValue === "60" ? "Hour" : props.rangeValue === "1" ? "Min" : "Mins"}
              </span>
            </label>
            <input id="settings--timer-length" type="range" min="1" max="60" value={props.rangeValue} step="1" autoComplete="off" onChange={props.handleChange}>
            </input>
            <label className="settings--label" htmlFor="">Starting Chime</label>
            <div className="settings--chime-select flex-container">
              <button id="start-b1" className={`chime-select-btn ${props.activeBellBtns.startBell === "start-b1" ? "active" :""}`} type="button" onClick={props.toggleBells} data-sfx="bell-1">Bell 1</button>
              <button id="start-b2" className={`chime-select-btn ${props.activeBellBtns.startBell == "start-b2" ? "active" :""}`} type="button" onClick={props.toggleBells} data-sfx="bell-2">Bell 2</button>
              <button id="start-b3" className={`chime-select-btn ${props.activeBellBtns.startBell == "start-b3" ? "active" :""}`} type="button" onClick={props.toggleBells} data-sfx="bell-3">Bell 3</button>
            </div>
            <label className="settings--label" htmlFor="">Ending Chime</label>
            <div className="settings--chime-select flex-container">
              <button id="end-b1" className={`chime-select-btn ${props.activeBellBtns.endBell === "end-b1" ? "active" :""}`} type="button" onClick={props.toggleBells} data-sfx="bell-1">Bell 1</button>
              <button id="end-b2" className={`chime-select-btn ${props.activeBellBtns.endBell === "end-b2" ? "active" :""}`} type="button" onClick={props.toggleBells} data-sfx="bell-2">Bell 2</button>
              <button id="end-b3" className={`chime-select-btn ${props.activeBellBtns.endBell === "end-b3" ? "active" :""}`} type="button" onClick={props.toggleBells} data-sfx="bell-3">Bell 3</button>
            </div>
            <button className="settings--start-btn btn-transition flex-container" type="button" onClick={props.launchTimer}>
              <span className="home--text">Lets Begin</span>
              <i className="material-icons">play_arrow</i>
            </button>
        </div>
        
    </div>
  )
}