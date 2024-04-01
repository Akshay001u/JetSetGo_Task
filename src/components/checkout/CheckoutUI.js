import { StyleSheet, Text, Image, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import PageHeader from '../../common_components/PageHeader'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors } from '../../../assets/Colors'

const CheckoutUI = (props) => {
    return (
        <View style={styles.mainView}>
            <PageHeader headerName={'Checkout'} showBackBtn={true} bottomLine={true} />

            <View style={styles.subView}>
                <View style={styles.flightNameView}>
                    <Image
                        style={styles.iconStyle}
                        source={require('../../../assets/images/plane.png')}
                    />
                    <Text style={styles.companyNameText}>{props.item.airline + ' | ' + props.item.flightNumber}</Text>
                    <Text style={styles.planeNameText}>{props.item.aircraft}</Text>
                </View>
                <Text style={styles.startTime}>{String(new Date(props.item.departureTime).getHours()).padStart(2, '0') + ':' + String(new Date(props.item.departureTime).getMinutes()).padStart(2, '0')}</Text>
                <Text style={styles.startDate}>{new Date(props.item.departureTime).getDate() + ' - ' + new Date(props.item.departureTime).getMonth() + ' - ' + new Date(props.item.departureTime).getFullYear()}</Text>
                <Text style={styles.startCity}>{props.item.origin}</Text>

                <Text style={styles.durationText}>{props.item.duration.replace(/hours/g, 'h').replace(/minutes/g, 'm')}</Text>

                <Text style={styles.endTime}>{String(new Date(props.item.arrivalTime).getHours()).padStart(2, '0') + ':' + String(new Date(props.item.arrivalTime).getMinutes()).padStart(2, '0')}</Text>
                <Text style={styles.endDate}>{new Date(props.item.arrivalTime).getDate() + ' - ' + new Date(props.item.arrivalTime).getMonth() + ' - ' + new Date(props.item.arrivalTime).getFullYear()}</Text>
                <Text style={styles.endCity}>{props.item.destination}</Text>
                <View style={{ width: '90%', height: 1, backgroundColor: Colors.grey4, alignSelf: 'center', top: RFPercentage(14) }} />

                <View style={{ position: 'absolute', top: RFPercentage(21), width: '100%', }}>
                    <Text style={styles.headingText}>{'Traveller Details :-'}</Text>
                    <TextInput
                        onChangeText={text => { props.setFullName(text), props.setErrorMsg('') }}
                        value={props.fullName}
                        style={styles.searchInputText}
                        placeholder={'Full Name'}
                        placeholderTextColor={Colors.grey3}
                        cursorColor={Colors.black}
                    />
                    <TextInput
                        onChangeText={text => { props.setPhoneNo(text), props.setErrorMsg('') }}
                        value={props.phoneNo}
                        style={styles.searchInputText}
                        placeholder={'Phone No'}
                        placeholderTextColor={Colors.grey3}
                        cursorColor={Colors.black}
                    />
                </View>

            </View>
            {props.errorMsg && <Text style={styles.errorMsgText}>{props.errorMsg}</Text>}
            <Pressable onPress={() => props.submitDetails()} style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#008080' : '#00FFFF',
                    opacity: pressed ? 0.8 : 1,
                },
                styles.buttonPressable,
            ]} >
                <Text style={styles.buttonText} >{props.isSubmitted ? 'Submitted' : 'Submit'}</Text>
            </Pressable>
        </View>
    )
}

export default CheckoutUI

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#DEE4E7'
    },
    subView: {
        width: '94%',
        height: RFPercentage(40),
        alignSelf: 'center',
        marginVertical: RFPercentage(2),
        backgroundColor: Colors.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    flightNameView: {
        width: '100%',
        height: RFPercentage(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: RFPercentage(0.5)
    },
    iconStyle: {
        width: RFPercentage(3),
        height: RFPercentage(3),
        marginStart: RFPercentage(2),
    },
    companyNameText: {
        color: Colors.black,
        fontSize: RFPercentage(2),
        fontWeight: '500',
        marginStart: RFPercentage(1.5)
    },
    planeNameText: {
        color: Colors.black,
        fontSize: RFPercentage(1.8),
        fontWeight: '400',
        position: 'absolute',
        right: RFPercentage(1),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.darkgrey,
        paddingHorizontal: 6
    },
    startTime: {
        color: Colors.green,
        fontSize: RFPercentage(3),
        fontWeight: '700',
        position: 'absolute',
        top: RFPercentage(6),
        left: RFPercentage(2.5),
    },
    endTime: {
        color: Colors.green,
        fontSize: RFPercentage(3),
        fontWeight: '700',
        position: 'absolute',
        top: RFPercentage(6),
        right: RFPercentage(2.5),
    },
    startDate: {
        color: Colors.darkgrey,
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        position: 'absolute',
        top: RFPercentage(11),
        left: RFPercentage(2.5),
    },
    endDate: {
        color: Colors.darkgrey,
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        position: 'absolute',
        top: RFPercentage(11),
        right: RFPercentage(2.5),
    },
    startCity: {
        color: Colors.darkgrey,
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        position: 'absolute',
        top: RFPercentage(13.5),
        left: RFPercentage(2.5),
    },
    endCity: {
        color: Colors.darkgrey,
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        position: 'absolute',
        top: RFPercentage(13.5),
        right: RFPercentage(2.5),
    },
    durationText: {
        color: Colors.black,
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        position: 'absolute',
        top: RFPercentage(7.5),
        alignSelf: 'center'
    },
    headingText: {
        color: Colors.black,
        fontSize: RFPercentage(1.8),
        fontWeight: '500',
        height: RFPercentage(3),
        marginStart: RFPercentage(2.5)
    },
    searchInputText: {
        color: Colors.black,
        fontSize: RFPercentage(2.1),
        fontWeight: '400',
        marginStart: RFPercentage(1),
        height: RFPercentage(5),
        backgroundColor: Colors.lightGrey,
        marginVertical: RFPercentage(1),
        width: '90%',
        alignSelf: 'center',
        borderRadius: 6,
        paddingHorizontal: RFPercentage(1)
    },
    buttonPressable: {
        width: '80%',
        height: RFPercentage(6),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: RFPercentage(2),
        borderRadius: 8,
        borderWidth: 1
    },
    buttonText: {
        color: Colors.black,
        fontSize: RFPercentage(2.6),
    },
    errorMsgText: {
        color: Colors.errMSG,
        fontSize: RFPercentage(1.8),
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: RFPercentage(2)
    }
})