import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ActionSheet from "react-native-actions-sheet";
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../styles/globalStyles';
import storage from '../storage/storage';
import ContactsPage from './ContactsPage';
import io from "socket.io-client";
import * as Notifications from "expo-notifications";
import axios from 'axios';
import CountryPicker from 'react-native-country-picker-modal'


const socket = io('https://signal-v2-server.herokuapp.com/')

// storage.remove({ key: 'chatrooms' })
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

function HomeScreen({ navigation }) {
    const actionSheetRef = createRef();

    const [rooms, setRooms] = useState([])
    const [hasRooms, setHasRooms] = useState([])
    const [phoneNumber, setPhoneNumber] = useState()
    const [otp, setOTP] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isEnteredNumber, setIsEnteredNumber] = useState(false)
    const [loading, setLoading] = useState(false)
    const [countryCode, setCountryCode] = useState('');


    React.useEffect(() => {

        // setIsEnteredNumber(false)
        // setIsAuth(false)

        navigation.addListener('focus', async () => {
            console.log('isFocused')

            await storage.load({ key: 'phoneNumber' })
                .then(data => {

                    if (data !== null) {
                        setLoading(true)
                        setPhoneNumber(data)
                        setIsEnteredNumber(true)
                        setIsAuth(true)
                    }
                })

                .catch(e => { console.log(e) })

            await storage.load({ key: 'chatrooms' })
                .then(data => {
                    setLoading(false)
                    setRooms(data);

                    if (data.length > 0) setHasRooms(true)
                    else setHasRooms(false)
                })

                .catch(e => { console.log(e); setHasRooms(false) })
            return;
        });

        return () => { console.log('is not isFocused'); }
    }, [navigation]);

    const hasRoomsLabel = () => {
        if (!hasRooms) return <View style={globalStyles.flexCenterColumn}>
            <View style={globalStyles.space30}></View>
            <Text style={globalStyles.boldText}>No chats yet</Text>
            <Text style={globalStyles.boldText}>Get started by messaging a friend</Text>
        </View>
    }

    const triggerInputNumber = async () => {
        try {
            console.log('phoneNumber', phoneNumber.length)

            if (phoneNumber === undefined) {
                Alert.alert('', 'Please enter your phone number');
                return;
            }

            if (phoneNumber.length <= 5) {
                Alert.alert('', 'Check the length of the number you entered');
                return
            }

            if (countryCode) {
                setLoading(true)

                const newNumber = countryCode + phoneNumber
                const reponse = await axios.post('http://localhost:4040/auth/number', { 'number': newNumber })

                if (reponse.status === 200) {
                    setIsEnteredNumber(true)
                    setLoading(false)
                }
            } { Alert.alert('', 'Select your country'); return }

        } catch (e) {
            setLoading(false);

            console.log(e.message)

            if (e.message === 'Request failed with status code 400') {
                Alert.alert('', 'You entered the wrong phone number');
                return
            }

            if (e.message === 'Request failed with status code 501') {
                Alert.alert('', 'Please check your internet connection');
                return
            }

            Alert.alert('', 'Please try again later')
        }
    }

    const checkotp = async () => {
        try {
            const newNumber = countryCode + phoneNumber
            setLoading(true)
            const reponse = await axios.post('http://localhost:4040/auth/verify/number', { 'number': newNumber, 'otp': otp })
            console.log(reponse.data)

            if (reponse.data.status === 'approved' && reponse.data.valid) {
                await storage.save({ key: 'phoneNumber', data: phoneNumber })
                setLoading(false)
                setIsAuth(true)
            }

            else { alert('You entered the wrong code'); setLoading(false) }

        } catch (e) {
            setLoading(false)
            console.log(e)
            alert('A network error occured. Please try again')
        }
    }

    if (loading) return (
        <View style={[globalStyles.loader, globalStyles.flexCenterColumn]}>
            <ActivityIndicator size={50} color="#006aee" />
        </View>
    )

    // otp
    if (!isAuth && isEnteredNumber) return (
        <ScrollView style={{ paddingVertical: 70, paddingHorizontal: 20, backgroundColor: '#fff', }}>
            <Text style={[globalStyles.lgText, globalStyles.textAlignCenter]}> Verify your account </Text>
            <View style={globalStyles.space10} />
            <Text style={[globalStyles.textAlignCenter, globalStyles.greyText, globalStyles.lineHeight]}> Enter the OTP you received by SMS. This extra layer of security protects your account from attacters </Text>
            <View style={globalStyles.space10} />
            <TouchableOpacity onPress={() => setIsEnteredNumber(false)}>
                <Text style={[globalStyles.textBtn, globalStyles.textAlignCenter]}> Change number {countryCode + phoneNumber} </Text>
            </TouchableOpacity>
            <View style={globalStyles.space30} />

            <TextInput
                autoFocus={true}
                style={globalStyles.authInputBox}
                value={otp}
                onChangeText={(value) => setOTP(value.split(/\s+/).join(""))} />

            <View style={globalStyles.space30}></View>
            <TouchableOpacity style={globalStyles.btn} onPress={() => checkotp()}>
                <Text style={globalStyles.btnText}>Verify</Text>
            </TouchableOpacity>
        </ScrollView>
    )


    // phone number
    if (!isAuth && !isEnteredNumber) return (<View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        left: 0,
    }}>

        <ScrollView style={{ paddingVertical: 70, paddingHorizontal: 20, backgroundColor: '#fff', }}>
            <View style={globalStyles.flexCenterColumn}>
                <Text style={[globalStyles.lgText, globalStyles.textAlignCenter]}>
                    Input your phone number to start private messaging
                </Text>
            </View>
            <View style={globalStyles.space30}></View>
            <Text style={[globalStyles.textAlignCenter, globalStyles.greyText, globalStyles.lineHeight]}>
                {/* Your number will be only be visible to people who have your number saved on their contact list.  */}
                Enter your number without your country code
            </Text>
            <View style={globalStyles.space30}></View>

            <CountryPicker
                // withModal={false}
                withCallingCode={true}
                withFilter={true}
                // onOpen={alert('')}
                // visible={true}
                onSelect={code => setCountryCode('+' + code.callingCode[0])} />
            <View style={globalStyles.space30} />

            <View style={globalStyles.flex}>
                <Text>{countryCode ? '' : '+000'} {countryCode}</Text>
                <View style={globalStyles.space20} />
                <TextInput
                    autoFocus={true}
                    keyboardType='phone-pad'
                    style={globalStyles.authInputBox}
                    value={phoneNumber}
                    placeholder='eg. 550202871'
                    // onChangeText={(value) => setPhoneNumber(value)} />
                    onChangeText={(value) => setPhoneNumber(value.replace(/[^a-zA-Z0-9]/g, "").split(/\s+/).join(""))} />
            </View>

            <View style={globalStyles.space30}></View>
            <TouchableOpacity style={globalStyles.btn} onPress={() => triggerInputNumber()}>
                <Text style={globalStyles.btnText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>

    </View>)

    if (isAuth && isEnteredNumber) return (
        <View style={globalStyles.container}>
            <View style={globalStyles.appBar}>
                <View style={globalStyles.flex}>
                    {/* <TouchableOpacity onPress={() => { navigation.navigate(ProfilePage) }}>
                        <View style={globalStyles.appBarAvatar}></View>
                    </TouchableOpacity> */}
                    <Text style={globalStyles.appBarTitle}>Signal v2</Text>
                </View>

                <View style={globalStyles.flex}>
                    <TouchableOpacity onPress={() => { navigation.navigate(SearchPage) }}>
                        <Icon name='ios-search-outline' size={22} color='#006aee' />
                    </TouchableOpacity>
                    <View style={globalStyles.space30}></View>
                    <TouchableOpacity><Icon name='ellipsis-vertical-outline' color='#006aee' size={23} /></TouchableOpacity>
                </View>
            </View>

            <ScrollView style={globalStyles.roundedScrollView}>
                {hasRoomsLabel()}
                {
                    rooms.map(
                        (room, index) => {
                            return <ChatRoomCard
                                key={index}
                                name={room.roomName}
                                data={room}
                                content={room.lastMessage}
                                counter={0} />
                        }
                    )
                }
            </ScrollView>

            <TouchableOpacity style={globalStyles.fab} onPress={() => { navigation.navigate(ContactsPage); }}>
                <Icon name='md-pencil-sharp' color='#fff' size={30} />
            </TouchableOpacity>

            <ActionSheet
                gestureEnabled={true}
                bounceOnOpen={true}
                openAnimationSpeed={10}
                bounciness={5}
                defaultOverlayOpacity={0.1}
                ref={actionSheetRef}
                containerStyle={globalStyles.bottomSheet}
                indicatorColor={'#ccc'}>
            </ActionSheet>
        </View>
    )
}

