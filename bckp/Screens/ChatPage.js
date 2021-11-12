import React, { useEffect, useRef, useState, createRef } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, StatusBar, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import io from "socket.io-client";
import storage from '../storage/storage';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from "react-native-actions-sheet";
import axios from 'axios';


const socket = io('http://localhost:8000')
// const socket = io('https://signal-v2-server.herokuapp.com/')


const ChatPage = ({ navigation, route }) => {
    const actionSheetRef = createRef();
    const [messageText, setMessageText] = useState()
    const [showSendBtn, setShowSendBtn] = useState(false)
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isMounted, setIsMounted] = useState(true)
    const scrollViewRef = useRef();


    useEffect(() => {
        console.log('mounted');
        getSavedMessages()
        setTimeout(() => { listenForMessages(messages) }, 100);

        // socket.on('receive-message', (msg) => {
        //     // console.log('receive-message...', messages);

        //     for (let messageItem = 0; messageItem < messages.length; messageItem++) {
        //         const element = messages[messageItem];

        //         if (element.msgId === msg.msgId) console.log('element', messages.length);

        //     }
        // })

        return () => {
            console.log('unmounted')
            setIsMounted(false)
        };
    }, []);

    async function getSavedMessages() {
        console.log('getting saved messages...');

        try {
            await storage.load({ key: 'testRoom4' }).then(async (data) => {
                // setMessages(data)
                // console.log('storage.load', data);
                await getUnreadMessages(data)
                setTimeout(() => { listenForMessages(data) }, 500);
            })
        } catch (error) {
            getUnreadMessages([])
            console.log(error);
        }
    }

    // function objectToString(data) {
    //     let mainArray = []
    //     console.log(data);

    //     for (let item = 0; item < data.length; item++) {
    //         const element = data[item];
    //         mainArray.push(JSON.stringify(element))
    //     }

    //     return mainArray;
    // }

    async function getUnreadMessages(data) {
        console.log('getUnreadMessages.....', data);





        // console.log('getting unread from api..');
        // const chats = data
        // const unreadFromApi = []

        // const response = await axios.post('http://localhost:8000/chats/get-unread', { roomId: 'testRoom4' })
        // const responseMessages = response.data.messages
        // console.log(responseMessages.length);

        // if (responseMessages.length > 0) {
        //     for (let messageFromApi = 0; messageFromApi < responseMessages.length; messageFromApi++) {
        //         const element = responseMessages[messageFromApi];
        //         // if (data.indexOf(element) != -1) chats.push(element)
        //         chats.push(element)
        //         unreadFromApi.push(element)
        //     }

        //     setMessages(chats)
        //     await storage.save({
        //         key: 'testRoom4',
        //         data: chats
        //     })

        //     deleteFromDatabase(unreadFromApi)
        //     return;
        // } else {
        //     console.log('less than 1...', data);
        //     setMessages(data)
        // }
    }

    function deleteFromDatabase(data) {
        axios.post('http://localhost:8000/chats/delete-from-db', data)
    }

    function scrollToBottom() {
        // scrollViewRef.current.scrollToEnd()
    }

    function listenForMessages(data) {
        console.log('listenning for new messages...');
        scrollToBottom()

        socket.on('send-message', async (msg) => {
            console.log('got new message...', msg);
            scrollToBottom()

            const messagesFromPeer = data
            messagesFromPeer.push(msg)
            setMessages(messagesFromPeer)

            socket.emit('receive-message', JSON.stringify(msg))

            await storage.save({
                key: 'testRoom4',
                data: messagesFromPeer
            })
        })
    }

    let typingUI = () => {
        if (isTyping) return <Text style={styles.smallText}>✍️ typing...</Text>
        else return <View></View>
    };

    socket.on('typing', () => {
        setIsTyping(true)
        setTimeout(() => { setIsTyping(false) }, 3000);
    })

    function handleTextInput(value) {
        setMessageText(value);
        socket.emit('user-typing')

        if (value.trim() != '') setShowSendBtn(true)
        else setShowSendBtn(false)
    }

    const sendBtn = () => {
        if (showSendBtn) {
            return <TouchableOpacity onPress={() => sendMessage()}>
                <Text style={[globalStyles.textBtn, styles.textBtn]}>Send</Text>
            </TouchableOpacity>
        }
    }

    async function sendMessage() {
        const messageId = Date.now() + Math.random(10000).toFixed(0)
        const newMsgObject = {
            'from': 'anon',
            'to': 'langford',
            'msg': messageText, 
            'timestamp': Date().substr(16, 8),
            'sent': false,
            'msgId': messageId,
            'roomId': 'testRoom4'
        }

        const allMessages = messages
        allMessages.push({
            'from': 'langford',
            'to': 'anon',
            'msg': messageText,
            'timestamp': Date().substr(16, 8),
            'sent': true,
            'msgId': messageId,
            'roomId': 'testRoom4'
        })

        setMessages(allMessages)
        setMessageText('');
        scrollToBottom()
        await storage.save({
            key: 'testRoom4',
            data: allMessages
        })

        socket.emit('send-message', JSON.stringify(newMsgObject))

        // setTimeout(() => {
        //     socket.emit('send-message', JSON.stringify(newMsgObject))
        // }, 1000);
    }

    function isEmoji(str) {
        const ranges = [
            '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
        ];

        if (str.length === 2) {
            if (str.match(ranges.join('|'))) {
                return true;
            } else {
                return false;
            }
        }
    }

    function MessageItemUi(msgData) {
        if (isEmoji(msgData.msg) && msgData.from != 'langford')
            return <View style={styles.myMessageItem}>
                <Text style={[styles.emojiOnly]}>{msgData.msg}</Text>
                <Text style={[styles.smallText, styles.timestamp]}>{msgData.timestamp}</Text>
            </View>

        if (isEmoji(msgData.msg) && msgData.from == 'langford')
            return <View style={styles.messageItem}>
                <Text style={[styles.myMessage, styles.emojiOnly,]}>{msgData.msg}</Text>
                <Text style={[styles.smallText, styles.myTimestamp, globalStyles.greyText]}>{msgData.timestamp}</Text>
            </View>

        if (msgData.from == 'langford') return <View style={[styles.messageItem, styles.myMessageItem]}>
            <Text style={[styles.messageText, styles.myMessage]}>{msgData.msg}</Text>
            <Text style={[styles.smallText, styles.myTimestamp]}>{msgData.timestamp}</Text>
        </View>

        else return <View style={styles.messageItem}>
            <Text style={styles.messageText}>{msgData.msg}</Text>
            <Text style={[styles.smallText, styles.timestamp]}>{msgData.timestamp}</Text>
        </View>
    }

    async function clearChat(navigation) {
        await storage.remove({
            key: 'testRoom4'
        });
        setMessages([])
        navigation.goBack()
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.appBar, styles.appBar]}>
                <View style={globalStyles.flex}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}><Icon name='ios-arrow-back-outline' color='#006aee' size={25} /></TouchableOpacity>
                    <View style={globalStyles.space20}></View>
                    <View style={[globalStyles.appBarAvatar, styles.chatPageAvatar]}></View>
                    <View style={globalStyles.space10}></View>
                    <View>
                        <Text style={styles.roomName}>Elon 🤓</Text>
                        {typingUI()}
                    </View>
                </View>

                <TouchableOpacity onPress={() => { actionSheetRef.current?.setModalVisible(); }}>
                    <Icon name='ios-ellipsis-horizontal' color='#006aee' size={25} />
                </TouchableOpacity>
            </View>

            <View style={styles.textInputContainer}>
                <TextInput style={globalStyles.inputBox, styles.inputBox}
                    multiline={true}
                    maxLength={300}
                    placeholder='Type a message...'
                    value={messageText}
                    onChangeText={(value) => handleTextInput(value)}
                />

                {sendBtn()}
            </View>

            <ScrollView ref={scrollViewRef} style={styles.messagesContainer}>
                <TouchableOpacity
                    onPress={() => alert('Your conversation is relayed over a secured peer to peer connection. This means your messages stay between you and the people you choose')}
                    style={[globalStyles.flexCenter, globalStyles.e2eLabelContainer]}>
                    <Text style={globalStyles.e2eLabel}>Your chat is end-to-end encrypted</Text>
                </TouchableOpacity>

                {
                    messages.map(
                        (msg, index) => {
                            return <View key={index}>{MessageItemUi(msg)}</View>
                        }
                    )
                }
            </ScrollView>

            <ActionSheet
                gestureEnabled={true}
                bounceOnOpen={true}
                openAnimationSpeed={10}
                bounciness={5}
                defaultOverlayOpacity={0.1}
                ref={actionSheetRef}
                containerStyle={globalStyles.bottomSheet}
                indicatorColor={'#ccc'}>

                <View>
                    <TouchableOpacity onPress={() => clearChat(navigation)} style={globalStyles.bottomSheetItem}><Text>Clear chats</Text></TouchableOpacity>
                    <TouchableOpacity style={globalStyles.bottomSheetItem}><Text>View profile</Text></TouchableOpacity>
                    <TouchableOpacity style={globalStyles.bottomSheetItem}><Text>Video call</Text></TouchableOpacity>
                    <TouchableOpacity style={globalStyles.bottomSheetItem}><Text>Voice call</Text></TouchableOpacity>
                </View>
            </ActionSheet>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    appBar: {
        borderBottomColor: '#24242411',
        borderBottomWidth: 1,
        backgroundColor: '#f1f1f1',
        height: 'auto',
        paddingBottom: 10,
        marginTop: -50,
        paddingTop: StatusBar.currentHeight + 40
    },

    chatPageAvatar: {
        backgroundColor: '#fff',
    },

    roomName: {
        fontSize: 22,
    },

    textInputContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        zIndex: 100,
    },

    inputBox: {
        borderWidth: 1,
        borderColor: '#f1f1f1',
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        flex: 1,
    },

    textBtn: {
        marginLeft: 10
    },

    messagesContainer: {
        marginBottom: 50,
    },

    messageText: {
        borderRadius: 20,
        lineHeight: 20,
        borderWidth: 1,
        borderColor: '#cccccc55',
        maxWidth: 300,
        padding: 15,
        paddingHorizontal: 30,
        paddingLeft: 15,
        paddingBottom: 30,
        // marginBottom: 10,
        position: 'relative',
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginRight: 10,
        marginLeft: 13,
    },

    emojiOnly: {
        backgroundColor: 'transparent',
        padding: 0,
        fontSize: 65,
        marginTop: 0,
        paddingTop: 20,
        borderWidth: 0,
        marginBottom: 40,
        marginLeft: 12,
    },

    emojiOnlyItem: {
        height: 60,
        padding: 0,
    },

    myMessage: {
        backgroundColor: '#006aee',
        color: '#fff',
        alignSelf: 'flex-end',
        paddingRight: 15,
        paddingLeft: 30,
    },

    timestamp: {
        position: 'absolute',
        left: 25,
        bottom: 25,
    },

    myTimestamp: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        color: '#fff'
    },

    myMessageItem: {
        // alignSelf: 'flex-end',
        width: '100%',
        position: 'relative',
        marginBottom: 10,
    },

    smallText: {
        fontSize: 11,
        color: '#24242466'
    },
})

export default ChatPage