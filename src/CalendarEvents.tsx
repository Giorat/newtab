import React, { useState, useEffect, Fragment } from 'react';
import bent from 'bent';

function geturlparams(name: string): string {
  // courtesy of https://stackoverflow.com/a/5158301/3216524 //
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  if (match) return decodeURIComponent(match[1].replace(/\+/g, ' '));
  else return '';
}

function CalendarEvents() {
  const [loading, SetLoading] = useState(true);
  const [userName, SetUsername] = useState('');
  const [token, SetToken] = useState('');
  const [urlLogin, SetLoginUrl] = useState('');
  const [events, SetEvents] = useState([]);

  useEffect(() => {
    if (urlLogin !== '') window.location.href = urlLogin;
  }, [urlLogin]);

  useEffect(() => {
    const getCalendarEvents = async () => {
      // http://localhost:8888/?token=ya29.a0AfH6SMCneraBQuN2R0VeawFfaYelEr5qFDLZjeNpexnWZnI5x_5EkUs9u8StP-OWfwaxGt_A5KMOJtmfxpfhvR43XRMKAg4lXDhU-_MIAZWNMujtK6hry1_5fcgfIMEuppsK-_MKZa8g8ok1IpkVtC9NbGquDzUaWgo
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);

      const getCalendarAPI = bent(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        'GET',
        'json'
      );

      const allDay: any = await getCalendarAPI(
        `?singleEvents=true&timeMax=${end.toISOString()}&timeMin=${start.toISOString()}&orderBy=startTime`,
        undefined,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (allDay) {
        SetEvents(allDay.items);
        SetUsername(allDay.summary.split('@')[0]);
        SetLoading(false);
      }
    };
    if (token !== '') {
      window.localStorage.setItem('calendar_auth', token);
      getCalendarEvents();
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const windowToken = window.location.search.indexOf('token') > -1;
      const localToken = window.localStorage.getItem('calendar_auth');

      if (windowToken || localToken) {
        if (windowToken) SetToken(geturlparams('token'));
        if (localToken) SetToken(localToken);
      } else {
        const getJSON = bent(window.location.href, 'GET', 'json');
        const res: any = await getJSON('.netlify/functions/google-auth');
        if (res) {
          SetLoginUrl(res.redirectURL);
        }
      }
    };
    fetchData();
  }, []);

  const eventsOnUI = events.map((event: any) => {
    console.log(event);
    const start = new Date(event.start.dateTime).toLocaleTimeString('en-GB');
    const startTime = start.slice(0, -3);

    const end = new Date(event.end.dateTime).toLocaleTimeString('en-GB');
    const endTime = end.slice(0, -3);

    return (
      <div>
        [ {event.summary} - {startTime} - {endTime} ]
      </div>
    );
  });

  if (loading) {
    return <Fragment></Fragment>;
  } else {
    return (
      <Fragment>
        Hello {userName}
        <br />
        <br />
        {eventsOnUI}
      </Fragment>
    );
  }
}

export default CalendarEvents;
