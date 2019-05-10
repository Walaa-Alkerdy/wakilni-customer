import React, { Component } from 'react';
import { Platform, StatusBar, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Animated, Keyboard, ScrollView, Alert, PermissionsAndroid } from 'react-native';
// import FCM, { FCMEvent } from 'react-native-fcm';
import { STATE, ACTION_AUTH, ACTION_DATABASE, ACTION_CONSTANTS } from '../../constants/states';
import Locals from '../../localization/local';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loaders, Alerts, Buttons, Pickers } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import * as validators from '../../utils/validators/userInfoValidators';
import Orientation from 'react-native-orientation';
import * as ServerStatus from '../../constants/server_states';

const headerTitlePadding = (Platform.OS === "ios" ? 0 : Dimensions.get('screen').width / 1.5);
const headerIconWidth = (Platform.OS === "ios" ? '60%' : '35%');
const headerIconHeight = (Platform.OS === "ios" ? '60%' : '35%');
const initialLayout = { height: 0, width: Dimensions.get('window').width };

export default class Registration extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <Image style={{ paddingLeft: headerTitlePadding, width: headerIconWidth, height: headerIconHeight, resizeMode: 'contain' }} source={require('../../images/common/wakilniLogoMain.png')} />
        ),
        drawerLockMode: 'locked-closed',
        headerLeft: (
            <View style={{ paddingHorizontal: 12 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View>
                            <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />
                        </View>
                        :
                        <View>
                        </View>
                }
            </View>
        ),
        headerRight: (
            <View style={{ paddingHorizontal: 12, paddingTop: 5 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View>
                        </View>
                        :
                        <View>
                            <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />
                        </View>
                }
            </View>
        )
    });

    constructor(props) {
        super(props);

        this.state = {

        };

        this.registerPressed = this.registerPressed.bind(this);
    }

    componentDidMount() {
        Orientation.lockToPortrait();

        this.props.getAreas()
        this.props.getConstantsList()
    }

    render() {
        // const scale = this.animated.interpolate({
        //   inputRange: [0, 1],
        //   outputRange: [0, 1]
        // })

        // const transform = [{ scale }];
        // var { navigate } = this.props.navigation;
        return (

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>

                <KeyboardAwareScrollView
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    style={{ backgroundColor: Colors.MAIN_COLOR }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'>

                    <View style={[styles.mainContainer, { justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>

                        <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconMain.png')} />

                        <View style={[styles.mainContainer, { justifyContent: 'flex-start', backgroundColor: 'transparent' }]}>

                        </View>
                    </View>
                </KeyboardAwareScrollView>

                {
                    this.props.appState.state == STATE.LOADING ? <Loaders.Loader /> : null
                }

                <Alerts.SingleButtonAlert
                    ref={SBAlert => this.SBAlert = SBAlert}
                    language={this.props.appState.lang}
                    dismissAlert={this.dismissAlertMessage.bind(this)}
                />

            </View>

        );
    }

    componentWillReceiveProps(newProps) {

        console.log(newProps)

        // if (newProps.appState.user && newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CONSTANTS.GET_AREAS) {

        //     this.props.resetState();

        // } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CONSTANTS.GET_AREAS) {

        //     this.SBAlert.showAlert(newProps.appState.errorMessage, true)
        // }

        // if (newProps.appState.user && newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CONSTANTS.GET_CONSTANTS) {

        //     this.props.resetState();

        // } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CONSTANTS.GET_CONSTANTS) {

        //     this.SBAlert.showAlert(newProps.appState.errorMessage, true)
        // }
    }

    dismissAlertMessage() {
        this.SBAlert.dimissAlert()
    }

    registerPressed() {

        if (this.isInputValid()) {

            let values = {

            }

            // this.props.createCustomer(values)
        }
    }

    isInputValid() {
        // var emailValid = true, passwordValid = true, phoneValid = true;
        // var emailError = '', passwordError = '', phoneError = '';
        // if (!validators.isEmpty(this.state.email)) {
        //   if (!validators.isEmailValid(this.state.email)) {
        //     emailValid = false;
        //     emailError = Locals.error_email_not_valid
        //   }
        // } else {
        //   emailValid = false;
        //   emailError = Locals.error_email_empty
        // }

        // // if (validators.isEmpty(this.state.phone)) {
        // //   phoneValid = false;
        // //   phoneError = Locals.error_phone_empty;
        // // }

        // if (!validators.isEmpty(this.state.password)) {
        //   if (!validators.isPasswordValid(this.state.password)) {
        //     passwordValid = false;
        //     passwordError = Locals.error_password_not_valid;
        //   }
        // } else {
        //   passwordValid = false;
        //   passwordError = Locals.error_password_empty;
        // }

        // this.setState({ passwordError: !passwordValid, passwordErrorMessage: passwordError, emailError: !emailValid, emailErrorMessage: emailError }, () => {
        //   this.animate()
        // });
        // return (emailValid && passwordValid);
    }

    signUpPressed() {

        // Alert.alert("Sign Up Pressed");
        // var newUser = Users("Ahmad","ahmad@pixel38.com");
        // navData("SignUpPage");
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
        backgroundColor: Colors.MAIN_COLOR,
    },
    tabContainerStyle: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.NAVIGATION_BAR_COLOR,
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
        color: Colors.TEXT_COLOR,
        fontFamily: Fonts.MAIN_FONT,
        marginBottom: 5
    },
    inputFields: {
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 11,
        backgroundColor: '#4c4c4c',
        width: Dimensions.get('screen').width - 120,
        borderRadius: 10,
        // paddingLeft: 15,
        paddingVertical: 0,
        marginBottom: Dimensions.get('screen').height / 13,
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
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.SUB_COLOR,
        flex: 2,
        // width: Dimensions.get('screen').width - 120,
        height: 45,
        marginVertical: 5,
        borderRadius: 11,
    },
    buttonText: {
        fontSize: 11.5,
        fontFamily: Fonts.MAIN_FONT,
        color: Colors.SUB_COLOR,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    radioButtonMainView: {
        width: Dimensions.get('screen').width / 1.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Dimensions.get('screen').height / 13
    },
    radioButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    motoIconStyle: {
        position: 'absolute',
        resizeMode: 'contain',
        width: Dimensions.get('screen').width / 2 + 60,
        height: Dimensions.get('screen').width / 2 + 67,
        right: -67,
        bottom: 0,
        overflow: 'hidden'
    }
});