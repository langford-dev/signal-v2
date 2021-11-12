import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor: 'rgb(235,235,240)',
    },

    textAlignCenter: { textAlign: 'center' },

    appBarAlertUI: {
        backgroundColor: '#006aee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

        position: 'absolute',
        top: Platform.OS === 'ios' ? 103 : 90,
        width: '100%',
        zIndex: 10
    },

    lineHeight: {
        lineHeight: 25
    },

    mdtext: {
        fontSize: 23,
        fontWeight: 'bold',
    },

    lgText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    whiteText: {
        color: '#fff'
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

    flexBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    touchableTextUI: {
        padding: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f177',
        backgroundColor: '#fff'
    },

    touchableTextUIText: {
        // fontSize: 17,
    },

    e2eLabelContainer: {
        // backgroundColor: '#f1f1f155',
        padding: 10,
        marginBottom: 20,
    },

    e2eLabel: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',

        backgroundColor: '#24242499',
        paddingHorizontal: 20,
        paddingVertical: 7,
        color: '#fff'
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

    greyText: { color: 'rgb(99,99,102)' },

    boldText: { fontWeight: 'bold' },

    textBtn: {
        color: '#006aee',
    },

    space3: {
        height: 3,
        width: 3
    },

    space5: {
        height: 5,
        width: 5
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

    avatarMD: {
        backgroundColor: '#f1f1f1',
        width: 100,
        height: 100,
        borderRadius: 100,
    },

    userCard: {
        // padding: 15,
        // paddingVertical: 6,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomColor: '#f1f1f144',
        // borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 0,
        marginBottom: 0,
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
        bottom: 30,
        right: 20,
        borderRadius: 100,
        width: 60,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 2,
        zIndex: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    badgeNum: {
        backgroundColor: '#006aee',
        color: '#fff',
        paddingHorizontal: 7,
        fontSize: 11,
        paddingVertical: 3,
        borderRadius: 100,
        marginRight: 10,
    },

    shadow: {
        shadowColor: '#00000055',
        shadowOpacity: 1,
        shadowRadius: 10,
    },

    appBar: {
        // height: 60,
        // paddingHorizontal: 20,
        // // borderBottomColor: '#eee',
        // // borderBottomWidth: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // backgroundColor: '#fff'
        // marginBottom: 20

        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 20,
        paddingBottom: 15,
    },

    appBarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },

    appBarAvatar: {
        width: 40,
        height: 40,
        backgroundColor: '#f1f1f1',
        borderRadius: 100
    },

    homeTabsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#fff'
    },

    homeTabItem: {},

    letterAvatar: {
        width: 45,
        height: 45,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 100,
        marginRight: 20,

        backgroundColor: '#FF666622'
    },

    letterAvatarLg: {
        width: 60,
        height: 60,
        marginRight: 10
    },

    letterAvatarText: {
        // fontWeight: 'bold',
        // color: '#006aee55',
        color: '#00000055',
        fontSize: 20
    },

    loader: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },

    smallText: {
        fontSize: 11,
        color: '#24242466'
    },

    inputBoxIcon: {
        // borderColor: '#f1f1f1',
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingLeft: 8,
        // width: '80%'
        flex: 1,
        paddingVertical: 9,
        alignItems: 'baseline',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    inputBoxIconInput: {
        width: '250%',
        fontSize: 16,
        // flex: 2,
        marginLeft: 5,
        padding: 0,
        // backgroundColor: 'red',
        height: '100%',
        overflow: 'scroll'
        // paddingRight: 20,
        // marginTop: Platform.OS === 'ios' ? 4 : 0,
        // backgroundColor: 'red'
    },

    messageBubble: {
        maxWidth: 300,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 0,

        borderBottomLeftRadius: 0,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    myEmojiBubble: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginLeft: 0
    },

    emojiText: {
        fontSize: 80,
        lineHeight: 100
    },

    messageText: {
        color: '#000',
        lineHeight: 20,
        fontSize: 16,
    },

    myMessageBubble: {
        backgroundColor: '#006aee',
        alignSelf: 'flex-end',
        marginRight: 10,
        marginLeft: 0,

        borderRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0,
    },

    myMessageText: {
        color: '#fff',
    },

    myTimestamp: {
        color: '#ffffff77',
    },

    bigPadding: {
        paddingTop: 100,
        paddingHorizontal: 30
    }
})

export default globalStyles