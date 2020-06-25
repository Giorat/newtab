import React, { useState } from "react";
import { useHotkeys } from 'react-hotkeys-hook';

function App() {
  const [searchedText, SetSearchedText] = useState("")
  const [showSearch, SetShowSearch] = useState(false)
  useHotkeys('space', () => { SetShowSearch(true); });
  useHotkeys('g', () => { SetShowSearch(true); });
  useHotkeys('t', () => window.location.replace('https://trello.com/b/T7tkIJb9/workroadto200'));
  useHotkeys('c', () => window.location.replace('https://calendar.google.com/calendar/b/1/r/'));
  useHotkeys('r', () => window.location.replace('https://remotedesktop.google.com/u/1/access'));
  useHotkeys('y', () => window.location.replace('https://www.youtube.com/'));
  useHotkeys('m', () => window.location.replace('https://mail.google.com/mail/'));

  const handleEsc = (event : KeyboardEvent) => {
    if (event.keyCode === 27) {
      SetShowSearch(false);
   }
 };
 window.addEventListener('keydown', handleEsc);

  const [whatCurrentThing, setCurrentThing] = useState("sleeping")
  const [currentDay, setDay] = useState(theCurrentDay)
  const [currentTime, setTime] = useState(theCurrentTime)

  setInterval(() => setTime(theCurrentTime), 1000);

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function theCurrentTime(): string {
    const currentD = new Date();
    const currentT: string = currentD.toLocaleTimeString()
    if (currentT === "00:00:01") {
      setDay(theCurrentDay)
    }
    const hour: number = currentD.getHours()
    // const minutes : number = currentD.getMinutes()
    if (hour >= 9 && hour < 13 && whatCurrentThing) {
      setCurrentThing("working 9to5 - Morning")
    }
    if (hour >= 13 && hour < 14 && whatCurrentThing) {
      setCurrentThing("Lunch")
    }
    if (hour >= 14 && hour < 18 && whatCurrentThing) {
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

  function submitSearchGoogle(event: React.FormEvent) {
    window.location.replace('https://www.google.com/search?q=' + searchedText);
    event.preventDefault();
  }

  let searchForm;
  if (showSearch)
    searchForm = (<form onSubmit={submitSearchGoogle} className="pt-2 relative mx-auto text-gray-600">
      <input autoFocus className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="text" name="search" placeholder="Search" onChange={(e) => SetSearchedText(e.target.value)} value={searchedText} />
      <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
        <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
          viewBox="0 0 56.966 56.966" xmlSpace="preserve"
          width="512px" height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </form>)

  const currentBackground = require("./background.json").background
 
  return (
    <div className="overflow-hidden w-screen h-screen">
      <div className="w-screen h-screen text-white bg-cover" style={{ backgroundImage: 'url(data:image/png;base64,' + currentBackground + ')' }}>
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
              {searchForm}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
