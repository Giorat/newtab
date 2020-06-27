import React, { useState, useEffect, Fragment } from 'react';
import bent from 'bent';

function geturlparams(name: string): string {
  // courtesy of https://stackoverflow.com/a/5158301/3216524 //
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  if (match) return decodeURIComponent(match[1].replace(/\+/g, ' '));
  else return '';
}

const AUTH_CALENDAR_KEY = 'calendar_auth';

function CalendarEvents() {
  const [loading, SetLoading] = useState(true);
  const [token, SetToken] = useState('');
  const [urlLogin, SetLoginUrl] = useState('');
  const [events, SetEvents] = useState([]);

  const Login = () => {
    if (urlLogin !== '') window.location.href = urlLogin;
  };

  useEffect(() => {
    // if (urlLogin !== '') window.location.href = urlLogin;
  }, [urlLogin]);

  useEffect(() => {
    const getCalendarEvents = async () => {
      // http://localhost:8888/?token=ya29.a0AfH6SMCneraBQuN2R0VeawFfaYelEr5qFDLZjeNpexnWZnI5x_5EkUs9u8StP-OWfwaxGt_A5KMOJtmfxpfhvR43XRMKAg4lXDhU-_MIAZWNMujtK6hry1_5fcgfIMEuppsK-_MKZa8g8ok1IpkVtC9NbGquDzUaWgo
      let start = new Date();
      let end = new Date();
      end.setHours(23, 59, 59, 999);

      try {
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
          SetLoading(false);
        }
      } catch (e) {
        window.localStorage.removeItem(AUTH_CALENDAR_KEY);
        window.location.reload();
      }
    };
    if (token !== '') {
      window.localStorage.setItem(AUTH_CALENDAR_KEY, token);
      getCalendarEvents();
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const windowToken = window.location.search.indexOf('token') > -1;
      const localToken = window.localStorage.getItem(AUTH_CALENDAR_KEY);

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

  const eventsOnUI = events.map((event: any, index) => {
    const start = new Date(event.start.dateTime).toLocaleTimeString('en-GB');
    const startTime = start.slice(0, -3);

    const end = new Date(event.end.dateTime).toLocaleTimeString('en-GB');
    const endTime = end.slice(0, -3);

    let opacity = 'opacity-50';
    if (index === 0) {
      opacity = 'my-2 opacity-100';
    }

    return (
      <div className={opacity}>
        [ {event.summary} - {startTime} - {endTime} ]
      </div>
    );
  });

  if (loading) {
    return <Fragment></Fragment>;
  } else {
    if (token === '') {
      return <button onClick={Login}> Login to see events</button>;
    } else {
      return (
        <Fragment>
          <br />
          <div className="events">{eventsOnUI}</div>
        </Fragment>
      );
    }
  }
}

export default CalendarEvents;