const ChatRoomCard = (props) => {

    const navigation = useNavigation()
    // const isFocused = navigation.isFocused();

    const [roomId, setRoomId] = useState('000')
    const [myNumber, setmyNumber] = useState()
    const [isTyping, setIsTyping] = useState(false)
    const contactNumber = props.data.roomNumber

    useEffect(async () => {
        const getMyNumber = async () => {
            await storage.load({ key: 'phoneNumber' }).then(number => { setmyNumber(number) })
        }

        const getRoomID = () => {
            if (contactNumber < myNumber) setRoomId((contactNumber + myNumber).replace(/[^a-zA-Z0-9]/g, "").split(/\s+/).join(""));
            else setRoomId((myNumber + contactNumber).replace(/[^a-zA-Z0-9]/g, "").split(/\s+/).join(""));
        }

        const connectToSocket = () => {
            console.log('connecting to ws...', roomId)
            socket.emit('join-room', roomId)
            // socket.on('typing', () => { setIsTyping(true); setTimeout(() => { setIsTyping(false) }, 3000); })
            socket.on('new-message', (data) => {
                if (data.from === props.data.roomNumber) showNotification(data)
            })
        }

        await getMyNumber()
        getRoomID()
        connectToSocket()


        return () => { }
    }, [roomId, myNumber, contactNumber])

    function showNotification(data) {
        Notifications.scheduleNotificationAsync({
            content: {
                title: `${data.fromName}: `,
                body: data.msg,
                sound: true,
                color: '#006aee'
            },
            trigger: { seconds: 1 },
        });
    }

    // constants
    const counter = () => {
        if (props.counter > 0) return (<Text style={globalStyles.badgeNum}>{props.counter}</Text>)
    }

    // const typingUi = () => {
    //     if (isTyping) return <Text style={{
    //         color: '#006aee',
    //     }}>typing...</Text>

    //     else return <Text style={globalStyles.greyText} numberOfLines={1}>{props.content}</Text>
    // }

    const styles = StyleSheet.create({
        nameTime: {
            width: Dimensions.get('window').width - 120,
        },

        smallText: {
            fontSize: 11,
        },
    })

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#fff',
                paddingBottom: 8,
            }}
            onPress={() => { navigation.navigate('ChatPage', { roomData: props.data }) }}>
            <View style={globalStyles.userCard}>
                {/* <Image
                    style={globalStyles.userAvatar}
                    source={{ uri: 'https://i.pinimg.com/236x/af/1c/30/af1c30d6d881d9447dec06149f61d2f9--drawings-of-girls-anime-drawings-girl.jpg' }} /> */}

                <View style={[globalStyles.letterAvatar]}>
                    <Text style={globalStyles.letterAvatarText}>{props.name.split('')[0]}</Text>
                </View>

                <View>
                    <View style={[globalStyles.flexBetween, styles.nameTime]}>
                        <Text style={[globalStyles.userCardTitle, globalStyles.boldText]}>{props.name}</Text>
                        <View style={globalStyles.flex}>
                            {counter()}
                            <Text style={[globalStyles.greyText, styles.smallText]}>{props.data.lastMessageTimestamp}</Text>
                        </View>
                    </View>
                    {/* {typingUi()} */}
                    <Text style={[globalStyles.greyText, globalStyles.userCardDescription]} numberOfLines={1}>{props.content}</Text>
                </View>
            </View>

        </TouchableOpacity>

    )
}

const SearchPage = ({ navigation }) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.appBar}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}><Icon name='ios-arrow-back-outline' color='#006aee' size={22} /></TouchableOpacity>
                <TextInput autoFocus={true} style={[globalStyles.inputBox, globalStyles.searchInputBox]} placeholder='Search' />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen