import React, { createRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ActionSheet from "react-native-actions-sheet";
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../styles/globalStyles';
import storage from '../storage/storage';
import ContactsPage from './ContactsPage';
import io from "socket.io-client";
import * as Notifications from "expo-notifications";

// const socket = io('http://localhost:8000')
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
    // const [mounted, setMounted] = useState(true)

    React.useEffect(() => {
        navigation.addListener('focus', async () => {
            // do something
            console.log('isFocused')

            await storage.load({ key: 'chatrooms' })
                .then(data => {
                    setRooms(data);

                    if (data.length > 0) setHasRooms(true)
                    else setHasRooms(false)
                }).catch(e => { console.log(e); setHasRooms(false) })
            return;
        });

        return () => {
            // socket.offAny();
            console.log('is not isFocused');
        }
    }, [navigation]);

    // useEffect(async () => {
    //     console.log('home mounted....');

    //     await storage.load({ key: 'chatrooms' })
    //         .then(data => {
    //             setRooms(data);

    //             if (data.length > 0) setHasRooms(true)
    //             else setHasRooms(false)
    //         }).catch(e => { console.log(e); setHasRooms(false) })

    //     return () => {
    //         console.log('unmounted')
    //         // setMounted(false)
    //     }
    // }, [])

    const hasRoomsLabel = () => {
        if (!hasRooms) return <View style={globalStyles.flexCenterColumn}>
            <View style={globalStyles.space30}></View>
            <Text style={globalStyles.boldText}>No chats yet</Text>
            <Text style={globalStyles.boldText}>Get started by messaging a friend</Text>
        </View>
    }

    return (
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

            <ScrollView style={{
                backgroundColor: '#fff',

                // backgroundColor: 'red',
                paddingTop: 20,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
            }}>
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