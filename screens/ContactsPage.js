import React, { useState, useEffect } from 'react'
import { ScrollView, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Image, Text, } from 'react-native'
import * as Contacts from 'expo-contacts';
import globalStyles from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import ChatPage from './ChatPage';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({ fields: [Contacts.PHONE_NUMBERS] });

                if (data.length > 0) {
                    const newContactsList = []

                    for (let contactInfo = 0; contactInfo < data.length; contactInfo++) {
                        const element = data[contactInfo];
                        if (typeof element.phoneNumbers !== 'undefined') newContactsList.push(element)
                    }

                    setContacts(newContactsList);
                    setLoading(false)
                }
            }
        })();
    }, []);

    const loader = () => {
        if (loading) return (
            <View style={[globalStyles.loader, globalStyles.flexCenterColumn]}>
                <ActivityIndicator size={50} color="#006aee" />
                {/* <View style={globalStyles.space20}></View> */}
                {/* <Text style={globalStyles.smallText}>Fetching your contact list</Text> */}
            </View>
        )
    }


    return (
        <View>
            <View style={globalStyles.appBar}>
                <View style={globalStyles.flex}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name='ios-arrow-back-outline' color='#006aee' size={25} />
                    </TouchableOpacity>
                    <Text style={globalStyles.appBarTitle}>New Message</Text>
                </View>
                <View style={globalStyles.flex}>
                    <TouchableOpacity onPress={() => { navigation.navigate(SearchPage) }}>
                        <Icon name='ellipsis-vertical-outline' color='#006aee' size={23} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ marginBottom: 20 }}>
                {loader()}
                {
                    contacts.map(
                        (contact, index) => {
                            return <TouchableOpacity key={index}
                                style={{ backgroundColor: '#fff', paddingBottom: 8, }}
                                onPress={() => {
                                    navigation.navigate('ChatPage', {
                                        roomData: {
                                            roomName: contact.name,
                                            roomNumber: contact.phoneNumbers[0].number
                                        }
                                    })
                                }}>
                                <View style={globalStyles.userCard}>
                                    <View style={globalStyles.letterAvatar}>
                                        <Text style={globalStyles.letterAvatarText}>{contact.name.split('')[0]}</Text>
                                    </View>

                                    <View>
                                        <Text style={[globalStyles.userCardTitle, globalStyles.boldText]}>{contact.name}</Text>
                                        <Text style={[globalStyles.greyText, globalStyles.smallText]}>{contact.phoneNumbers[0].number}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    )
                }
            </ScrollView>
        </View>
    )
}

export default ContactsPage