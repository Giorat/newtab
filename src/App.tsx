import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import CalendarEvents from './CalendarEvents';

function App() {
  const [searchedText, SetSearchedText] = useState('');
  const [showSearch, SetShowSearch] = useState(false);
  const [whatCurrentThing, setCurrentThing] = useState('sleeping');
  const [currentDay, setDay] = useState(theCurrentDay);
  const [currentTime, setTime] = useState(theCurrentTime);

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

  function submitSearchGoogle(event: React.FormEvent) {
    window.location.replace('https://www.google.com/search?q=' + searchedText);
    event.preventDefault();
  }

  let searchForm;
  if (showSearch)
    searchForm = (
      <form
        onSubmit={submitSearchGoogle}
        className="pt-2 relative mx-auto text-gray-600"
      >
        <input
          autoFocus
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => SetSearchedText(e.target.value)}
          value={searchedText}
        />
      </form>
    );

  const currentBackground = require('./background.json').background;

  return (
    <div className="overflow-hidden w-screen h-screen">
      <div
        className="w-screen h-screen text-white bg-cover"
        style={{
          backgroundImage:
            'url(data:image/png;base64,' + currentBackground + ')',
        }}
      >
        <div className="container mx-auto">
          <div className="flex items-center h-screen">
            <div className="text-center self-center mx-auto">
              <h1 className="text-7xl leading-tight">{currentTime}</h1>
              <h1 className=" text-4xl leading-tight">{currentDay}</h1>
              {/*<p className=" text-base leading-relaxed mt-8 font-semibold">
                Now you should be {capitalize(whatCurrentThing)}.
              </p>*/}
              {searchForm}
              <CalendarEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
