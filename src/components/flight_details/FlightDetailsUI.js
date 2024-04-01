import { FlatList, Image, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '../../common_components/PageHeader'
import { Colors } from '../../../assets/Colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import FlightList from './FlightList'
import { SkypeIndicator } from 'react-native-indicators';

const FlightDetailsUI = (props) => {
    return (
        <View style={styles.mainView}>
            <PageHeader headerName={'Flight Details'} showBackBtn={true} bottomLine={true} />

            <TouchableOpacity onPress={() => props.setShowFilterModel(!props.showFilterModel)} style={styles.filterIconStyle}>
                <Image
                    style={{ width: RFPercentage(3), height: RFPercentage(3) }}
                    source={require('../../../assets/images/filter.png')}
                />
            </TouchableOpacity>

            <View style={styles.listView}>
                {props.flightListLoading ?
                    <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <SkypeIndicator color={Colors.orange} size={30} />
                    </View>
                    :
                    <FlatList
                        data={props.flightData}
                        refreshControl={
                            <RefreshControl refreshing={props.isFlightListRefreshing} onRefresh={props.onRefresh} />
                        }
                        initialNumToRender={10}
                        windowSize={11}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews={true}
                        ListEmptyComponent={<Text style={styles.errorMsgText}>{'No flights found !'}</Text>}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => (
                            <FlightList
                                item={item}
                                goToCheckout={props.goToCheckout}
                            />
                        )}
                    />
                }
            </View>

            {props.showFilterModel && <View style={styles.backgroundBlackView} />}

            <Modal
                animationType="slide"
                transparent={true}
                visible={props.showFilterModel}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => props.setShowFilterModel(false)}>
                <View style={styles.filterModelView}>
                    <View style={styles.modelHeaderView}>
                        <Text style={styles.modelHeaderText}>{'Sort & Filters'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.setShowFilterModel(false)} style={styles.filterIconStyle}>
                        <Image
                            style={{ width: RFPercentage(3), height: RFPercentage(3) }}
                            source={require('../../../assets/images/cancel.png')}
                        />
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: RFPercentage(63) }}>
                        <ScrollView>
                            <Text style={styles.sortFilterText}>{'Sort By Price :-'}</Text>
                            <Text disabled={props.selectedAirlineArray.length > 0 ? true : false} onPress={() => props.setSortCheapestFirst(!props.sortCheapestFirst)} style={[styles.cheapestText, { color: props.sortCheapestFirst ? '#008080' : Colors.black, borderColor: props.sortCheapestFirst ? '#008080' : Colors.grey3 }]}>{'Cheapest first'}</Text>
                            <Text style={[styles.sortFilterText, { color: Colors.darkgrey }]}>{'Filter By Airline :-'}</Text>
                            <View style={styles.airlineView}>
                                {props.airlineList.map((item, index) => {
                                    return (
                                        <Pressable disabled={props.sortCheapestFirst ? true : false} onPress={() => props.handleAirlineSelection(item)} key={index} style={styles.airDataView}>
                                            <Image
                                                style={{ width: RFPercentage(3), height: RFPercentage(3), marginStart: RFPercentage(2) }}
                                                source={require('../../../assets/images/plane.png')}
                                            />
                                            <Text style={styles.airlineText}>{item.airline}</Text>
                                            <Image
                                                style={{ width: RFPercentage(3), height: RFPercentage(3), position: 'absolute', right: RFPercentage(2) }}
                                                source={item.check ? require('../../../assets/images/check.png') : require('../../../assets/images/unchecked.png')}
                                            />
                                        </Pressable>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <Pressable onPress={() => props.applySortFilter()} style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#008080' : '#00FFFF',
                            opacity: pressed ? 0.8 : 1,
                        },
                        styles.buttonPressable,
                    ]} >
                        <Text style={styles.buttonText} >{'Apply'}</Text>
                    </Pressable>

                </View>
            </Modal>


        </View>
    )
}

export default FlightDetailsUI

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#DEE4E7'
    },
    listView: {
        backgroundColor: '#DEE4E7',
        position: 'absolute',
        top: RFPercentage(7.5),
        bottom: 0,
        width: '100%',
    },
    errorMsgText: {
        color: Colors.errMSG,
        fontSize: RFPercentage(2.1),
        fontWeight: '400',
        alignSelf: 'center',
        marginTop: RFPercentage(20),
    },
    filterIconStyle: {
        position: 'absolute',
        top: RFPercentage(1.5),
        right: RFPercentage(2.5),
        width: RFPercentage(5),
        height: RFPercentage(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundBlackView: {
        backgroundColor: Colors.black,
        opacity: 0.4,
        width: '100%',
        height: '100%'
    },
    filterModelView: {
        width: '100%',
        maxHeight: RFPercentage(80),
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.white
    },
    modelHeaderView: {
        width: '100%',
        height: RFPercentage(8),
        justifyContent: 'center',
        borderBottomColor: Colors.grey3,
        borderBottomWidth: 1,
        backgroundColor: '#DEE4E7',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    modelHeaderText: {
        color: Colors.black,
        fontSize: RFPercentage(2.2),
        fontWeight: '600',
        marginStart: RFPercentage(3)
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
    sortFilterText: {
        color: Colors.darkgrey,
        fontSize: RFPercentage(2.1),
        fontWeight: '400',
        marginStart: RFPercentage(2),
        marginVertical: RFPercentage(2),
    },
    cheapestText: {
        fontSize: RFPercentage(2),
        fontWeight: '400',
        marginStart: RFPercentage(5),
        marginVertical: RFPercentage(1),
        borderWidth: 1,
        width: RFPercentage(15),
        height: RFPercentage(4),
        borderRadius: 4,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    airlineView: {
        width: '90%',
        alignSelf: 'center',
        height: RFPercentage(50)
    },
    airDataView: {
        flexDirection: 'row',
        width: '100%',
        height: RFPercentage(5),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey7
    },
    airlineText: {
        color: Colors.black,
        fontSize: RFPercentage(2),
        fontWeight: '400',
        marginStart: RFPercentage(3),
    }
})