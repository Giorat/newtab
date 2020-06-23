import React, { Fragment, useState } from "react";

function App() {
  const [currentDay, setDay] = useState(theCurrentDay)
  const [currentTime, setTime] = useState(theCurrentTime)
  setInterval(() => setTime(theCurrentTime), 1000);

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function theCurrentTime(): string {
    const currentT = new Date().toLocaleTimeString()
    if (currentT === "00:00:01") {
      setDay(theCurrentDay)
    }
    return currentT
  }

  function theCurrentDay(): string {
    const today: Date = new Date();
    const month = capitalize(today.toLocaleString('default', { month: 'long' }));
    const day = capitalize(today.toLocaleString('default', { weekday: 'long' }));
    return day + " " + today.getDate() + ' ' + month
  }

  return (
    <Fragment>
      <div className="bg-gray-100 py-16 w-screen h-screen text-white" style={{ background: 'url(https://images.unsplash.com/photo-1545768076-c58b243b8f3e?ixlib=rb-1.2.1&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&ixid=eyJhcHBfaWQiOjcwOTV9)' }}>
        <div className="bg-black opacity-50 fixed w-screen h-screen top-0 left-0 z-0"></div>
        <div className="fixed w-screen h-screen top-0 left-0 z-10 py-16">
          <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="col-span-6">
                <h1 className="text-6xl max-w-xl  leading-tight">
                  {currentTime}
                </h1>
                <h1 className=" text-3xl max-w-xl leading-tight">
                  {currentDay}
                </h1>
                <p className=" text-base leading-relaxed mt-8 font-semibold">

                </p>
              </div>

              <div className="col-span-6">
                <h1 className=" text-3xl max-w-xl leading-tight">
                  right column
              </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
