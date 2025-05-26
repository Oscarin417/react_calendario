import { useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import Calendar from './components/Calendar'
import EventForm from './components/EventForm'

const App = ()=> {
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Mi Calendario de Eventos
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <EventForm onAddEvent={handleAddEvent} />
        </Box>
        <Box sx={{ flex: 2 }}>
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Eventos para {selectedDate.toLocaleDateString()}
        </Typography>
        {events
          .filter(event =>
            event.days.some(day =>
              new Date(day).toDateString() === selectedDate.toDateString()
            )
          )
          .map((event, index) => (
            <Box key={index} sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              mb: 1,
              borderRadius: 1,
              backgroundColor: event.color,
              color: 'white' // Para que el texto sea legible
            }}>
              <Typography variant="body1">
                {event.name}
              </Typography>
            </Box>
          ))}
        {events.filter(event =>
            event.days.some(day =>
              new Date(day).toDateString() === selectedDate.toDateString()
            )
          ).length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No hay eventos para este día.
            </Typography>
          )}
      </Box>
    </Container>
  )
}

export default App
