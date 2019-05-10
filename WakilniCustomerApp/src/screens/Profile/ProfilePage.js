import React, { Component } from 'react';
import { Platform, StatusBar, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Animated, Keyboard, ScrollView, Alert } from 'react-native';
import { STATE, ACTION_AUTH, ACTION_DATABASE, ACTION_DRIVER, ACTION_USER } from '../../constants/states';
import Locals from '../../localization/local';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loaders, Alerts, Buttons, MyStatusBar, RadioButton, GesturePassword, BadgeButton, NotificationPopUp } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import * as validators from '../../utils/validators/userInfoValidators';
import Orientation from 'react-native-orientation';
import { NavigationActions } from 'react-navigation';
import * as ServerStatus from '../../constants/server_states';

const headerTitlePadding = (Platform.OS === "ios" ? 0 : Dimensions.get('screen').width / 1.5);
const headerIconWidth = (Platform.OS === "ios" ? '60%' : '35%');
const headerIconHeight = (Platform.OS === "ios" ? '60%' : '35%');
const initialLayout = { height: 0, width: Dimensions.get('window').width };

var moment = require('moment');

export default class ProfilePage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', width: '100%', textAlign: 'center' }}>{Locals.PROFILE_PAGE_TITLE}</Text>
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
                            <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/common/notificationIconMain.png')} buttonPressed={() => navigation.state.params.handleNotificationPress ? navigation.state.params.handleNotificationPress() : null} />
                        </View>
                }
            </View>
        ),
        headerRight: (
            <View style={{ paddingHorizontal: 12, paddingTop: 5 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View>
                            <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/common/notificationIconMain.png')} buttonPressed={() => navigation.state.params.handleNotificationPress ? navigation.state.params.handleNotificationPress() : null} />
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

        this.state = {

            subTabSelectedIndex: 0,

            // firstName: props.appState.user ? props.appState.user.userInfo.firstName : '',
            firstName: '',
            firstNameError: false,
            firstNameErrorMessage: '',

            // lastName: props.appState.user ? props.appState.user.userInfo.lastName : '',
            lastName: '',
            lastNameError: false,
            lastNameErrorMessage: '',

            // phone: props.appState.user ? props.appState.user.userInfo.phoneNumber : '',
            phone: '',
            phoneError: false,
            phoneErrorMessage: '',

            // dob: props.appState.user ? moment(props.appState.user.userInfo.dateOfBirth.date).format("DD/MM/YYYY") : '',
            dob: '',
            dobError: false,
            dobErrorMessage: '',
            selectedDateInDateFormat: new Date(),

            oldPassword: '',
            oldPasswordError: false,
            oldPasswordErrorMessage: '',

            newPassword: '',
            newPasswordError: false,
            newPasswordErrorMessage: '',

            passwordConfirmation: '',
            passwordConfirmationError: false,
            passwordConfirmationErrorMessage: '',

            //for pattern
            patternText: '',
            showPatternText: false,
            isConfirmPattern: false,

            isEnglish: props.appState.lang == 'en',

            selectedRadioButton: 0,

            mainWidthTab1: 0,
            mainWidthTab2: 0,

            buttonDisabled: false,
            isInitialLoad: true,
        };

        //for animation on error messages
        this.animated = new Animated.Value(0);

        this.savePressed = this.savePressed.bind(this);
        this._onFinish = this._onFinish.bind(this);
        this._onReset = this._onReset.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.goToNotifications = this.goToNotifications.bind(this);
    }

    goToNotifications() {

        this.props.navigation.navigate("NotificationsPageContainer");
    }

    componentDidMount() {
        Orientation.lockToPortrait();

        this.props.navigation.setParams({ handleNotificationPress: this.goToNotifications, badgeCount: this.props.appState.badgeCount, language: this.props.appState.lang })

        // if (this.props.appState.user.userInfo.roleId == ServerStatus.UserRoles.Driver.id) {

        //     this.props.fetchDriverInformation(this.props.appState.user.userInfo.driverId, this.props.appState.user.tokenData.accessToken)

        // } else {
        let values = {
            accessToken: this.props.appState.user.tokenData.accessToken,
            fcmToken: this.props.appState.user.tokenData.fcmToken,
            language: this.props.appState.lang
        }

        this.props.getUserInfo(values)
        // }
    }

    animate() {
        this.animated.setValue(0);
        Animated.spring(this.animated, {
            toValue: 1,
            duration: 1500//in milliseconds
        }).start()
    }

    render() {
        if (this.state.isInitialLoad) {
            return (<Loaders.Loader />)
        } else {
            return (

                <View style={{ flex: 1, justifyContent: 'flex-start' }}>

                    {
                        this.props.appState.lang == 'en' ?
                            <View style={styles.tabContainerStyle}>
                                <TouchableOpacity style={styles.tabStyle} onPress={() => this.setState({
                                    subTabSelectedIndex: 0,
                                    // name: '',
                                    firstNameError: false,
                                    firstNameErrorMessage: '',

                                    lastNameError: false,
                                    lastNameErrorMessage: '',

                                    // phone: '',
                                    phoneError: false,
                                    phoneErrorMessage: '',

                                    oldPassword: '',
                                    oldPasswordError: false,
                                    oldPasswordErrorMessage: '',

                                    newPassword: '',
                                    newPasswordError: false,
                                    newPasswordErrorMessage: '',

                                    passwordConfirmation: '',
                                    passwordConfirmationError: false,
                                    passwordConfirmationErrorMessage: '',

                                    //for pattern
                                    patternText: '',
                                    showPatternText: false,
                                    isConfirmPattern: false,
                                })}>
                                    <Text onLayout={this.onLayoutTab1} style={this.state.subTabSelectedIndex == 0 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.PROFILE_PAGE_INFO_TITLE}</Text>
                                    <View style={this.state.subTabSelectedIndex == 0 ? [styles.indicatorStyle, { width: this.state.mainWidthTab1 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab1 }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tabStyle} onPress={() => this.setState({
                                    subTabSelectedIndex: 1,
                                    // name: '',
                                    firstNameError: false,
                                    firstNameErrorMessage: '',

                                    lastNameError: false,
                                    lastNameErrorMessage: '',

                                    // phone: '',
                                    phoneError: false,
                                    phoneErrorMessage: '',

                                    oldPassword: '',
                                    oldPasswordError: false,
                                    oldPasswordErrorMessage: '',

                                    newPassword: '',
                                    newPasswordError: false,
                                    newPasswordErrorMessage: '',

                                    passwordConfirmation: '',
                                    passwordConfirmationError: false,
                                    passwordConfirmationErrorMessage: '',

                                    //for pattern
                                    patternText: '',
                                    showPatternText: false,
                                    isConfirmPattern: false,
                                })}>
                                    <Text onLayout={this.onLayoutTab2} style={this.state.subTabSelectedIndex == 1 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.PROFILE_PAGE_PASSWORD_TITLE}</Text>
                                    <View style={this.state.subTabSelectedIndex == 1 ? [styles.indicatorStyle, { width: this.state.mainWidthTab2 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab2 }]}></View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.tabContainerStyle}>
                                <TouchableOpacity style={styles.tabStyle} onPress={() => this.setState({
                                    subTabSelectedIndex: 1,
                                    // name: '',
                                    firstNameError: false,
                                    firstNameErrorMessage: '',

                                    lastNameError: false,
                                    lastNameErrorMessage: '',

                                    // phone: '',
                                    phoneError: false,
                                    phoneErrorMessage: '',

                                    oldPassword: '',
                                    oldPasswordError: false,
                                    oldPasswordErrorMessage: '',

                                    newPassword: '',
                                    newPasswordError: false,
                                    newPasswordErrorMessage: '',

                                    passwordConfirmation: '',
                                    passwordConfirmationError: false,
                                    passwordConfirmationErrorMessage: '',

                                    //for pattern
                                    patternText: '',
                                    showPatternText: false,
                                    isConfirmPattern: false,
                                })}>
                                    <Text onLayout={this.onLayoutTab2} style={this.state.subTabSelectedIndex == 1 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.PROFILE_PAGE_PASSWORD_TITLE}</Text>
                                    <View style={this.state.subTabSelectedIndex == 1 ? [styles.indicatorStyle, { width: this.state.mainWidthTab2 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab2 }]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tabStyle} onPress={() => this.setState({
                                    subTabSelectedIndex: 0,
                                    // name: '',
                                    firstNameError: false,
                                    firstNameErrorMessage: '',

                                    lastNameError: false,
                                    lastNameErrorMessage: '',

                                    // phone: '',
                                    phoneError: false,
                                    phoneErrorMessage: '',

                                    oldPassword: '',
                                    oldPasswordError: false,
                                    oldPasswordErrorMessage: '',

                                    newPassword: '',
                                    newPasswordError: false,
                                    newPasswordErrorMessage: '',

                                    passwordConfirmation: '',
                                    passwordConfirmationError: false,
                                    passwordConfirmationErrorMessage: '',

                                    //for pattern
                                    patternText: '',
                                    showPatternText: false,
                                    isConfirmPattern: false,
                                })}>
                                    <Text onLayout={this.onLayoutTab1} style={this.state.subTabSelectedIndex == 0 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.PROFILE_PAGE_INFO_TITLE}</Text>
                                    <View style={this.state.subTabSelectedIndex == 0 ? [styles.indicatorStyle, { width: this.state.mainWidthTab1 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab1 }]}></View>
                                </TouchableOpacity>
                            </View>
                    }

                    {
                        this.state.subTabSelectedIndex == 0 ? this.infoTab() : this.passwordTab()
                    }

                    {
                        this.props.appState.state == STATE.LOADING ? <Loaders.Loader /> : null
                    }

                    <Alerts.SingleButtonAlert
                        ref={SBAlert => this.SBAlert = SBAlert}
                        language={this.props.appState.lang}
                        dismissAlert={this.dismissAlertMessage.bind(this)}
                    />


                    <NotificationPopUp ref={notification => this.notification = notification} />
                </View>

            );
        }
    }

    onLayoutTab1 = (e) => {
        this.setState({
            mainWidthTab1: e.nativeEvent.layout.width + 20,
        })
    }

    onLayoutTab2 = (e) => {
        this.setState({
            mainWidthTab2: e.nativeEvent.layout.width + 20,
        })
    }

    componentWillReceiveProps(newProps) {

        //badge listener
        if (this.props.appState.badgeCount != newProps.appState.badgeCount) {
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        // if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_DRIVER.FETCH) {

        //     this.props.resetState();
        //     this.setState({
        //         firstName: newProps.appState.user ? newProps.appState.user.userInfo.firstName : '',
        //         lastName: newProps.appState.user ? newProps.appState.user.userInfo.lastName : '',
        //         phone: newProps.appState.user ? newProps.appState.user.userInfo.phoneNumber : '',
        //         dob: newProps.appState.user ? moment(newProps.appState.user.userInfo.dateOfBirth).format("DD/MM/YYYY") : '',
        //         isInitialLoad: false,
        //         isEnglish: newProps.appState.user ? newProps.appState.user.userInfo.languageType == ServerStatus.LanguageType.ENGLISH : false
        //     })

        // } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_DRIVER.FETCH) {

        //     this.setState({ alertMessageToShow: newProps.appState.errorMessage, selectedSectionForAlert: null, isInitialLoad: false })
        //     // this.notification.showNotification(newProps.appState.errorMessage, true)
        // }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_USER.GET_USER_INFO) {

            console.log(newProps)
            this.props.resetState();
            this.setState({
                firstName: newProps.appState.user ? newProps.appState.user.userInfo.firstName : '',
                lastName: newProps.appState.user ? newProps.appState.user.userInfo.lastName : '',
                phone: newProps.appState.user ? newProps.appState.user.userInfo.phoneNumber : '',
                dob: newProps.appState.user ? newProps.appState.user.userInfo.dateOfBirth ? moment(newProps.appState.user.userInfo.dateOfBirth).format("DD/MM/YYYY") : '' : '',
                isInitialLoad: false,
                isEnglish: newProps.appState.user ? newProps.appState.user.userInfo.languageType == ServerStatus.LanguageType.ENGLISH : false
            })

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_USER.GET_USER_INFO) {

            this.setState({ alertMessageToShow: newProps.appState.errorMessage, selectedSectionForAlert: null, isInitialLoad: false })
            // this.notification.showNotification(newProps.appState.errorMessage, true)
        }

        // if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_DRIVER.UPDATE_DRIVER_INFO) {

        //     this.props.resetState();
        //     this.setState({
        //         firstName: newProps.appState.user ? newProps.appState.user.userInfo.firstName : '',
        //         lastName: newProps.appState.user ? newProps.appState.user.userInfo.lastName : '',
        //         phone: newProps.appState.user ? newProps.appState.user.userInfo.phoneNumber : '',
        //         dob: newProps.appState.user ? moment(newProps.appState.user.userInfo.dateOfBirth).format("DD/MM/YYYY") : '',
        //         isEnglish: newProps.appState.user ? newProps.appState.user.userInfo.languageType == ServerStatus.LanguageType.ENGLISH : false
        //     })
        //     this.notification.showNotification(newProps.appState.successMessage, false)

        // } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_DRIVER.UPDATE_DRIVER_INFO) {
        //     this.setState({ alertMessageToShow: newProps.appState.errorMessage, selectedSectionForAlert: null })
        //     this.notification.showNotification(newProps.appState.errorMessage, true)
        // }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_USER.UPDATE_USER_INFO) {
            console.log(newProps)
            this.props.resetState();
            this.setState({
                firstName: newProps.appState.user ? newProps.appState.user.userInfo.firstName : '',
                lastName: newProps.appState.user ? newProps.appState.user.userInfo.lastName : '',
                phone: newProps.appState.user ? newProps.appState.user.userInfo.phoneNumber : '',
                dob: newProps.appState.user ? moment(newProps.appState.user.userInfo.dateOfBirth).format("DD/MM/YYYY") : '',
                isEnglish: newProps.appState.user ? newProps.appState.user.userInfo.languageType == ServerStatus.LanguageType.ENGLISH : false
            })
            this.notification.showNotification(newProps.appState.successMessage, false)

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_USER.UPDATE_USER_INFO) {
            this.setState({ alertMessageToShow: newProps.appState.errorMessage, selectedSectionForAlert: null })
            this.notification.showNotification(newProps.appState.errorMessage, true)
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_USER.CHANGE_PASSWORD) {

            this.props.resetState();
            this.setState({ subTabSelectedIndex: 0 }, () => {
                this.notification.showNotification(newProps.appState.successMessage, false)
            })

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_USER.CHANGE_PASSWORD) {
            this.setState({ alertMessageToShow: newProps.appState.errorMessage, selectedSectionForAlert: null })
            this.notification.showNotification(newProps.appState.errorMessage, true)
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_AUTH.LOGOUT) {

            let resetNavigation = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'LoginContainer' }),
                ],
            });
            newProps.navigation.dispatch(resetNavigation);
            this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_AUTH.LOGOUT) {

            this.props.resetState();
            // this.setState({ alertMessageToShow: newProps.appState.errorMessage, selectedSectionForAlert: null })
            this.notification.showNotification(newProps.appState.errorMessage, true)
        }
    }

    dismissAlertMessage() {
        this.SBAlert.dimissAlert()
    }

    savePressed() {

        if (this.isInputValid()) {

            Keyboard.dismiss();

            let tempDobArray = this.state.dob.split('/')
            let dobToSubmit = tempDobArray[2] + '-' + tempDobArray[1] + '-' + tempDobArray[0]

            if (this.state.subTabSelectedIndex == 0) {//for general info

                // if (this.props.appState.user.userInfo.roleId == ServerStatus.UserRoles.Driver.id) {
                //     this.props.updateDriverInformation(this.props.appState.user.tokenData.accessToken, this.props.appState.user.userInfo.driverId, this.props.appState.user.userInfo.email, null, null, this.state.firstName, this.state.lastName, dobToSubmit, this.state.phone, this.state.isEnglish ? ServerStatus.LanguageType.ENGLISH : ServerStatus.LanguageType.ARABIC)
                // } else {
                this.props.updateUserInfo(this.props.appState.user.tokenData.accessToken, this.props.appState.user.userInfo.driverId, this.props.appState.user.userInfo.email, null, null, this.state.firstName, this.state.lastName, dobToSubmit, this.state.phone, this.state.isEnglish ? ServerStatus.LanguageType.ENGLISH : ServerStatus.LanguageType.ARABIC, this.props.appState.user.tokenData.fcmToken)
                // }

            } else {//for passwords

                if (this.state.selectedRadioButton == 0) {//normal password

                    let values = {
                        currentPassword: this.state.oldPassword,
                        password: this.state.newPassword,
                    }

                    console.log('i am here')

                    this.props.changePassword(this.props.appState.user.tokenData.accessToken, values);
                    // this.props.updateDriverInformation(this.props.appState.user.tokenData.accessToken, this.props.appState.user.userInfo.driverId, this.props.appState.user.userInfo.email, this.state.password, null, this.state.firstName, this.state.lastName, dobToSubmit, this.state.phone, this.state.isEnglish ? '5' : '4')

                } else {//pattern password

                    let values = {
                        currentPassword: this.state.oldPassword,
                        pattern: this.state.newPassword,
                    }

                    this.props.changePassword(this.props.appState.user.tokenData.accessToken, values);
                    // this.props.updateDriverInformation(this.props.appState.user.tokenData.accessToken, this.props.appState.user.userInfo.driverId, this.props.appState.user.userInfo.email, null, this.state.password, this.state.firstName, this.state.lastName, dobToSubmit, this.state.phone, this.state.isEnglish ? '5' : '4')

                }
            }
        }
    }

    isInputValid() {

        if (this.state.subTabSelectedIndex == 0) {//is info section

            var firstNameValid = true, lastNameValid = true, dobValid = true, phoneValid = true;
            var firstNameError = '', lastNameError = '', dobError = '', phoneError = '';
            if (validators.isEmpty(this.state.firstName)) {
                firstNameValid = false;
                firstNameError = Locals.error_first_name_empty;
            }

            if (validators.isEmpty(this.state.lastName)) {
                lastNameValid = false;
                lastNameError = Locals.error_last_name_empty;
            }

            if (validators.isEmpty(this.state.dob)) {
                dobValid = false;
                dobError = Locals.error_dob_empty;
            }

            if (!validators.isEmpty(this.state.phone)) {

                if (!validators.isPhoneValid(this.state.phone)) {
                    phoneValid = false;
                    phoneError = Locals.error_phone_not_valid;
                }
            } else {
                phoneValid = false;
                phoneError = Locals.error_phone_empty;
            }

            this.setState({ phoneError: !phoneValid, phoneErrorMessage: phoneError, firstNameError: !firstNameValid, firstNameErrorMessage: firstNameError, lastNameError: !lastNameValid, lastNameErrorMessage: lastNameError, dobError: !dobValid, dobErrorMessage: dobError }, () => {
                this.animate()
            });
            return (firstNameValid && lastNameValid && phoneValid && dobValid);
        } else {//is password section

            if (this.state.selectedRadioButton == 0) {//password is a text field

                var oldPasswordValid = true, newPasswordValid = true, passwordConfirmationValid = true;
                var oldPasswordError = '', newPasswordError = '', passwordConfirmationError = '';
                if (!validators.isEmpty(this.state.oldPassword)) {

                    if (!validators.isPasswordValid(this.state.oldPassword)) {
                        oldPasswordValid = false;
                        oldPasswordError = Locals.error_old_password_not_valid;
                    }
                } else {
                    oldPasswordValid = false;
                    oldPasswordError = Locals.error_old_password_empty;
                }

                if (!validators.isEmpty(this.state.newPassword)) {

                    if (!validators.isPasswordValid(this.state.newPassword)) {
                        newPasswordValid = false;
                        newPasswordError = Locals.error_new_password_not_valid;
                    }
                } else {
                    newPasswordValid = false;
                    newPasswordError = Locals.error_new_password_empty;
                }

                if (!validators.isEmpty(this.state.passwordConfirmation)) {

                    if (!validators.isPasswordValid(this.state.passwordConfirmation)) {
                        passwordConfirmationValid = false;
                        passwordConfirmationError = Locals.error_password_not_valid;
                    }
                } else {
                    passwordConfirmationValid = false;
                    passwordConfirmationError = Locals.error_password_empty;
                }

                if (this.state.newPassword != this.state.passwordConfirmation && !validators.isEmpty(this.state.newPassword)) {
                    newPasswordValid = false;
                    newPasswordError = Locals.error_password_dont_match;
                    passwordConfirmationValid = false;
                    passwordConfirmationError = Locals.error_password_dont_match;
                }

                this.setState({ oldPasswordError: !oldPasswordValid, oldPasswordErrorMessage: oldPasswordError, newPasswordError: !newPasswordValid, newPasswordErrorMessage: newPasswordError, passwordConfirmationError: !passwordConfirmationValid, passwordConfirmationErrorMessage: passwordConfirmationError });
                return (oldPasswordValid && newPasswordValid && passwordConfirmationValid);

            } else {//password is a pattern

                var oldPasswordValid = true, newPasswordValid = true, passwordConfirmationValid = true;
                var oldPasswordError = '', newPasswordError = '', passwordConfirmationError = '';
                var patternText = '';
                if (!validators.isEmpty(this.state.oldPassword)) {

                    if (!validators.isPasswordValid(this.state.oldPassword)) {
                        oldPasswordValid = false;
                        oldPasswordError = Locals.error_old_password_not_valid;
                    }
                } else {
                    oldPasswordValid = false;
                    oldPasswordError = Locals.error_old_password_empty;
                }

                if (this.state.newPassword != this.state.passwordConfirmation) {
                    newPasswordValid = false;
                    newPasswordError = Locals.error_password_dont_match;
                    passwordConfirmationValid = false;
                    passwordConfirmationError = Locals.error_password_dont_match;
                    patternText = Locals.error_pattern_dont_match;
                }

                this.setState({
                    oldPasswordError: !oldPasswordValid,
                    oldPasswordErrorMessage: oldPasswordError,
                    passwordConfirmationError: !passwordConfirmationValid,
                    patternText: patternText
                });
                return (oldPasswordValid && passwordConfirmationValid)
            }
        }
    }

    infoTab = () => {

        return (
            // <View style={styles.mainContainer}>

            <KeyboardAwareScrollView
                // resetScrollToCoords={{ x: 0, y: 0 }}
                style={{ backgroundColor: '#f0f0f0' }}
                contentContainerStyle={{ flexGrow: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'>

                <View style={[styles.mainContainer, { margin: 10, overflow: 'hidden' }]}>

                    <Image style={[styles.motoIconStyle, { bottom: -15 }]} source={require('../../images/common/motoIconHelp.png')} />

                    {
                        this.props.appState.lang == 'en' ?
                            <View style={styles.titleContainer}>
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_FIRST_NAME}</Text>
                                {
                                    this.state.firstNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.firstNameErrorMessage)}</Text> : null
                                }
                            </View>
                            :
                            <View style={styles.titleContainer}>
                                {
                                    this.state.firstNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.firstNameErrorMessage)}</Text> : null
                                }
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_FIRST_NAME}</Text>
                            </View>
                    }

                    <TextInput
                        selectionColor='#919191'
                        style={[styles.inputFields, this.state.firstNameError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        placeholder=''
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.firstName}
                        onChangeText={firstName => {
                            this.setState({ firstName: firstName });
                        }} />

                    {
                        this.props.appState.lang == 'en' ?
                            <View style={styles.titleContainer}>
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_LAST_NAME}</Text>
                                {
                                    this.state.lastNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.lastNameErrorMessage)}</Text> : null
                                }
                            </View>
                            :
                            <View style={styles.titleContainer}>
                                {
                                    this.state.lastNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.lastNameErrorMessage)}</Text> : null
                                }
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_LAST_NAME}</Text>
                            </View>
                    }

                    <TextInput
                        selectionColor='#919191'
                        style={[styles.inputFields, this.state.lastNameError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        placeholder=''
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.lastName}
                        onChangeText={lastName => {
                            this.setState({ lastName: lastName });
                        }} />

                    {
                        this.props.appState.lang == 'en' ?
                            <View style={styles.titleContainer}>
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_PHONE}</Text>
                                {
                                    this.state.phoneError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.phoneErrorMessage)}</Text> : null
                                }
                            </View>
                            :
                            <View style={styles.titleContainer}>
                                {
                                    this.state.phoneError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.phoneErrorMessage)}</Text> : null
                                }
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_PHONE}</Text>
                            </View>
                    }

                    <TextInput
                        selectionColor='#919191'
                        style={[styles.inputFields, this.state.phoneError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        keyboardType='numeric'
                        returnKeyType={'done'}
                        placeholder=''
                        // placeholder={Locals.PASSWORD_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                        autoCorrect={false}
                        value={this.state.phone}
                        onChangeText={phone => {
                            if (phone.trim().length == 0) {
                                this.setState({ phone: '+' });
                            } else {
                                if (phone.includes('+')) {
                                    this.setState({ phone: `${phone}` })
                                } else {
                                    this.setState({ phone: `+${phone}` })
                                }
                            }
                        }} />

                    {
                        this.props.appState.lang == 'en' ?
                            <View style={styles.titleContainer}>
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_DOB}</Text>
                                {
                                    this.state.dobError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.dobErrorMessage)}</Text> : null
                                }
                            </View>
                            :
                            <View style={styles.titleContainer}>
                                {
                                    this.state.dobError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.dobErrorMessage)}</Text> : null
                                }
                                <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_DOB}</Text>
                            </View>
                    }

                    <TouchableOpacity style={styles.dateButtons} onPress={() => this.setState({ isDateTimePickerVisible: true })}>
                        <Text style={{ minWidth: 90, textAlign: 'center', fontFamily: Fonts.SUB_FONT, color: '#a1a1a1' }}>{this.state.dob != '' ? this.state.dob : Locals.CHOOSE_DATE}</Text>
                    </TouchableOpacity>

                    {/* <View style={styles.radioButtonMainView}>
                        <View style={styles.radioButtonView}>
                            <RadioButton
                                // innerColor={Colors.SUB_COLOR}
                                // outerColor={Colors.TEXT_COLOR}
                                // animation={'bounceIn'}
                                textStyle={{ color: '#919191' }}
                                outerViewStyle={{ borderColor: '#919191' }}
                                label={Locals.ENGLISH}
                                language={this.props.appState.lang}
                                isSelected={this.state.isEnglish == true}
                                onPress={() => this.setState({ isEnglish: true })}
                            />
                        </View>
                        <View style={[styles.radioButtonView, { justifyContent: 'flex-end' }]}>
                            <RadioButton
                                // innerColor={Colors.SUB_COLOR}
                                // outerColor={Colors.TEXT_COLOR}
                                // animation={'bounceIn'}
                                textStyle={{ color: '#919191' }}
                                outerViewStyle={{ borderColor: '#919191' }}
                                label={Locals.ARABIC}
                                language={this.props.appState.lang}
                                isSelected={this.state.isEnglish == false}
                                onPress={() => this.setState({ isEnglish: false })}
                            />
                        </View>
                    </View> */}

                    {
                        this.props.appState.lang == 'en' ?
                            <View style={{

                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Buttons.RoundCornerButton buttonStyle={[styles.button, { shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]} textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }} label={Locals.PROFILE_PAGE_LOG_OUT} sectionPressed={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        let values = {
                                            accessToken: this.props.appState.user.tokenData.accessToken,
                                            fcmToken: this.props.appState.user.tokenData.fcmToken
                                        }
                                        this.props.logOut(values);
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }} />

                                <Buttons.RoundCornerButton buttonStyle={[styles.button, { borderWidth: 0, backgroundColor: '#f3be0c', marginLeft: 8 }]} textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }} label={Locals.PROFILE_PAGE_SAVE} sectionPressed={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.savePressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }} />
                            </View>
                            :
                            <View style={{

                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Buttons.RoundCornerButton buttonStyle={[styles.button, { borderWidth: 0, backgroundColor: '#f3be0c' }]} textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }} label={Locals.PROFILE_PAGE_SAVE} sectionPressed={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.savePressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }} />
                                <Buttons.RoundCornerButton buttonStyle={[styles.button, { shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0, marginLeft: 8 }]} textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }} label={Locals.PROFILE_PAGE_LOG_OUT} sectionPressed={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        let values = {
                                            accessToken: this.props.appState.user.tokenData.accessToken
                                        }
                                        this.props.logOut(values);
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }} />
                            </View>
                    }

                    <DateTimePicker
                        date={this.state.selectedDateInDateFormat}
                        onDateChange={(date) => {
                            this.setState({ selectedDateInDateFormat: date, dob: moment(date).format("DD/MM/YYYY") })
                        }}
                        titleIOS="Select DOB"
                        neverDisableConfirmIOS={true}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(date) => this.handleDatePicked(date)}
                        onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                    />
                </View>
            </KeyboardAwareScrollView>

            // </View>
        )
    }

    handleDatePicked(selectedDate) {

        this.setState({ selectedDateInDateFormat: selectedDate, dob: moment(selectedDate).format("DD/MM/YYYY"), isDateTimePickerVisible: false })
    }

    passwordTab = () => {

        return (

            <KeyboardAwareScrollView
                // resetScrollToCoords={{ x: 0, y: 0 }}
                style={{ backgroundColor: '#f0f0f0' }}
                contentContainerStyle={{ flexGrow: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'>

                <View style={[styles.mainContainer, { justifyContent: 'flex-start', margin: 10, overflow: 'hidden' }]}>

                    <Image style={[styles.motoIconStyle, { bottom: -15 }]} source={require('../../images/common/motoIconHelp.png')} />

                    {
                        // this.props.appState.lang == 'en' ?
                        //     <View style={[styles.radioButtonMainView, { alignSelf: 'center', marginTop: 30 }]}>
                        //         <View style={styles.radioButtonView}>
                        //             <RadioButton
                        //                 // innerColor={Colors.SUB_COLOR}
                        //                 // outerColor={Colors.TEXT_COLOR}
                        //                 // animation={'bounceIn'}
                        //                 containerStyle={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start' }}
                        //                 outerViewStyle={{ borderColor: '#919191' }}
                        //                 textStyle={{ color: '#919191' }}
                        //                 label={Locals.PROFILE_PAGE_PASSWORD_TITLE}
                        //                 language={this.props.appState.lang}
                        //                 isSelected={this.state.selectedRadioButton == 0}
                        //                 onPress={() => this.setState({
                        //                     selectedRadioButton: 0,

                        //                     oldPassword: '',
                        //                     oldPasswordError: false,
                        //                     oldPasswordErrorMessage: '',

                        //                     newPassword: '',
                        //                     newPasswordError: false,
                        //                     newPasswordErrorMessage: '',

                        //                     passwordConfirmation: '',
                        //                     passwordConfirmationError: false,
                        //                     passwordConfirmationErrorMessage: '',

                        //                     //for pattern
                        //                     patternText: '',
                        //                     showPatternText: false,
                        //                     isConfirmPattern: false,
                        //                 })}
                        //             />
                        //         </View>
                        //         <View style={[styles.radioButtonView, { justifyContent: 'flex-end' }]}>
                        //             <RadioButton
                        //                 // innerColor={Colors.SUB_COLOR}
                        //                 // outerColor={Colors.TEXT_COLOR}
                        //                 // animation={'bounceIn'}
                        //                 outerViewStyle={{ borderColor: '#919191' }}
                        //                 textStyle={{ width: '65%', color: '#919191' }}
                        //                 containerStyle={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
                        //                 label={Locals.PROFILE_PAGE_ALTERNATIVE_PASSWORD}
                        //                 language={this.props.appState.lang}
                        //                 isSelected={this.state.selectedRadioButton == 1}
                        //                 onPress={() => this.setState({
                        //                     selectedRadioButton: 1,

                        //                     oldPassword: '',
                        //                     oldPasswordError: false,
                        //                     oldPasswordErrorMessage: '',

                        //                     newPassword: '',
                        //                     newPasswordError: false,
                        //                     newPasswordErrorMessage: '',

                        //                     passwordConfirmation: '',
                        //                     passwordConfirmationError: false,
                        //                     passwordConfirmationErrorMessage: '',

                        //                     //for pattern
                        //                     patternText: '',
                        //                     showPatternText: false,
                        //                     isConfirmPattern: false,
                        //                 })}
                        //             />
                        //         </View>
                        //     </View>
                        //     :
                        //     <View style={[styles.radioButtonMainView, { alignSelf: 'center', marginTop: 30 }]}>
                        //         <View style={[styles.radioButtonView, { justifyContent: 'flex-end' }]}>
                        //             <RadioButton
                        //                 // innerColor={Colors.SUB_COLOR}
                        //                 // outerColor={Colors.TEXT_COLOR}
                        //                 // animation={'bounceIn'}
                        //                 outerViewStyle={{ borderColor: '#919191' }}
                        //                 textStyle={{ color: '#919191', textAlign: 'right' }}
                        //                 containerStyle={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-end' }}
                        //                 label={Locals.PROFILE_PAGE_ALTERNATIVE_PASSWORD}
                        //                 language={this.props.appState.lang}
                        //                 isSelected={this.state.selectedRadioButton == 1}
                        //                 onPress={() => this.setState({
                        //                     selectedRadioButton: 1,

                        //                     oldPassword: '',
                        //                     oldPasswordError: false,
                        //                     oldPasswordErrorMessage: '',

                        //                     newPassword: '',
                        //                     newPasswordError: false,
                        //                     newPasswordErrorMessage: '',

                        //                     passwordConfirmation: '',
                        //                     passwordConfirmationError: false,
                        //                     passwordConfirmationErrorMessage: '',

                        //                     //for pattern
                        //                     patternText: '',
                        //                     showPatternText: false,
                        //                     isConfirmPattern: false,
                        //                 })}
                        //             />
                        //         </View>
                        //         <View style={[styles.radioButtonView, { justifyContent: 'flex-end' }]}>
                        //             <RadioButton
                        //                 // innerColor={Colors.SUB_COLOR}
                        //                 // outerColor={Colors.TEXT_COLOR}
                        //                 // animation={'bounceIn'}
                        //                 containerStyle={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-end' }}
                        //                 outerViewStyle={{ borderColor: '#919191' }}
                        //                 textStyle={{ color: '#919191', textAlign: 'right' }}
                        //                 label={Locals.PROFILE_PAGE_PASSWORD_TITLE}
                        //                 language={this.props.appState.lang}
                        //                 isSelected={this.state.selectedRadioButton == 0}
                        //                 onPress={() => this.setState({
                        //                     selectedRadioButton: 0,

                        //                     oldPassword: '',
                        //                     oldPasswordError: false,
                        //                     oldPasswordErrorMessage: '',

                        //                     newPassword: '',
                        //                     newPasswordError: false,
                        //                     newPasswordErrorMessage: '',

                        //                     passwordConfirmation: '',
                        //                     passwordConfirmationError: false,
                        //                     passwordConfirmationErrorMessage: '',

                        //                     //for pattern
                        //                     patternText: '',
                        //                     showPatternText: false,
                        //                     isConfirmPattern: false,
                        //                 })}
                        //             />
                        //         </View>
                        //     </View>
                    }

                    {
                        this.state.selectedRadioButton == 0 ?
                            <View style={{ flex: 1, width: '100%', marginTop: 30, justifyContent: 'flex-start', alignItems: 'center' }}>

                                <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>

                                        {
                                            this.props.appState.lang == 'en' ?
                                                <View style={styles.titleContainer}>
                                                    <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_OLD_PASSWORD}</Text>
                                                    {
                                                        this.state.oldPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.oldPasswordErrorMessage)}</Text> : null
                                                    }
                                                </View>
                                                :
                                                <View style={styles.titleContainer}>
                                                    {
                                                        this.state.oldPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.oldPasswordErrorMessage)}</Text> : null
                                                    }
                                                    <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_OLD_PASSWORD}</Text>
                                                </View>
                                        }

                                        <TextInput
                                            selectionColor='#919191'
                                            style={[styles.inputFields, this.state.oldPasswordError ? styles.inputFieldsError : null]}
                                            autoCapitalize='none'
                                            underlineColorAndroid={'transparent'}
                                            placeholder=''
                                            // placeholder={Locals.EMAIL_PLACEHOLDER}
                                            // placeholderTextColor={Colors.TEXT_COLOR}
                                            // placeholderStyle={styles.inputFieldsPlaceholder}
                                            secureTextEntry={true}
                                            autoCorrect={false}
                                            value={this.state.oldPassword}
                                            onChangeText={oldPassword => {
                                                this.setState({ oldPassword: oldPassword });
                                            }} />
                                        {
                                            this.props.appState.lang == 'en' ?
                                                <View style={styles.titleContainer}>
                                                    <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_NEW_PASSWORD}</Text>
                                                    {
                                                        this.state.newPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.newPasswordErrorMessage)}</Text> : null
                                                    }
                                                </View>
                                                :
                                                <View style={styles.titleContainer}>
                                                    {
                                                        this.state.newPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.newPasswordErrorMessage)}</Text> : null
                                                    }
                                                    <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_NEW_PASSWORD}</Text>
                                                </View>
                                        }

                                        <TextInput
                                            selectionColor='#919191'
                                            style={[styles.inputFields, this.state.newPasswordError ? styles.inputFieldsError : null]}
                                            autoCapitalize='none'
                                            underlineColorAndroid={'transparent'}
                                            placeholder=''
                                            // placeholder={Locals.EMAIL_PLACEHOLDER}
                                            // placeholderTextColor={Colors.TEXT_COLOR}
                                            // placeholderStyle={styles.inputFieldsPlaceholder}
                                            secureTextEntry={true}
                                            autoCorrect={false}
                                            value={this.state.newPassword}
                                            onChangeText={newPassword => {
                                                this.setState({ newPassword: newPassword });
                                            }} />

                                        {
                                            this.props.appState.lang == 'en' ?
                                                <View style={styles.titleContainer}>
                                                    <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_CONFIRMATION_PASSWORD}</Text>
                                                    {
                                                        this.state.passwordConfirmationError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.passwordConfirmationErrorMessage)}</Text> : null
                                                    }
                                                </View>
                                                :
                                                <View style={styles.titleContainer}>
                                                    {
                                                        this.state.passwordConfirmationError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.passwordConfirmationErrorMessage)}</Text> : null
                                                    }
                                                    <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_CONFIRMATION_PASSWORD}</Text>
                                                </View>
                                        }

                                        <TextInput
                                            selectionColor='#919191'
                                            style={[styles.inputFields, this.state.passwordConfirmationError ? styles.inputFieldsError : null]}
                                            autoCapitalize='none'
                                            underlineColorAndroid={'transparent'}
                                            placeholder=''
                                            // placeholder={Locals.EMAIL_PLACEHOLDER}
                                            // placeholderTextColor={Colors.TEXT_COLOR}
                                            // placeholderStyle={styles.inputFieldsPlaceholder}
                                            secureTextEntry={true}
                                            autoCorrect={false}
                                            value={this.state.passwordConfirmation}
                                            onChangeText={passwordConfirmation => {
                                                this.setState({ passwordConfirmation: passwordConfirmation });
                                            }} />
                                    </View>
                                </View>
                                <TouchableOpacity style={[styles.button, { alignSelf: 'center', marginBottom: 20, width: Dimensions.get('screen').width - 90 }]} disabled={this.state.buttonDisabled} onPress={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.savePressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }}>
                                    <Text style={styles.buttonText}>
                                        {Locals.PROFILE_PAGE_SAVE}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <GesturePassword
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                                pointBackgroundColor={'#383838'}
                                lineColor={this.state.passwordConfirmationError ? Colors.BADGE_COLOR : Colors.SUB_COLOR}
                                gestureAreaLength={Dimensions.get('screen').height / 2.5}
                                color={this.state.passwordConfirmationError ? Colors.BADGE_COLOR : Colors.SUB_COLOR}
                                activeColor={this.state.passwordConfirmationError ? Colors.BADGE_COLOR : Colors.SUB_COLOR}
                                isWarning={this.state.passwordConfirmationError}
                                warningColor={Colors.BADGE_COLOR}
                                warningDuration={1500}
                                allowCross={true}
                                topComponent={this.renderPatternHeaderSection()}
                                onFinish={this._onFinish}
                                onReset={this._onReset}
                            />
                    }

                </View>
            </KeyboardAwareScrollView>
        )
    }

    renderPatternHeaderSection() {
        return (
            <View style={{ height: 120, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                {
                    this.props.appState.lang == 'en' ?
                        <View style={styles.titleContainer}>
                            <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_OLD_PASSWORD}</Text>
                            {
                                this.state.oldPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.oldPasswordErrorMessage)}</Text> : null
                            }
                        </View>
                        :
                        <View style={styles.titleContainer}>
                            {
                                this.state.oldPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.oldPasswordErrorMessage)}</Text> : null
                            }
                            <Text style={styles.textFieldLabel}>{Locals.PROFILE_PAGE_OLD_PASSWORD}</Text>
                        </View>
                }

                <TextInput
                    selectionColor='#919191'
                    style={[styles.inputFields, this.state.oldPasswordError ? styles.inputFieldsError : null]}
                    autoCapitalize='none'
                    underlineColorAndroid={'transparent'}
                    placeholder=''
                    // placeholder={Locals.EMAIL_PLACEHOLDER}
                    // placeholderTextColor={Colors.TEXT_COLOR}
                    // placeholderStyle={styles.inputFieldsPlaceholder}
                    secureTextEntry={true}
                    autoCorrect={false}
                    value={this.state.oldPassword}
                    onChangeText={oldPassword => {
                        this.setState({ oldPassword: oldPassword });
                    }} />
                {
                    this.state.showPatternText ? <Text style={[{ fontFamily: Fonts.MAIN_FONT, marginTop: -5 }, { color: this.state.passwordConfirmationError ? Colors.BADGE_COLOR : Colors.SUB_COLOR }]}>{this.state.patternText}</Text> : null
                }
            </View>
        )
    }

    _onReset = () => {

        if (this.state.isConfirmPattern == false) {
            this.setState({
                patternText: '',
                showPatternText: false,
                isConfirmPattern: false,
                newPassword: '',
                passwordConfirmation: '',
                passwordConfirmationError: false,
            })
        }
    }

    _onStart() {
        this.lock.setStatus(RNPatternLock.NORMAL);
    }

    _onFinish(password) {
        if (this.state.isConfirmPattern) {

            this.setState({ passwordConfirmation: password, isConfirmPattern: false }, () => {
                this.savePressed()
            })
        } else {

            this.setState({ newPassword: password, patternText: Locals.PROFILE_PAGE_PLEASE_CONFIRM_PATTERN, isConfirmPattern: true, showPatternText: true, passwordConfirmationError: false })
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