import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Badge } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'

function Calendar({ events, selectedDate, onDateChange }) {
  // Función para determinar si un día tiene eventos
  const isDayHighlighted = (date) => {
    return events.some(event =>
      event.days.some(eventDay =>
        new Date(eventDay).toDateString() === date.toDateString()
      )
    )
  }

  // Renderizador personalizado de días para mostrar un badge si hay eventos
  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props
    const isHighlighted = isDayHighlighted(day)

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isHighlighted ? '•' : undefined} // Puedes usar un ícono o un círculo
        color="secondary" // Color del badge
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    )
  }

  return (
    <DateCalendar
      value={selectedDate}
      onChange={(newDate) => onDateChange(newDate)}
      views={['day']} // Solo vista de día
      renderDay={ServerDay} // Usar nuestro renderizador personalizado
    />
  )
}

export default Calendar
