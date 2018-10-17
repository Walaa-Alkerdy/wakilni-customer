import React, { Component } from 'react';
import { Platform, StatusBar, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Animated } from 'react-native';
import { STATE, ACTION_AUTH, ACTION_DATABASE, ACTION_USER } from '../../constants/states';
import Locals from '../../localization/local';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loaders, Alerts } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import * as validators from '../../utils/validators/userInfoValidators';
import Orientation from 'react-native-orientation';

const headerTitlePadding = (Platform.OS === "ios" ? 0 : Dimensions.get('screen').width / 1.5);
const headerIconWidth = (Platform.OS === "ios" ? '60%' : '35%');
const headerIconHeight = (Platform.OS === "ios" ? '60%' : '35%');
// const initialLayout = { height: 0, width: Dimensions.get('window').width };

export default class Login extends Component {

    static navigationOptions = {
        headerTitle: (
            <Image style={{ paddingLeft: headerTitlePadding, width: headerIconWidth, height: headerIconHeight, resizeMode: 'contain' }} source={require('../../images/common/wakilniLogoMain.png')} />
        ),
        drawerLockMode: 'locked-closed',
        headerLeft: (
            <View style={{ paddingHorizontal: 10 }}>
                {/* <BadgeButton badgeCount={4} position='bottomLeft' /> */}
                {/* <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")} >
              <Image source={require('../images/menuIcon.png')} style={{ resizeMode: 'stretch', height: 15, width: 30 }} />
          </TouchableOpacity> */}
            </View>
        ),
        headerRight: (
            <View style={{ paddingHorizontal: 10 }}>
                {/* <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/notificationIconMain.png')} buttonPressed={() => navigation.state.params.handleNotificationPress()} /> */}
            </View>
        )
    }

    constructor(props) {
        super(props);

        this.state = {


            currentPassword: '',//received from login page

            newPassword: '',
            newPasswordError: false,
            newPasswordErrorMessage: '',

            confirmPassword: '',
            confirmPasswordError: false,
            confirmPasswordErrorMessage: '',

            buttonDisabled: false,

            isAlertSuccess: null,
        };

        //for animation on error messages
        this.animated = new Animated.Value(0);

        this.changePasswordPressed = this.changePasswordPressed.bind(this);
    }

    componentDidMount() {
        Orientation.lockToPortrait();

        this.setState({ currentPassword: this.props.navigation.state.params.currentPassword })
    }

    animate() {
        this.animated.setValue(0);
        Animated.spring(this.animated, {
            toValue: 1,
            duration: 1500//in milliseconds
        }).start()
    }

    render() {
        // const scale = this.animated.interpolate({
        //   inputRange: [0, 1],
        //   outputRange: [0, 1]
        // })

        // const transform = [{ scale }];
        // var { navigate } = this.props.navigation;
        return (

            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: Colors.MAIN_COLOR }}>

                <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconMain.png')} />

                <KeyboardAwareScrollView
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    style={{ backgroundColor: 'transparent' }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'>

                    <View style={[styles.mainContainer, { backgroundColor: 'transparent', justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>

                        <View style={[styles.mainContainer, { backgroundColor: 'transparent', justifyContent: 'flex-start', backgroundColor: 'transparent' }]}>

                            <Text style={{ color: Colors.TEXT_COLOR, fontFamily: Fonts.MAIN_FONT, fontSize: 16, marginHorizontal: 20, marginVertical: 30 }}>{Locals.CHANGE_PASSWORD_PAGE_SUB_TITLE}</Text>

                            <View style={styles.titleContainer}>

                                {
                                    this.props.appState.lang == 'en' ?
                                        <View style={styles.titleContainer}>
                                            <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.CHANGE_PASSWORD_PAGE_PASSWORD}</Text>
                                            {
                                                this.state.newPasswordError ? <Text style={[styles.errorMessage, { marginTop: 30 }]}>{Locals.formatString(Locals.braces, this.state.newPasswordErrorMessage)}</Text> : null
                                            }
                                        </View>
                                        :
                                        <View style={styles.titleContainer}>
                                            {
                                                this.state.newPasswordError ? <Text style={[styles.errorMessage, { marginTop: 30 }]}>{Locals.formatString(Locals.braces, this.state.newPasswordErrorMessage)}</Text> : null
                                            }
                                            <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.CHANGE_PASSWORD_PAGE_PASSWORD}</Text>
                                        </View>
                                }

                            </View>
                            <TextInput
                                selectionColor={Colors.SUB_COLOR}
                                style={[styles.inputFields, this.state.newPasswordError ? styles.inputFieldsError : null]}
                                underlineColorAndroid={'transparent'}
                                returnKeyType={'done'}
                                secureTextEntry={true}
                                // placeholder={Locals.EMAIL_PLACEHOLDER}
                                // placeholderTextColor={Colors.TEXT_COLOR}
                                // placeholderStyle={styles.inputFieldsPlaceholder}
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={this.state.newPassword}
                                onChangeText={newPassword => {
                                    this.setState({ newPassword: newPassword });
                                }} />

                            <View style={styles.titleContainer}>

                                {
                                    this.props.appState.lang == 'en' ?
                                        <View style={styles.titleContainer}>
                                            <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.CHANGE_PASSWORD_PAGE_CONFIRM_PASSWORD}</Text>
                                            {
                                                this.state.confirmPasswordError ? <Text style={[styles.errorMessage, { marginTop: 30 }]}>{Locals.formatString(Locals.braces, this.state.confirmPasswordErrorMessage)}</Text> : null
                                            }
                                        </View>
                                        :
                                        <View style={styles.titleContainer}>
                                            {
                                                this.state.confirmPasswordError ? <Text style={[styles.errorMessage, { marginTop: 30 }]}>{Locals.formatString(Locals.braces, this.state.confirmPasswordErrorMessage)}</Text> : null
                                            }
                                            <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.CHANGE_PASSWORD_PAGE_CONFIRM_PASSWORD}</Text>
                                        </View>
                                }

