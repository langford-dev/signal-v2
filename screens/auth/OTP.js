import React, { createRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../styles/globalStyles';
import HomeScreen from '../HomeScreen';
import OTPInputView from '@twotalltotems/react-native-otp-input'


function OTP({ navigation, route }) {
    const number = route.params.number;
    // const number = route.params.number;
    console.log(route);

    return (
        <ScrollView style={[globalStyles.container, globalStyles.bigPadding]}>
            <Text style={{ color: '#006aee', textAlign: 'center' }}>Verify  {number}</Text>
            <View style={globalStyles.space10}></View>
            <View style={globalStyles.flexCenterColumn}>
                <Text style={[globalStyles.lgText, globalStyles.textAlignCenter]}>
                    Verify your phone number
                </Text>
            </View>
            <View style={globalStyles.space30}></View>
            <Text style={[globalStyles.textAlignCenter, globalStyles.greyText, globalStyles.lineHeight]}>
                Wait to automatically detect the SMS sent to {number}
            </Text>
            <View style={globalStyles.space30}></View>

            <View style={{ height: 60 }}>
                <OTPInputView
                    autoFocusOnLoad
                    pinCount={4}
                    codeInputHighlightStyle={{ borderBottomColor: '#006aee' }}
                    codeInputFieldStyle={{
                        color: '#000',
                        fontSize: 18,
                        borderColor: '#fff',
                        borderBottomColor: '#f1f1f1'
                    }}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })} />
            </View>

            <View style={globalStyles.space30}></View>
            <TouchableOpacity onPress={() => navigation.navigate(HomeScreen)} style={styles.btn}>
                <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderColor: '#f1f1f1',
        borderWidth: 1,
        padding: 20,
        fontSize: 17
    },

    btn: {
        backgroundColor: '#006aee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 5,
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold'
    },

})

export default OTP