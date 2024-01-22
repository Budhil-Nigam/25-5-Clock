import {useState,useEffect,useMemo} from "react";
import {FaArrowAltCircleUp,FaArrowAltCircleDown,FaPlay,FaPause} from "react-icons/fa"
import { IoReload } from "react-icons/io5";
const Timer=(props)=>{
  const [mode,setMode]=useState(0);
  const [session,setSession]=[props.sessiontime,props.sessionsetter];
  const [breaks,setBreak]=[props.breaktime,props.breaksetter];
  const timeperiods=[session,breaks];
  const [isactive,setActive]=[props.active,props.setter];
  const [time,setTime]=useState(timeperiods[0]);
  const timesUpdate=useMemo(()=>{setTime(timeperiods[mode]);},[session,breaks]);
  const handleStartStop=()=>{
    setActive(!isactive);
  }
  useEffect(()=>{
    if(time==0){
      document.getElementById("beep").play();
      document.getElementById("beep").loop=true;
      setMode((m)=>(m+1)%2);
      setTime(timeperiods[(mode+1)%2]);
      setActive(true);
    }
  },[time]);
  useEffect(()=>{
    let interval=null;
    if(isactive){
      interval=setInterval(()=>{
        setTime((t)=>{
          if(t-1>=0){
            return t-1;
          }
        })
      },1000);
    }
    else {
      timesUpdate;
      clearInterval(interval);
    }
    return ()=>{
      clearInterval(interval);
    }
    },[isactive]);
  const Reset=()=>{
    if(!document.getElementById("beep").paused){
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime=0;
    }
    setActive(false);
    setBreak(5);
    setSession(25);
    setMode(0);
    setTime(timeperiods[0]);
  }
  return (
  <div className="relative flex w-full h-full justify-center align-middle">
  <div className={"absolute w-1/2 h-1/5 flex flex-col justify-center place-items-center top-1 transition-all transform duration-500 ease-out " + (isactive?" translate-y-4":"translate-y-2")}>
        <div className="bg-gray-600 w-24 h-1/2 rounded-lg border-solid border-b-2 border-black"></div>
        <div className="bg-gray-600 w-12 h-1/2"></div>
  </div>
  <div id="stopwatch" className="bg-gray-200 h-3/5 rounded-full flex flex-col justify-center mx-auto my-auto ring-gray-700 ring-8 border-solid border-8 border-gray-700 overflow-hidden z-0 shadow-inner">
      <p id="timer-label" className="text-center font-medium text-2xl text-gray-600">{mode==0?"Session":"Break"}</p>
      <div id="time-left" className={"flex border bg-white-500 justify-center text-center text-5xl font-medium "+(time<60?"text-red-500":"")}>
      {("0" + Math.floor(time/60)).slice(-2)}:
      {("0" + time%60).slice(-2)}
      <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
      <section className="flex justify-center mt-4 space-x-4 text-xl">
      <button id="start_stop" onClick={()=>handleStartStop()} className="text-gray-800" >{isactive?<FaPause/>:<FaPlay/>}</button>
      <button id="reset" className="text-gray-800" onClick={()=>Reset()}><IoReload/></button>
      </section>
</div>
</div>
  );
}

const Break=(props)=>{
  const [breaktime,setBreak]=[props.breaktime,props.breaksetter];
  const increase=()=>{
    setBreak(b=>{
      if(b+1<=60){
        return b+1;
      } else {
        return b;
      }
    });
  }
  const decrease=()=>{
    setBreak(b=>{
      if(b-1>0){
        return b-1;
      } else {
        return b;
      }
    });
  }
  return (
  <div className="bg-blue-300 w-1/2 flex flex-col justify-center text-center text-xl">
    <p id="break-label">Break Length</p>
    <section className="flex flex-row justify-center">
    <span id="break-increment" onClick={()=>props.active?null:increase()} className="cursor-pointer"><FaArrowAltCircleUp className="relative top-0.25 h-full mr-2 text-white"/></span>
    <span id="break-length">{breaktime}</span>
    <span id="break-decrement" onClick={()=>props.active?null:decrease()} className="cursor-pointer"><FaArrowAltCircleDown className="relative top-0.25 h-full ml-2 text-white"/></span>
    </section>
  </div>
  );
}

const Session=(props)=>{
  const [sessiontime,setSession]=[props.sessiontime,props.sessionsetter];
  const increase=()=>{
    setSession(b=>{
      if(b+1<=60){
        return b+1;
      } else {
        return b;
      }
    });
  }
  const decrease=()=>{
    setSession(b=>{
      if(b-1>0){
        return b-1;
      } else {
        return b;
      }
    });
  }
  return (
  <div className="bg-blue-400 w-1/2 flex flex-col justify-center text-xl">
    <p id="session-label" className="flex justify-center">Session Length</p>
    <section className="flex justify-center">
    <span id="session-increment" onClick={()=>props.active?null:increase()} className="cursor-pointer"><FaArrowAltCircleUp className="relative top-0.25 h-full text-white mr-2"/></span>
    <span id="session-length">{sessiontime}</span>
    <span id="session-decrement" onClick={()=>props.active?null:decrease()} className="cursor-pointer"><FaArrowAltCircleDown className="relative top-0.25 h-full text-white ml-2"/></span>
    </section>
  </div>
  );
}

function Clock(){
  const [isactive,setActive]=useState(false);
  const [breaktime,setBreak]=useState(5);
  const [sessiontime,setSession]=useState(25);
  return (
  <>
  <div className="flex flex-row h-1/5">
    <Break active={isactive} breaktime={breaktime} breaksetter={setBreak}/>
    <Session active={isactive} sessiontime={sessiontime} sessionsetter={setSession}/>
  </div>
  <Timer active={isactive} setter={setActive} breaktime={breaktime} sessiontime={sessiontime} breaksetter={setBreak} sessionsetter={setSession}/>
  </>);
}
export default Clock;