import React from 'react'
import Home from "./Home"
import Timer from "./Timer"
import Modal from './Modal';
import '../css/styles.css';
import morningBg from "../assets/morning.jpg"
import afternoonBg from "../assets/afternoon.jpg"
import eveningBg from "../assets/evening.jpg"
import bellSfx1 from "../assets/bell1.mp3"
import bellSfx2 from "../assets/bell2.mp3"
import bellSfx3 from "../assets/bell3.mp3"

export default function App(){
  const [rangeValue, setRangeValue] = React.useState(10)
  const [showTimer, setShowTimer] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false)
  const [time, setTime] = React.useState("")
  const [isTimerRunning, setIsTimerRunning] = React.useState(false)
  const [activeBellBtns, setActiveBellBtns] = React.useState({startBell:"start-b1", endBell:"end-b1"})
  

  const bells = React.useMemo(() => ({
    ["bell-1"]:new Audio(bellSfx1), 
    ["bell-2"]:new Audio(bellSfx2), 
    ["bell-3"]:new Audio(bellSfx3), 
  }),[])

  const selectedBells = React.useRef({
    startBell: bells['bell-1'],
    endBell: bells['bell-1']
  })

  const timerData = React.useRef({
    timeoutId: null,
    startTime: null,
    timeRemaining : null,
    timePassed: 0,
    lastTime: null,
    running: false,
  })

  function getTimeOfDay(){
    // 1 = Morning, 2 = Afternoon, 3 = Evening
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour <= 11) {
      return 1;
    }
    if (currentHour >= 12 && currentHour <= 17) {
      return 2;
    }
    return 3;
  }

  function setBackground(){
    switch(getTimeOfDay()){
      case 1:
        return morningBg
      case 2:
        return afternoonBg
      case 3:
        return eveningBg
    }
  }

  function showHome(id){
    if(isTimerRunning){
      stopTimer(id);
      setShowModal(true)
    }else{
      resetTimer(id);
      setShowTimer(false)
    }
  }

  function launchTimer(){
    const startTime = rangeValue * 60;
    setShowTimer(true)
    setTime(formatTime(startTime))
    timerData.current.startTime = startTime 
    timerData.current.timeRemaining = startTime
    startTimer()
  }

  function startTimer(){
    if (timerData.current.timeRemaining === 0) {
      return;
    }
    if (! timerData.current.timeoutId){
      selectedBells.current.startBell.play()
    }
    timerData.current.timeoutId = setTimeout(countdownLoop, 0);
    setIsTimerRunning(true);
    timerData.current.lastTime = Date.now();
  }

  function stopTimer(id){
    clearInterval(id);
    setIsTimerRunning(false)
  }

  function resetTimer(id) {
    stopTimer(id);
    stopBells();
    setTime(formatTime(timerData.current.startTime));
    timerData.current.timeoutId = null
    timerData.current.timeRemaining = null;
    timerData.current.timeoutId = null;
    timerData.lastTime = null;
    timerData.current.timePassed = 0;
  }

  function stopBells(){
    Object.values(selectedBells.current).forEach(audio => {
      audio.pause()
      audio.currentTime = 0;
    })
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  function calculateTime() {
    timerData.current.timePassed += 1;
    timerData.current.timeRemaining = timerData.current.startTime  - timerData.current.timePassed;
    return formatTime(timerData.current.timeRemaining);
  }

  function countdownLoop() {
    const thisTime = Date.now();
    const deltaTime = thisTime - timerData.current.lastTime;
    const delay = Math.max(1000 - deltaTime, 0);

    timerData.current.timeoutId = setTimeout(countdownLoop, delay);
    timerData.current.lastTime = thisTime + delay;

    setTime(calculateTime());
    if (timerData.current.timeRemaining === 0) {
      stopTimer(timerData.current.timeoutId);
      selectedBells.current.endBell.play()
    }
  }

  function handleRangeChange(event){
    setRangeValue(event.target.value)
  }

  function toggleBells(event){
    const buttonId = event.target.id;
    const bellName = event.target.dataset.sfx;
    if(buttonId.startsWith("start")){
      setActiveBellBtns(prevState => (
        {...prevState, ["startBell"]:buttonId}
      ))
      selectedBells.current.startBell = bells[bellName]
    }else{
      setActiveBellBtns(prevState => (
        {...prevState, ["endBell"]:buttonId}
      ))
      selectedBells.current.endBell = bells[bellName]
    }
  }

  const style={ backgroundImage:`url(${setBackground()})`}
  return (
    <main id='app' className='flex-container flex-center' style={style}>
      {!showTimer && 
        <Home 
          launchTimer={() => launchTimer()}
          handleChange={(event) => handleRangeChange(event)}
          getTimeOfDay={getTimeOfDay}
          value={rangeValue}
          rangeValue={rangeValue}
          toggleBells={(event) => toggleBells(event) }
          activeBellBtns={activeBellBtns}
        />}
      {showTimer && 
        <Timer 
          time={time}
          showHome={() => showHome(timerData.current.timeoutId)}
          startTimer={() => startTimer()}
          stopTimer={()=> stopTimer(timerData.current.timeoutId)}
          resetTimer={() => resetTimer(timerData.current.timeoutId)}
          isTimerRunning={isTimerRunning}
        />}
        {showModal && <Modal 
          show={showModal}
          endSession={() => {setShowModal(false); showHome(timerData.current.timeoutId);}}
          closeModal={() => {setShowModal(false); startTimer();}}
        />}
    </main>
  )
}