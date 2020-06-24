import React, { useState } from "react";

function App() {
  const [whatCurrentThing, setCurrentThing] = useState("sleeping")
  const [currentDay, setDay] = useState(theCurrentDay)
  const [currentTime, setTime] = useState(theCurrentTime)

  setInterval(() => setTime(theCurrentTime), 1000);

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function theCurrentTime(): string {
    const currentD = new Date();
    const currentT : string = currentD.toLocaleTimeString()
    if (currentT === "00:00:01") {
      setDay(theCurrentDay)
    }
    const hour : number = currentD.getHours()
    const minutes : number = currentD.getMinutes()
    if(hour >= 9 && hour < 13 && whatCurrentThing){
      setCurrentThing("working 9to5 - Morning")
    }
    if(hour >= 13 && hour < 14 && whatCurrentThing){
      setCurrentThing("Lunch")
    }
    if(hour >= 14 && hour < 18 && whatCurrentThing){
      setCurrentThing("working 9to5 - Afternoon")
    }
    return currentT
  }

  function theCurrentDay(): string {
    const today: Date = new Date();
    const month = capitalize(today.toLocaleString('default', { month: 'long' }));
    const day = capitalize(today.toLocaleString('default', { weekday: 'long' }));
    return day + " " + today.getDate() + ', ' + month
  }

  const currentBackground = "/img/dark.webp"
  return (
    <div className="overflow-hidden w-screen h-screen">
      <div className="w-screen h-screen text-white bg-cover" style={{ backgroundImage: 'url('+currentBackground+')' }}>
          <div className="container mx-auto">
            <div className="flex items-center h-screen">
              <div className="text-center self-center mx-auto">
                <h1 className="text-7xl leading-tight text-shadow">
                  {currentTime}
                </h1>
                <h1 className=" text-4xl leading-tight text-shadow">
                  {currentDay}
                </h1>
                <p className=" text-base leading-relaxed mt-8 font-semibold text-shadow">
                  Now you should be {capitalize(whatCurrentThing)}.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
