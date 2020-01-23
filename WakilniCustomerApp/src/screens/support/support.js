import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, Linking } from 'react-native';
import Locals from '../../localization/local';
import { Alerts, Buttons, BadgeButton, NotificationPopUp } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import Orientation from 'react-native-orientation';

export default class Support extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', width: '100%', textAlign: 'center' }}>{Locals.SUPPORT}</Text>
        ),
        drawerLockMode: 'locked-closed',
        headerLeft: (

            <View style={{ paddingHorizontal: 12 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View>
                            <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />
                        </View>
                        :
                        <View>
                            <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/common/notificationIconMain.png')} buttonPressed={() => {
                                if (navigation
                                    && navigation.state
                                    && navigation.state.params
                                    && navigation.state.params.handleNotificationPress) {
                                    navigation.state.params.handleNotificationPress()
                                }
                            }} />
                        </View>
                }
            </View>
        ),
        headerRight: (
            <View style={{ paddingHorizontal: 12, paddingTop: 5 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View>
                            <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/common/notificationIconMain.png')} buttonPressed={() => {
                                if (navigation
                                    && navigation.state
                                    && navigation.state.params
                                    && navigation.state.params.handleNotificationPress) {
                                    navigation.state.params.handleNotificationPress()
                                }
                            }} />
                        </View>
                        :
                        <View>
                            <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />
                        </View>
                }
            </View>
        )
    });

    constructor(props) {
        super(props);
        //for animation on error messages
        this.animated = new Animated.Value(0);
    }

    goToNotifications() {

        this.props.navigation.navigate("NotificationsPageContainer");
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    animate() {
        this.animated.setValue(0);
        Animated.spring(this.animated, {
            toValue: 1,
            duration: 1500//in milliseconds
        }).start()
    }

    openLink = (link) => {
        Linking.canOpenURL(link).then(() => {
            Linking.openURL(link);
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', padding: 8 }}>
                <View style={{ elevation: 2, backgroundColor: 'white', padding: 16, borderRadius: 15, borderColor: '#EAEAEA', borderWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: Colors.SUB_COLOR }}>{Locals.EMAIL_PLACEHOLDER}</Text>
                    <TouchableOpacity onPress={() => {
                        this.openLink('mailto:frontdesk@wakilni.com')
                    }}>
                        <Text style={{ marginTop: 8, color: '#2B60DE' }}>
                            {'frontdesk@wakilni.com'}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', alignSelf: 'center', height: 1, backgroundColor: '#EAEAEA', marginTop: 16, marginBottom: 16 }}></View>
                    <Text style={{ fontWeight: 'bold', color: Colors.SUB_COLOR }}>{Locals.PROFILE_PAGE_PHONE}</Text>
                    <TouchableOpacity onPress={() => {
                        this.openLink('tel:009611241102')
                    }}>
                        <Text style={{ marginTop: 8, color: '#2B60DE' }}>
                            +961 (1) 241 102
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.openLink('tel:0096176766115')
                    }}>
                        <Text style={{ marginTop: 8, color: '#2B60DE' }}>
                            +961 (76) 766 115
                    </Text>
                    </TouchableOpacity>
                </View>

                <Alerts.SingleButtonAlert
                    ref={SBAlert => this.SBAlert = SBAlert}
                    language={this.props.appState.lang}
                    dismissAlert={this.dismissAlertMessage.bind(this)}
                />
                <NotificationPopUp ref={notification => this.notification = notification} />
            </View>

        );

    }


    dismissAlertMessage() {
        this.SBAlert.dimissAlert()
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        // padding: 40,
        // justifyContent: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    tabContainerStyle: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabStyle: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor: Colors.NAVIGATION_BAR_COLOR,
        //   // alignItems: 'center'
    },
    indicatorStyle: {
        backgroundColor: Colors.SUB_COLOR,
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: '80%',
    },
    tabLabelStyle: {
        textAlign: 'center',
        color: Colors.SUB_COLOR,
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 13,
    },
    textFieldLabel: {
        color: '#919191',
        fontFamily: Fonts.MAIN_FONT,
        marginBottom: 5
    },
    inputFields: {
        color: '#a1a1a1',
        textAlign: 'center',
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width - 90,
        borderRadius: 5,
        // paddingLeft: 15,
        paddingVertical: 0,
        marginBottom: 30,
        height: 40,
    },
    inputFieldsError: {
        borderColor: Colors.BADGE_COLOR,
        borderWidth: 1
    },
    errorMessage: {
        color: Colors.BADGE_COLOR,
        fontFamily: Fonts.MAIN_FONT,
        // fontSize: 11,
        // marginTop: 10,
        marginBottom: 5,
        marginLeft: 5
    },
    button: {
        backgroundColor: Colors.SUB_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        // width: Dimensions.get('screen').width - 90,
        height: 45,
        marginVertical: 5,
        borderRadius: 11,
        shadowColor: Colors.SUB_COLOR,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 1,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff',
        textAlign: 'center',
        marginHorizontal: 10,
    },
    motoIconStyle: {
        position: 'absolute',
        resizeMode: 'contain',
        width: Dimensions.get('screen').width / 2 + 60,
        height: Dimensions.get('screen').width / 2 + 67,
        right: -67,
        bottom: 0,
        overflow: 'hidden'
    },
    radioButtonMainView: {
        width: Dimensions.get('screen').width - 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    radioButtonView: {
        // marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 140
    },
    dateButtons: {
        backgroundColor: '#ffffff',
        height: 45,
        justifyContent: 'center',
        width: Dimensions.get('screen').width - 90,
        borderRadius: 5,
        marginBottom: 30,
    },
});