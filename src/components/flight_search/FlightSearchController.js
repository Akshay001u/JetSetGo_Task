import React, { useState } from 'react'
import FlightSearchUI from './FlightSearchUI'
import { useNavigation } from '@react-navigation/native';

const FlightSearchController = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchDate, setSearchDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [errorMsg, setErrorMsg] = useState();



  const handlePickedDate = (date) => {
    setSelectedDate(date)
    setShowDatePicker(false);
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    setSearchDate(`${day}/${month}/${year}`)

  }

  const searchFlights = () => {
    if (origin && destination && selectedDate) {
      setErrorMsg('')
      navigation.navigate('flightDetails', { origin: origin, destination: destination, selectedDate: selectedDate })
    } else {
      if (!origin) { setErrorMsg('Please select departure city') }
      else if (!destination) { setErrorMsg('Please select destination city') }
      else if (!selectedDate) { setErrorMsg('Please select travel date') }
    }
  }

  return (
    <FlightSearchUI
      origin={origin}
      setOrigin={setOrigin}
      destination={destination}
      setDestination={setDestination}
      searchDate={searchDate}
      setSearchDate={setSearchDate}
      showDatePicker={showDatePicker}
      setShowDatePicker={setShowDatePicker}
      selectedDate={selectedDate}
      handlePickedDate={handlePickedDate}
      searchFlights={searchFlights}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  )
}

export default FlightSearchController