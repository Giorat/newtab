import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import CalendarEvents from './CalendarEvents';

function App() {
  const [searchedText, SetSearchedText] = useState('');
  const [showSearch, SetShowSearch] = useState(false);
  const [whatCurrentThing, setCurrentThing] = useState('sleeping');
  const [currentDay, setDay] = useState(theCurrentDay);
  const [currentTime, setTime] = useState(theCurrentTime);
  const [currentWeek, setWeek] = useState(theCurrentWeek);

  useHotkeys('space', () => {
    SetShowSearch(true);
  });
  useHotkeys('g', () => {
    SetShowSearch(true);
  });
  useHotkeys('t', () =>
    window.location.replace('https://trello.com/b/T7tkIJb9/workroadto200')
  );
  useHotkeys('c', () =>
    window.location.replace('https://calendar.google.com/calendar/b/1/r/')
  );
  useHotkeys('r', () =>
    window.location.replace('https://remotedesktop.google.com/u/1/access')
  );
  useHotkeys('y', () => window.location.replace('https://www.youtube.com/'));
  useHotkeys('m', () =>
    window.location.replace('https://mail.google.com/mail/')
  );
  useHotkeys('w', () =>
    window.location.replace(
      'https://www.youtube.com/watch?v=7cVfVYuAK3I&list=PLKkHXmYMW_815TUbVc9bAvobzYUNb8gD8'
    )
  );

  const handleEsc = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      SetShowSearch(false);
    }
  };
  window.addEventListener('keydown', handleEsc);

  setInterval(() => setTime(theCurrentTime), 60 * 1000);

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function theCurrentTime(): string {
    const currentD = new Date();
    const currentT: string = currentD.toLocaleTimeString('en-GB');
    if (currentT === '00:00:01') {
      setDay(theCurrentDay);
      setWeek(theCurrentWeek);
    }
    const hour: number = currentD.getHours();
    // const minutes: number = currentD.getMinutes();

    if (hour >= 9 && hour < 13 && whatCurrentThing) {
      setCurrentThing('🛠 working 9to5 - Morning');
    }
    if (hour >= 13 && hour < 14 && whatCurrentThing) {
      setCurrentThing('having Lunch 🍝');
    }
    if (hour >= 14 && hour < 18 && whatCurrentThing) {
      setCurrentThing('🛠 working 9to5 - Afternoon');
    }
    return currentT.slice(0, -3);
  }

  function theCurrentDay(): string {
    const today: Date = new Date();
    const month = capitalize(
      today.toLocaleString('default', { month: 'long' })
    );
    const day = capitalize(
      today.toLocaleString('default', { weekday: 'long' })
    );
    return day + ' ' + today.getDate() + ', ' + month;
  }

  function theCurrentWeek(): string {
    // https://stackoverflow.com/a/6117889/9295292
    const today: Date = new Date();
    let d = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return (
      'Week ' +
      Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
    );
  }

  function submitSearch(event: React.FormEvent) {
    window.location.replace('https://duckduckgo.com/?q=' + searchedText);
    event.preventDefault();
  }

  let searchForm;
  if (showSearch)
    searchForm = (
      <form
        onSubmit={submitSearch}
        className="pt-2 relative mx-auto text-gray-600"
      >
        <input
          autoFocus
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e: { target: { value: any } }) =>
            SetSearchedText(e.target.value)
          }
          value={searchedText}
        />
      </form>
    );

  const currentBackground = require('./background.json').background;

  const calendarEventsComp: any = <CalendarEvents />;

  return (
    <div className="overflow-hidden w-screen h-screen">
      <div
        className="w-screen h-screen text-white bg-cover bg-black"
        style={{
          backgroundImage:
            'url(data:image/png;base64,' + currentBackground + ')',
        }}
      >
        <div className="container mx-auto">
          <div className="flex items-center h-screen">
            <div className="text-center self-center mx-auto">
              <p className="text-1xl opacity-50 leading-tight">{currentWeek}</p>
              <h1 className="text-7xl leading-tight">{currentTime}</h1>
              <h1 className=" text-4xl leading-tight">{currentDay}</h1>
              {/*<p className=" text-base leading-relaxed mt-8 font-semibold">
                Now you should be {capitalize(whatCurrentThing)}.
              </p>*/}
              {searchForm}
              {calendarEventsComp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
