import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors } from '../../assets/Colors'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('flightSearch')
        }, 2000);
    }, [])

    return (
        <View style={styles.splashView}>
            <Image source={require('../../assets/images/airplane.gif')} style={styles.splashGif} />
            <Text style={styles.LogoText}>{'Jet Set Go'}</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    splashView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    splashGif: {
        top: RFPercentage(30),
        width: RFPercentage(12),
        height: RFPercentage(12),
    },
    LogoText: {
        color: 'blue',
        fontSize: RFPercentage(4),
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: RFPercentage(30),
    }
})