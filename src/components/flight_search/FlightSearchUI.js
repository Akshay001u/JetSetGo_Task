import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import PageHeader from '../../common_components/PageHeader'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors } from '../../../assets/Colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FlightSearchUI = (props) => {
  return (
    <View style={styles.mainView}>
      <PageHeader headerName={'Flight Search'} showBackBtn={false} bottomLine={true} />

      <View style={[styles.searchView, { marginTop: RFPercentage(3) }]}>
        <Image
          style={styles.iconStyle}
          source={require('../../../assets/images/planetakeoff.png')}
        />
        <View style={styles.searchTextView}>
          <Text style={styles.text}>From</Text>
          <TextInput
            onChangeText={text => { props.setOrigin(text), props.setErrorMsg('') }}
            value={props.origin}
            style={styles.searchInputText}
            placeholder={'Choose Departure'}
            placeholderTextColor={Colors.grey3}
            cursorColor={Colors.black}
          />
        </View>
      </View>

      <View style={styles.searchView}>
        <Image
          style={styles.iconStyle}
          source={require('../../../assets/images/planelanding.png')}
        />
        <View style={styles.searchTextView}>
          <Text style={styles.text}>To</Text>
          <TextInput
            onChangeText={text => { props.setDestination(text), props.setErrorMsg('') }}
            value={props.destination}
            style={styles.searchInputText}
            placeholder={'Choose Destination'}
            placeholderTextColor={Colors.grey3}
            cursorColor={Colors.black}
          />
        </View>
      </View>

      <View style={styles.searchView}>
        <Image
          style={styles.iconStyle}
          source={require('../../../assets/images/calender.png')}
        />
        <View style={styles.searchTextView}>
          <Text style={styles.text}>Travel Date</Text>
          <Pressable onPress={() => { props.setShowDatePicker(true), props.setErrorMsg('') }} style={styles.datePickerView}>
            <Text style={[styles.dateText, !props.searchDate && { color: Colors.grey3 }]}>{props.searchDate ? props.searchDate : 'Select Date'}</Text>
          </Pressable>
        </View>
      </View>

      {props.errorMsg && <Text style={styles.errorMsgText}>{props.errorMsg}</Text>}

      <Pressable onPress={() => props.searchFlights()} style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#008080' : '#00FFFF',
          opacity: pressed ? 0.8 : 1,
        },
        styles.buttonPressable,
      ]} >
        <Text style={styles.buttonText} >{'Search Flights'}</Text>
      </Pressable>

      <DateTimePickerModal
        maximumDate={new Date()}
        isVisible={props.showDatePicker}
        mode="date"
        date={props.selectedDate != '' ? props.selectedDate : new Date()}
        onConfirm={props.handlePickedDate}
        onCancel={() => props.setShowDatePicker(false)}
      />

    </View>
  )
}

export default FlightSearchUI

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#DEE4E7'
  },
  searchView: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.lightGrey,
    marginVertical: RFPercentage(1),
    alignSelf: 'center',
    borderRadius: 6
  },
  iconStyle: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    marginStart: RFPercentage(2)
  },
  searchTextView: {
    width: '80%',
    marginStart: RFPercentage(2),
    paddingVertical: RFPercentage(0.5),
    borderBottomColor: Colors.grey5,
    borderBottomWidth: 1,
  },
  text: {
    color: Colors.black,
    fontSize: RFPercentage(2.1),
    fontWeight: '500',
    marginStart: RFPercentage(1.5),
    height: RFPercentage(3),
    borderBottomColor: Colors.grey5,
    borderBottomWidth: 1
  },
  searchInputText: {
    color: Colors.black,
    fontSize: RFPercentage(2.1),
    fontWeight: '400',
    marginStart: RFPercentage(1),
    height: RFPercentage(5),
  },
  buttonPressable: {
    width: '80%',
    height: RFPercentage(6),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: RFPercentage(5),
    borderRadius: 8,
    borderWidth: 1
  },
  buttonText: {
    color: Colors.black,
    fontSize: RFPercentage(2.6),
  },
  datePickerView: {
    width: '100%',
    height: RFPercentage(5),
    justifyContent: 'center',
  },
  dateText: {
    color: Colors.black,
    fontSize: RFPercentage(2.1),
    marginStart: RFPercentage(1.6),
    height: RFPercentage(5),
    textAlignVertical: 'center',
  },
  errorMsgText: {
    color: Colors.errMSG,
    fontSize: RFPercentage(1.8),
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: RFPercentage(2)
  }
})