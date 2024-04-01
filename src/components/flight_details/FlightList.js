import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors } from '../../../assets/Colors'

const FlightList = React.memo((props) => {
    return (
        <Pressable onPress={() => props.goToCheckout(props.item)} style={styles.mainListView}>
            <View style={styles.flightNameView}>
                <Image
                    style={styles.iconStyle}
                    source={require('../../../assets/images/plane.png')}
                />
                <Text style={styles.companyNameText}>{props.item.airline}</Text>
                <Text style={styles.planeNameText}>{props.item.flightNumber + ' - ' + props.item.aircraft}</Text>
            </View>

            <View style={styles.detailsView}>
                <View style={styles.timeView}>
                    <Text style={[styles.text1, styles.takeOffTimeText]}>{String(new Date(props.item.departureTime).getHours()).padStart(2, '0') + ':' + String(new Date(props.item.departureTime).getMinutes()).padStart(2, '0')}</Text>
                    <Text style={[styles.text2, styles.durationText]}>{props.item.duration.replace(/hours/g, 'h').replace(/minutes/g, 'm')}</Text>
                    <Text style={[styles.text1, styles.landingTimeText]}>{String(new Date(props.item.arrivalTime).getHours()).padStart(2, '0') + ':' + String(new Date(props.item.arrivalTime).getMinutes()).padStart(2, '0')}</Text>
                    <Text style={[styles.text1, styles.priceText]}>{'₹ ' + props.item.price}</Text>
                </View>
                <View style={styles.cityNameView}>
                    <Text style={[styles.text2, styles.takeOffTimeText]}>{props.item.origin}</Text>
                    <Text style={[styles.text2, styles.landingTimeText]}>{props.item.destination}</Text>

                </View>
            </View>
        </Pressable>
    )
})

export default FlightList

const styles = StyleSheet.create({
    mainListView: {
        width: '92%',
        backgroundColor: Colors.white,
        alignSelf: 'center',
        elevation: 2,
        marginVertical: RFPercentage(2),
        borderRadius: 4,
    },
    flightNameView: {
        width: '100%',
        height: RFPercentage(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        paddingHorizontal: 4
    },
    detailsView: {
        flexDirection: 'column',
        width: '100%',

    },
    timeView: {
        flexDirection: 'row',
        width: '100%',
        height: RFPercentage(5),
        alignItems: 'center',
        paddingHorizontal: RFPercentage(2)
    },
    cityNameView: {
        flexDirection: 'row',
        width: '100%',
        height: RFPercentage(4),
        alignItems: 'center',
        paddingHorizontal: RFPercentage(2)
    },
    text1: {
        color: Colors.black,
        fontSize: RFPercentage(2.2),
        fontWeight: '500',
    },
    text2: {
        color: Colors.black,
        fontSize: RFPercentage(1.8),
        fontWeight: '300',
    },
    text3: {
        color: Colors.black,
        fontSize: RFPercentage(1.5),
        fontWeight: '300',
    },
    takeOffTimeText: {
        position: 'absolute',
        left: RFPercentage(2)
    },
    durationText: {
        position: 'absolute',
        left: RFPercentage(12),
        borderBottomColor: Colors.green,
        borderBottomWidth: 1.5,
        width: RFPercentage(8),
        textAlign: 'center',
        height: RFPercentage(3)
    },
    landingTimeText: {
        position: 'absolute',
        left: RFPercentage(23)
    },
    priceText: {
        position: 'absolute',
        left: RFPercentage(35)
    }
})