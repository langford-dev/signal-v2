import React, { Component } from 'react'
import { StatusBar, StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight + 10
    },

    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    flexCenterColumn: {
        alignItems: 'center',
        flexDirection: 'column'
    },

    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    e2eLabelContainer: {
        // backgroundColor: '#f1f1f111',
        padding: 10,
        marginBottom: 20,
    },

    e2eLabel: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        // paddingHorizontal: 20,
        // width: 'auto',
        // marginBottom: 20,
        // marginTop: 20,
    },

    bottomSheet: {
        borderRadius: 15,
        paddingTop: 10,
    },

    inputBox: {
        backgroundColor: '#f1f1f1',
        height: 45,
        margin: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
    },

    searchInputBox: {
        width: '90%'
    },

    greyText: { color: '#999' },

    boldText: { fontWeight: 'bold' },

    textBtn: {
        color: '#006aee',
    },

    space10: {
        height: 10,
        width: 10
    },

    space20: {
        height: 20,
        width: 20
    },

    space30: {
        height: 30,
        width: 30
    },

    userCard: {
        padding: 15,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },

    userAvatar: {
        backgroundColor: '#f1f1f1',
        width: 60,
        height: 60,
        borderRadius: 100,
        marginRight: 15
    },

    userCardTitle: {
        marginBottom: 3,
    },

    bottomSheetItem: {
        padding: 20,
    },

    fab: {
        backgroundColor: '#006aee',
        position: 'absolute',
        bottom: 50,
        right: 20,
        borderRadius: 100,
        width: 60,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 2,
        zIndex: 100
    },

    appBar: {
        height: 60,
        paddingHorizontal: 20,
        // borderBottomColor: '#eee',
        // borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },

    appBarTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 20,
    },

    appBarAvatar: {
        width: 40,
        height: 40,
        backgroundColor: '#f1f1f1',
        borderRadius: 100
    },
})

export default globalStyles