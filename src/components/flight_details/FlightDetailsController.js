import React, { useCallback, useEffect, useState } from 'react'
import FlightDetailsUI from './FlightDetailsUI'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const FlightDetailsController = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { origin, destination, selectedDate } = route.params;
    const [flightData, setFlightData] = useState([]);
    const [flightDataCopy, setFlightDataCopy] = useState([]);
    const [filteredFlightData, setFilteredFlightData] = useState([]);
    const [showFilteredFlightData, setShowFilteredFlightData] = useState(false);
    const [isFlightListRefreshing, setIsFlightListRefreshing] = useState(false);
    const [flightListLoading, setFlightListLoading] = useState(false);
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [airlineList, setAirlineList] = useState([]);
    const [sortCheapestFirst, setSortCheapestFirst] = useState(false);
    const [isFilterByAirline, setIsFilterByAirline] = useState(false);
    const [selectedAirlineArray, setSelectedAirlineArray] = useState([]);



    useEffect(() => {
        setFlightListLoading(true)
        getFlightData()
    }, [])

    const getFlightData = async () => {
        try {
            const response = await axios.get('https://api.npoint.io/378e02e8e732bb1ac55b');
            if (response.status === 200) {
                var tempArray = []
                tempAirlineArray = []
                response.data.map(item => {
                    if ((origin.trim().toLowerCase() == item.origin.trim().toLowerCase()) &&
                        (destination.trim().toLowerCase() == item.destination.trim().toLowerCase()) &&
                        (new Date(item.departureTime).getFullYear() == new Date(selectedDate).getFullYear()) &&
                        (new Date(item.departureTime).getMonth() == new Date(selectedDate).getMonth()) &&
                        (new Date(item.departureTime).getDate() == new Date(selectedDate).getDate())) {
                        tempArray.push(item)
                    }
                })
                setFlightData(tempArray)
                setFlightDataCopy(tempArray)
                tempArray.map(item1 => {
                    tempAirlineArray.push(item1.airline)
                })
                newlist = tempAirlineArray.filter(function (elem, index) {
                    if (tempAirlineArray.indexOf(elem) == index) {
                        return elem !== ''
                    }
                });
                setAirlineList(newlist.map(item => {
                    if (item != '') {
                        return { airline: item, id: Math.random(), check: false };
                    }
                }));

                setFlightListLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    };


    const onRefresh = useCallback(() => {
        setFlightListLoading(true)
        setSortCheapestFirst(false)
        setShowFilteredFlightData(false)
        setIsFlightListRefreshing(true);
        setFlightData([])
        getFlightData()
        setIsFlightListRefreshing(false);
    }, []);


    const handleAirlineSelection = (item) => {
        if (selectedAirlineArray.length === 0) {
            selectedAirlineArray.push(item.airline);
        } else {
            selectedAirlineArray.filter(element => {
                if (item.airline != element) {
                    selectedAirlineArray.push(item.airline);
                } else {
                    var data = selectedAirlineArray.filter((task) => task != item.airline)
                    setSelectedAirlineArray(data);
                }
            });
        }

        if (item.check) {
            setAirlineList(airlineList.map(airline => {
                if (item.id == airline.id) {
                    return { ...airline, check: false }
                }
                return airline
            }))
        } else {
            setAirlineList(airlineList.map(airline => {
                if (item.id == airline.id) {
                    return { ...airline, check: true }
                }
                return airline
            }))
        }
    }

    const applySortFilter = () => {
        if (sortCheapestFirst) {
            flightDataCopy.sort((a, b) => a.price - b.price);
            setShowFilteredFlightData(false)
        } else {
            if (selectedAirlineArray.length > 0) {
                const myresult = flightData.filter(item =>
                    selectedAirlineArray.find(word => item.airline.toLowerCase().includes(word.toLowerCase()))
                )
                setFilteredFlightData(myresult)
                setShowFilteredFlightData(true)
            } else {
                setShowFilteredFlightData(false)
            }
        }
        setShowFilterModel(false)
    }

    const goToCheckout = (item) => {
        navigation.navigate('checkout', { item: item })
    }

    return (
        <FlightDetailsUI
            flightData={showFilteredFlightData ? filteredFlightData : (sortCheapestFirst ? flightDataCopy : flightData)}
            flightListLoading={flightListLoading}
            isFlightListRefreshing={isFlightListRefreshing}
            onRefresh={onRefresh}
            showFilterModel={showFilterModel}
            setShowFilterModel={setShowFilterModel}
            airlineList={airlineList}
            handleAirlineSelection={handleAirlineSelection}
            sortCheapestFirst={sortCheapestFirst}
            setSortCheapestFirst={setSortCheapestFirst}
            isFilterByAirline={isFilterByAirline}
            applySortFilter={applySortFilter}
            selectedAirlineArray={selectedAirlineArray}
            goToCheckout={goToCheckout}
        />
    )
}

export default FlightDetailsController