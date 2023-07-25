import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)
const myEventsList = []

function CustomCalendar({ calendarData, clearCalendar, resetCalendar, events }) {
  const [selectedSlots, setSelectedSlots] = useState([])

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo
    const selectedSlot = { start, end }
    if (
      !selectedSlots.find((x) => moment(x.start).isSame(selectedSlot.start)) &&
      moment(new Date()).isBefore(selectedSlot.start) &&
      !events.find((x) => moment(x.start).isSame(selectedSlot.start))
    ) {
      setSelectedSlots((prevSelectedSlots) => [...prevSelectedSlots, selectedSlot])
    }
  }

  const slotPropGetter = (date) => {
    if (selectedSlots.some((slot) => moment(date).isSame(slot.start))) {
      return {
        style: { backgroundColor: '#89CFF0' },
      }
    }

    if (events.length > 0) {
      if (events.some((event) => moment(date).isSame(event.start))) {
        return {
          style: { backgroundColor: '#d3d3d3', pointerEvents: 'none', cursor: 'default' },
        }
      }
    }
    return {}
  }

  const eventPropGetter = () => {
    return {
      style: { backgroundColor: '#198754' },
    }
  }

  useEffect(() => {
    calendarData(selectedSlots)
  }, [selectedSlots])

  useEffect(() => {
    clearCalendar === true && setSelectedSlots([])
    resetCalendar()
  }, [clearCalendar])

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 900, cursor: 'pointer' }}
        views={['month', 'week', 'day']}
        defaultView="week"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventPropGetter}
        timeslots={1}
        step={60}
      />
    </div>
  )
}

export default CustomCalendar
