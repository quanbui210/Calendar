/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';



const App = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    axios.get('https://doortablets.netlify.app/reservations?room=Viipuri-sali')
    .then(response => {
      const result = response.data.map(event => {
        return {
          id: uuidv4(),
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          extra: event.extra
        }
      })
      setEvents(result)
    })
  }, [])
  console.log(events)

  const eventStyleGetter = (event, start, end, isSelected) => {
    // You can customize the style of events based on their properties
    const style = {
      color: '#333',
      borderRadius: '5px',
      border: '1px solid #333',
      display: 'block',
      height: 'auto', 
      textOverflow: 'ellipsis',
      backgroundColor: '#00e5d7'
    }
    return {
      style
    }
  }

 
  return (
    <Calendar
      defaultView='week'
      events={events}
      localizer={momentLocalizer(moment)}
      style={{ height: '140vh' }}
      eventPropGetter={eventStyleGetter} // Apply custom event styles
    />
  )
}

export default App