                            </View>
                            <TextInput
                                selectionColor={Colors.SUB_COLOR}
                                style={[styles.inputFields, this.state.confirmPasswordError ? styles.inputFieldsError : null]}
                                underlineColorAndroid={'transparent'}
                                returnKeyType={'done'}
                                secureTextEntry={true}
                                // placeholder={Locals.EMAIL_PLACEHOLDER}
                                // placeholderTextColor={Colors.TEXT_COLOR}
                                // placeholderStyle={styles.inputFieldsPlaceholder}
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={this.state.confirmPassword}
                                onChangeText={confirmPassword => {
                                    this.setState({ confirmPassword: confirmPassword });
                                }} />

                        </View>
                        <TouchableOpacity style={[styles.button, { marginBottom: 30 }]} disabled={this.state.buttonDisabled} onPress={() => {
                            this.setState({ buttonDisabled: true }, () => {
                                this.changePasswordPressed()
                            })
                            // enable after 2 second
                            setTimeout(() => {
                                this.setState({ buttonDisabled: false });
                            }, 2000)
                        }}>
                            <Text style={styles.buttonText}>
                                {Locals.CHANGE_PASSWORD_PAGE_BUTTON}
                            </Text>
                        </TouchableOpacity>
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

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_USER.CHANGE_PASSWORD) {

            this.props.resetState();
            this.setState({ isAlertSuccess: true })
            this.SBAlert.showAlert(newProps.appState.successMessage, false)

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_USER.CHANGE_PASSWORD) {

            this.props.resetState();
            this.setState({ isAlertSuccess: false })
            this.SBAlert.showAlert(newProps.appState.errorMessage, true)
        }
    }

    dismissAlertMessage() {

        if (this.state.isAlertSuccess) {
            this.props.navigation.navigate("MainPageContainer");
        } else {
            this.SBAlert.dimissAlert()
        }

        this.setState({ isAlertSuccess: null })
    }

    isInputValid() {
        var newPasswordValid = true, confirmPasswordValid = true;
        var newPasswordError = '', confirmPasswordError = '';

        if (!validators.isEmpty(this.state.newPassword)) {
            if (!validators.isPasswordValid(this.state.newPassword)) {
                newPasswordValid = false;
                newPasswordError = Locals.error_password_not_valid;
            }
        } else {
            newPasswordValid = false;
            newPasswordError = Locals.error_password_empty;
        }

        if (!validators.isEmpty(this.state.confirmPassword)) {
            if (!validators.isPasswordValid(this.state.confirmPassword)) {
                confirmPasswordValid = false;
                confirmPasswordError = Locals.error_password_not_valid;
            }
        } else {
            confirmPasswordValid = false;
            confirmPasswordError = Locals.error_password_empty;
        }

        if (this.state.newPassword != this.state.confirmPassword && !validators.isEmpty(this.state.newPassword)) {
            newPasswordValid = false;
            newPasswordError = Locals.error_password_dont_match;
            confirmPasswordValid = false;
            confirmPasswordError = Locals.error_password_dont_match;
        }

        this.setState({ newPasswordError: !newPasswordValid, newPasswordErrorMessage: newPasswordError, confirmPasswordError: !confirmPasswordValid, confirmPasswordErrorMessage: confirmPasswordError }, () => {
            this.animate()
        });
        return (newPasswordValid && confirmPasswordValid);
    }

    changePasswordPressed() {

        if (this.isInputValid()) {
            let values = {
                currentPassword: this.state.currentPassword,
                password: this.state.newPassword
            }

            this.props.changePassword(this.props.appState.user.tokenData.accessToken, values)
        }
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
        marginBottom: 25,
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
        width: Dimensions.get('screen').width - 120,
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