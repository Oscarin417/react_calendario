import { useState } from 'react'
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, Chip } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const eventColors = [
  { name: 'Azul', value: '#1976d2' },
  { name: 'Verde', value: '#4caf50' },
  { name: 'Rojo', value: '#f44336' },
  { name: 'Naranja', value: '#ff9800' },
  { name: 'Púrpura', value: '#9c27b0' },
]

function EventForm({ onAddEvent }) {
  const [eventName, setEventName] = useState('')
  const [eventColor, setEventColor] = useState(eventColors[0].value)
  const [selectedDates, setSelectedDates] = useState([])
  const [pickerValue, setPickerValue] = useState(null) // Para el DatePicker

  const handleDateChange = (date) => {
    if (date && !selectedDates.some(d => d.toDateString() === date.toDateString())) {
      setSelectedDates((prevDates) => [...prevDates, date])
    }
    setPickerValue(null) // Limpiar el picker después de seleccionar
  }

  const handleDeleteDate = (dateToDelete) => {
    setSelectedDates((prevDates) =>
      prevDates.filter((date) => date.toDateString() !== dateToDelete.toDateString())
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (eventName.trim() === '' || selectedDates.length === 0) {
      alert('Por favor, ingresa el nombre del evento y selecciona al menos un día.')
      return
    }

    const newEvent = {
      id: Date.now(), // Un ID único simple
      name: eventName,
      color: eventColor,
      days: selectedDates.map(date => date.toISOString()), // Guardar como ISO string
    }
    onAddEvent(newEvent)
    setEventName('')
    setEventColor(eventColors[0].value)
    setSelectedDates([])
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Crear Nuevo Evento</Typography>

      <TextField
        label="Nombre del Evento"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        required
      />

      <FormControl fullWidth>
        <InputLabel id="event-color-label">Color del Evento</InputLabel>
        <Select
          labelId="event-color-label"
          id="event-color-select"
          value={eventColor}
          label="Color del Evento"
          onChange={(e) => setEventColor(e.target.value)}
        >
          {eventColors.map((color) => (
            <MenuItem key={color.value} value={color.value}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: color.value, mr: 1 }} />
                {color.name}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle1" sx={{ mt: 1 }}>Días seleccionados:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 40, border: '1px solid #ccc', borderRadius: 1, p: 1 }}>
        {selectedDates.length > 0 ? (
          selectedDates.map((date, index) => (
            <Chip
              key={index}
              label={date.toLocaleDateString()}
              onDelete={() => handleDeleteDate(date)}
              color="primary"
              variant="outlined"
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">Ningún día seleccionado</Typography>
        )}
      </Box>

      <DatePicker
        label="Seleccionar Día(s)"
        value={pickerValue}
        onChange={handleDateChange}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'normal',
          },
        }}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Guardar Evento
      </Button>
    </Box>
  )
}

export default EventForm
