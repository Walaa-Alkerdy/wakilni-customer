import React, { Component } from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';
import { STATE, ACTION_CONSTANTS, ACTION_CUSTOMER } from '../../constants/states';
import Locals from '../../localization/local';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loaders, Alerts, Buttons, Pickers, RadioButton, NotificationPopUp } from '../../components';
import { Colors, Fonts, RegistrationPickerTypes } from '../../constants/general';
import * as validators from '../../utils/validators/userInfoValidators';
import Orientation from 'react-native-orientation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';
import { limitLongitude, getRegionsVisualCenterCoordinates } from '../../utils/helpers/mapHelpers';

const headerTitlePadding = (Platform.OS === "ios" ? 0 : Dimensions.get('screen').width / 1.5);
const headerIconWidth = (Platform.OS === "ios" ? '60%' : '35%');
const headerIconHeight = (Platform.OS === "ios" ? '60%' : '35%');

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

            latitude: 33.894394,
            longitude: 35.492489,
            isPinningLocation: true,

            mainTabSelectedIndex: 0,
            mainWidthTab1: 0,
            mainWidthTab2: 0,
            mainWidthTab3: 0,

            pickerData: [],
            pickerTypeSelectedIndex: 0,

            selectedCustomerType: null,
            customerTypes: [],
            customerTypesError: false,

            shopName: '',
            shopNameError: false,
            shopNameErrorMessage: '',
            shopPhone: '',
            shopPhoneError: false,
            shopPhoneErrorMessage: '',
            firstName: '',
            firstNameError: false,
            firstNameErrorMessage: '',
            lastName: '',
            lastNameError: false,
            lastNameErrorMessage: '',
            phone: '',
            phoneError: false,
            phoneErrorMessage: '',

            selectedGender: { key: 0, value: 'Male' },
            genderTypes: [
                {
                    key: 0,
                    value: 'Male',
                },
                {
                    key: 1,
                    value: 'Female'
                }
            ],

            selectedDOB: null,

            email: '',
            emailError: false,
            emailErrorMessage: '',
            password: '',
            passwordError: false,
            passwordErrorMessage: '',
            confirmPassword: '',
            confirmPasswordError: false,
            confirmPasswordErrorMessage: '',

            goldenRule: '',

            selectedDeliveryPaymentMethod: null,
            deliveryPaymentMethods: [],
            deliveryPaymentMethodsError: false,

            mof: '',
            vat: '',
            accountingReferenceNumber: '',

            selectedLocationType: null,
            locationTypes: [],
            locationTypesError: false,

            selectedArea: null,
            areas: [],
            areaError: false,

            building: '',
            floor: '',
            directions: '',

            fcmToken: '',
        };

    }

    componentDidMount() {
        Orientation.lockToPortrait();

        this.props.getAreas()
        this.props.getConstantsList()

        FCM.getFCMToken().then((token) => {
            this.setState({ fcmToken: token })
        })

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            // console.log(token)
            // fcm token may not be available on first load, catch it here
            this.setState({ fcmToken: token })
        });
    }

    componentWillReceiveProps(newProps) {

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CONSTANTS.GET_AREAS) {

            this.fixArrayIntoPickerFormat(newProps.appState.areas, RegistrationPickerTypes.AREAS)
            this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CONSTANTS.GET_AREAS) {

            this.SBAlert.showAlert(newProps.appState.errorMessage, true)
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CONSTANTS.GET_CONSTANTS) {

            this.fixArrayIntoPickerFormat(newProps.appState.constantsList.customerTypes, RegistrationPickerTypes.CUSTOMER_TYPE)
            this.fixArrayIntoPickerFormat(newProps.appState.constantsList.paymentMethodTypes.filter((item) => { return item.id != 23 }), RegistrationPickerTypes.DELIVERY_PAYMENT_METHODS)//remove credit card from array 
            this.fixArrayIntoPickerFormat(newProps.appState.constantsList.locationTypes, RegistrationPickerTypes.LOCATION_TYPES)
            this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CONSTANTS.GET_CONSTANTS) {

            this.SBAlert.showAlert(newProps.appState.errorMessage, true)
        }

        if (newProps.appState.user && newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CUSTOMER.CREATE_CUSTOMER) {

            this.props.resetState();

            // if (newProps.appState.user.userInfo.isLastLogin) {
            this.props.navigation.navigate("MainPageContainer");
            // } else {
            //   this.props.navigation.navigate("ChangePasswordPageContainer", { currentPassword: this.state.password })
            // }

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CUSTOMER.CREATE_CUSTOMER) {

            this.SBAlert.showAlert(newProps.appState.errorMessage, true)
        }
    }

    handlePicker = (option) => {

        switch (this.state.pickerTypeSelectedIndex) {
            case RegistrationPickerTypes.CUSTOMER_TYPE://customerTypes                
                this.setState({ selectedCustomerType: option })
                break;
            case RegistrationPickerTypes.DELIVERY_PAYMENT_METHODS://deliveryPaymentMethods
                this.setState({ selectedDeliveryPaymentMethod: option })
                break;
            case RegistrationPickerTypes.LOCATION_TYPES://locationTypes                
                this.setState({ selectedLocationType: option })
                break;
            case RegistrationPickerTypes.AREAS://areas                
                this.setState({ selectedArea: option })
                break;
            case RegistrationPickerTypes.GENDER://areas                
                this.setState({ selectedGender: option })
                break;
            default:
                break;
        }
    }

    fixArrayIntoPickerFormat(array, type) {

        let temp = []

        array.forEach((item) => {
            temp.push({
                key: item.id,
                value: item.label ? item.label : item.name
            })
        })

        switch (type) {
            case RegistrationPickerTypes.CUSTOMER_TYPE://customerTypes                
                this.setState({ customerTypes: temp, pickerData: temp })
                break;
            case RegistrationPickerTypes.DELIVERY_PAYMENT_METHODS://deliveryPaymentMethods
                this.setState({ deliveryPaymentMethods: temp })
                break;
            case RegistrationPickerTypes.LOCATION_TYPES://locationTypes                
                this.setState({ locationTypes: temp })
                break;
            case RegistrationPickerTypes.AREAS://areas                
                this.setState({ areas: temp })
                break;
            default:
                break;
        }
    }

    handleMainTabPressed(id) {

        if (this.state.mainTabSelectedIndex < id) {
            return
        }

        switch (id) {
            case 0: //tab 1
                this.setState({ mainTabSelectedIndex: 0 })
                break;
            case 1: //tab 2
                this.setState({ mainTabSelectedIndex: 1 })
                break;
            case 2: //tab 3
                this.setState({ mainTabSelectedIndex: 2 })
                break;
            default:
                break;
        }
    }

    render() {
        return (

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>

                <View style={[styles.mainContainer, { justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>

                    <View style={[styles.mainContainer, { justifyContent: 'flex-start', backgroundColor: 'transparent' }]}>

                        <View style={styles.tabContainerStyle}>
                            <TouchableOpacity onLayout={this.onLayoutTab1} style={styles.tabStyle} onPress={() => { this.handleMainTabPressed(0) }}>
                                <Text style={this.state.mainTabSelectedIndex == 0 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP1}</Text>
                                <View style={this.state.mainTabSelectedIndex == 0 ? [styles.indicatorStyle, { width: this.state.mainWidthTab1 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab1 }]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onLayout={this.onLayoutTab2} activeOpacity={this.state.mainTabSelectedIndex < 1 ? 1 : 0.5} style={styles.tabStyle} onPress={() => { this.handleMainTabPressed(1) }}>
                                <Text style={this.state.mainTabSelectedIndex == 1 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP2}</Text>
                                <View style={this.state.mainTabSelectedIndex == 1 ? [styles.indicatorStyle, { width: this.state.mainWidthTab2 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab2 }]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onLayout={this.onLayoutTab3} activeOpacity={this.state.mainTabSelectedIndex < 2 ? 1 : 0.5} style={styles.tabStyle} onPress={() => { this.handleMainTabPressed(2) }}>
                                <Text style={this.state.mainTabSelectedIndex == 2 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP3}</Text>
                                <View style={this.state.mainTabSelectedIndex == 2 ? [styles.indicatorStyle, { width: this.state.mainWidthTab3 }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: this.state.mainWidthTab3 }]}></View>
                            </TouchableOpacity>
                        </View>

                        {
                            this.state.mainTabSelectedIndex == 0 ?
                                this.renderStep1()
                                : this.state.mainTabSelectedIndex == 1 ?
                                    this.renderStep2()
                                    : this.renderStep3()
                        }

                        {/* buttons section */}
                        <View style={{ flexDirection: 'row', marginBottom: 30, marginHorizontal: 20 }}>
                            <TouchableOpacity activeOpacity={this.state.mainTabSelectedIndex == 0 ? 1 : 0.5} style={[styles.button, { marginRight: 10 }, this.state.mainTabSelectedIndex == 0 ? { borderWidth: 2, borderColor: 'gray' } : { borderWidth: 2, borderColor: Colors.SUB_COLOR }]} disabled={this.state.buttonDisabled} onPress={() => {
                                this.backPressed()
                            }}>
                                <Text style={[styles.buttonText, this.state.mainTabSelectedIndex == 0 ? { color: 'gray' } : { color: Colors.SUB_COLOR }]}>
                                    {Locals.REGISTRATION_PAGE_BACK_BUTTON}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {}]} disabled={this.state.buttonDisabled} onPress={() => {
                                this.nextPressed()
                            }}>
                                <Text style={styles.buttonText}>
                                    {this.state.mainTabSelectedIndex < 2 ? Locals.REGISTRATION_PAGE_NEXT_BUTTON : Locals.REGISTRATION_PAGE_FINALIZE_BUTTON}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {
                    this.props.appState.state == STATE.LOADING ? <Loaders.Loader /> : null
                }

                <Pickers.SinglePicker
                    style={{ backgroundColor: 'white' }}
                    lang="en-US"
                    ref={ref => this.singlePicker = ref}
                    canFilter={this.state.pickerTypeSelectedIndex == RegistrationPickerTypes.AREAS ? true : false}
                    // defaultSelectedValue={}
                    onConfirm={this.handlePicker}
                    onSelect={(value) => { }}
                    options={this.state.pickerData}
                >
                </Pickers.SinglePicker>

                <DateTimePicker
                    date={this.state.selectedDOB ? this.state.selectedDOB : new Date()}
                    titleIOS="Select DOB"
                    neverDisableConfirmIOS={true}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.hideDatePicker}
                    onCancel={this.hideDatePicker}
                />

                <Alerts.SingleButtonAlert
                    ref={SBAlert => this.SBAlert = SBAlert}
                    language={this.props.appState.lang}
                    dismissAlert={this.dismissAlertMessage.bind(this)}
                />

                <NotificationPopUp ref={notification => this.notification = notification} />
            </View>
        );
    }

    showDatePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    hideDatePicker = (date) => {
        if (date) {
            this.setState({ selectedDOB: date, isDateTimePickerVisible: false })
        } else {
            this.setState({ isDateTimePickerVisible: false })
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

    onLayoutTab3 = (e) => {
        this.setState({
            mainWidthTab3: e.nativeEvent.layout.width + 20,
        })
    }

    renderStep1 = () => {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%' }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 90 : 500}
                enabled
            >
                <ScrollView
                    ref={scrollView => this.step1ScrollView = scrollView}
                    style={{ backgroundColor: Colors.MAIN_COLOR, width: '100%' }}
                    contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >

                    {/* email section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.REGISTRATION_PAGE_EMAIL}</Text>
                        {
                            this.state.emailError ? <Text style={[styles.errorMessage, { marginTop: 30 }]}>{Locals.formatString(Locals.braces, this.state.emailErrorMessage)}</Text> : null
                        }
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields, this.state.emailError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={email => {
                            this.setState({ email: email });
                        }} />

                    {/* password section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_PASSWORD}</Text>
                        {
                            this.state.passwordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.passwordErrorMessage)}</Text> : null
                        }
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields, this.state.passwordError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.PASSWORD_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                        secureTextEntry={true}
                        autoCorrect={false}
                        value={this.state.password}
                        onChangeText={password => {
                            this.setState({ password: password });
                        }} />

                    {/* confirm password section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_CONFIRM_PASSWORD}</Text>
                        {
                            this.state.confirmPasswordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.confirmPasswordErrorMessage)}</Text> : null
                        }
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields, this.state.confirmPasswordError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.PASSWORD_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                        secureTextEntry={true}
                        autoCorrect={false}
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword => {
                            this.setState({ confirmPassword: confirmPassword });
                        }} />

                    {/* first name */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_FIRST_NAME}</Text>
                        {
                            this.state.firstNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.firstNameErrorMessage)}</Text> : null
                        }
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields, this.state.firstNameError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.PASSWORD_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                        // secureTextEntry={true}
                        autoCorrect={false}
                        value={this.state.firstName}
                        onChangeText={text => {
                            this.setState({ firstName: text });
                        }} />

                    {/* last name */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_LAST_NAME}</Text>
                        {
                            this.state.lastNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.lastNameErrorMessage)}</Text> : null
                        }
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields, this.state.lastNameError ? styles.inputFieldsError : null]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.PASSWORD_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                        // secureTextEntry={true}
                        autoCorrect={false}
                        value={this.state.lastName}
                        onChangeText={text => {
                            this.setState({ lastName: text });
                        }} />

                    {/* phone */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_PHONE_NUMBER}</Text>
                        {
                            this.state.phoneError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.phoneErrorMessage)}</Text> : null
                        }
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
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

                    {/* customer type */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_TYPE}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={this.state.customerTypes.length > 0 ? 0.5 : 1} style={[{ marginBottom: 30, height: 40, backgroundColor: this.state.customerTypes.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 10, justifyContent: 'center', width: Dimensions.get('screen').width - 120 }, this.state.customerTypesError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        this.setState({ pickerTypeSelectedIndex: RegistrationPickerTypes.CUSTOMER_TYPE, pickerData: this.state.customerTypes }, () => {
                            if (this.state.customerTypes.length > 0) {
                                this.singlePicker.show()
                            }
                        })
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedCustomerType ? this.state.selectedCustomerType.value : ''}</Text>
                    </TouchableOpacity>

                    {
                        this.state.selectedCustomerType != null && this.state.selectedCustomerType.key != 19 ? // not individual Client then show shop name and shop phone number
                            <View>
                                {/* shop name */}
                                <View style={styles.titleContainer}>
                                    <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_SHOP_NAME}</Text>
                                    {
                                        this.state.shopNameError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.shopNameErrorMessage)}</Text> : null
                                    }
                                </View>
                                <TextInput
                                    selectionColor={Colors.SUB_COLOR}
                                    style={[styles.inputFields, this.state.shopNameError ? styles.inputFieldsError : null]}
                                    underlineColorAndroid={'transparent'}
                                    returnKeyType={'done'}
                                    // placeholder={Locals.PASSWORD_PLACEHOLDER}
                                    // placeholderTextColor={Colors.TEXT_COLOR}
                                    // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                                    // secureTextEntry={true}
                                    autoCorrect={false}
                                    value={this.state.shopName}
                                    onChangeText={text => {
                                        this.setState({ shopName: text });
                                    }} />

                                {/* shop phone */}
                                <View style={styles.titleContainer}>
                                    <Text style={[styles.textFieldLabel]}>{Locals.REGISTRATION_PAGE_SHOP_PHONE_NUMBER}</Text>
                                    {
                                        this.state.shopPhoneError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.shopPhoneErrorMessage)}</Text> : null
                                    }
                                </View>
                                <TextInput
                                    selectionColor={Colors.SUB_COLOR}
                                    style={[styles.inputFields, this.state.shopPhoneError ? styles.inputFieldsError : null]}
                                    underlineColorAndroid={'transparent'}
                                    keyboardType='numeric'
                                    returnKeyType={'done'}
                                    placeholder=''
                                    // placeholder={Locals.PASSWORD_PLACEHOLDER}
                                    // placeholderTextColor={Colors.TEXT_COLOR}
                                    // placeholderStyle={{fontFamily: Fonts.MAIN_FONT}}
                                    autoCorrect={false}
                                    value={this.state.shopPhone}
                                    onChangeText={shopPhone => {
                                        if (shopPhone.trim().length == 0) {
                                            this.setState({ shopPhone: '+' });
                                        } else {
                                            if (shopPhone.includes('+')) {
                                                this.setState({ shopPhone: `${shopPhone}` })
                                            } else {
                                                this.setState({ shopPhone: `+${shopPhone}` })
                                            }
                                        }
                                    }} />
                            </View>
                            :
                            null
                    }

                    {/* gender */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_GENDER}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={this.state.genderTypes.length > 0 ? 0.5 : 1} style={[{ height: 40, backgroundColor: this.state.genderTypes.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 10, justifyContent: 'center', width: Dimensions.get('screen').width - 120 }, { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        this.setState({ pickerTypeSelectedIndex: RegistrationPickerTypes.GENDER, pickerData: this.state.genderTypes }, () => {
                            if (this.state.genderTypes.length > 0) {
                                this.singlePicker.show()
                            }
                        })
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedGender ? this.state.selectedGender.value : ''}</Text>
                    </TouchableOpacity>

                    {/* dob */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.REGISTRATION_PAGE_DATE_OF_BIRTH}</Text>
                    </View>
                    <TouchableOpacity style={[{ marginBottom: 50, height: 40, backgroundColor: '#f0f0f0', borderRadius: 10, justifyContent: 'center', width: Dimensions.get('screen').width - 120 }, { borderColor: 'transparent', borderWidth: 1 }]} onPress={this.showDatePicker}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedDOB ? moment(this.state.selectedDOB).format('DD-MM-YYYY') : ''}</Text>
                    </TouchableOpacity>
                    {/* </KeyboardAwareScrollView> */}
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    renderStep2 = () => {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%' }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 90 : 500}
                enabled
            >
                <ScrollView
                    ref={scrollView => this.step2ScrollView = scrollView}
                    style={{ backgroundColor: Colors.MAIN_COLOR, width: '100%' }}
                    contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >

                    {/* golden rule section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, { marginTop: 30 }]}>{Locals.REGISTRATION_PAGE_GOLDEN_RULE}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.goldenRule}
                        onChangeText={text => {
                            this.setState({ goldenRule: text });
                        }} />

                    {/* delivery payment method */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_PAYMENT_METHOD}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={this.state.deliveryPaymentMethods.length > 0 ? 0.5 : 1} style={[{ marginBottom: 30, height: 40, backgroundColor: this.state.deliveryPaymentMethods.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 10, justifyContent: 'center', width: Dimensions.get('screen').width - 120 }, this.state.deliveryPaymentMethodsError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        this.setState({ pickerTypeSelectedIndex: RegistrationPickerTypes.DELIVERY_PAYMENT_METHODS, pickerData: this.state.deliveryPaymentMethods }, () => {
                            if (this.state.deliveryPaymentMethods.length > 0) {
                                this.singlePicker.show()
                            }
                        })
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedDeliveryPaymentMethod ? this.state.selectedDeliveryPaymentMethod.value : ''}</Text>
                    </TouchableOpacity>

                    {/* MOF section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_MOF}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.mof}
                        onChangeText={text => {
                            this.setState({ mof: text });
                        }} />

                    {/* VAT section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_VAT}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.vat}
                        onChangeText={text => {
                            this.setState({ vat: text });
                        }} />

                    {/* accounting reference number section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_ACCOUNTING_REFERENCE_NUMBER}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.accountingReferenceNumber}
                        onChangeText={text => {
                            this.setState({ accountingReferenceNumber: text });
                        }} />

                    {/* location types */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_LOCATION_TYPE}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={this.state.locationTypes.length > 0 ? 0.5 : 1} style={[{ marginBottom: 30, height: 40, backgroundColor: this.state.locationTypes.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 10, justifyContent: 'center', width: Dimensions.get('screen').width - 120 }, this.state.locationTypesError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        this.setState({ pickerTypeSelectedIndex: RegistrationPickerTypes.LOCATION_TYPES, pickerData: this.state.locationTypes }, () => {
                            if (this.state.locationTypes.length > 0) {
                                this.singlePicker.show()
                            }
                        })
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedLocationType ? this.state.selectedLocationType.value : ''}</Text>
                    </TouchableOpacity>

                    {/* areas */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_AREA}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={this.state.areas.length > 0 ? 0.5 : 1} style={[{ marginBottom: 30, height: 40, backgroundColor: this.state.areas.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 10, justifyContent: 'center', width: Dimensions.get('screen').width - 120 }, this.state.areaError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        this.setState({ pickerTypeSelectedIndex: RegistrationPickerTypes.AREAS, pickerData: this.state.areas }, () => {
                            if (this.state.areas.length > 0) {
                                this.singlePicker.show()
                            }
                        })
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedArea ? this.state.selectedArea.value : ''}</Text>
                    </TouchableOpacity>

                    {/* building section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_BUILDING}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.building}
                        onChangeText={text => {
                            this.setState({ building: text });
                        }} />

                    {/* floor section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_FLOOR}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.floor}
                        onChangeText={text => {
                            this.setState({ floor: text });
                        }} />

                    {/* directions section */}
                    <View style={styles.titleContainer}>
                        <Text style={[styles.textFieldLabel, {}]}>{Locals.REGISTRATION_PAGE_DIRECTIONS}</Text>
                    </View>
                    <TextInput
                        selectionColor={Colors.SUB_COLOR}
                        style={[styles.inputFields]}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={'done'}
                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                        // placeholderTextColor={Colors.TEXT_COLOR}
                        // placeholderStyle={styles.inputFieldsPlaceholder}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.state.directions}
                        onChangeText={text => {
                            this.setState({ directions: text });
                        }} />

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    renderStep3 = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.radioButtonMainView, { marginBottom: 20, marginTop: 20 }]}>
                    <View style={styles.radioButtonView}>
                        <RadioButton
                            // innerColor={Colors.SUB_COLOR}
                            // outerColor={Colors.TEXT_COLOR}
                            // animation={'bounceIn'}
                            label={'Pin Location'}
                            language={this.props.appState.lang}
                            isSelected={this.state.isPinningLocation == true}
                            onPress={() => { this.setState({ isPinningLocation: true }) }}
                        />
                    </View>
                    <View style={styles.radioButtonView}>
                        <RadioButton
                            // innerColor={Colors.SUB_COLOR}
                            // outerColor={Colors.TEXT_COLOR}
                            // animation={'bounceIn'}
                            label={'No Location'}
                            language={this.props.appState.lang}
                            isSelected={this.state.isPinningLocation == false}
                            onPress={() => { this.setState({ isPinningLocation: false }) }}
                        />
                    </View>
                </View>

                {
                    this.state.isPinningLocation ?
                        <View
                            onLayout={this.handleMapContainerLayoutChange}
                            style={{ width: Dimensions.get('screen').width - 40, height: Dimensions.get('screen').height - 300, paddingVertical: 20, borderColor: 5, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <MapView
                                style={{ flex: 1, width: '100%' }}
                                initialRegion={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005
                                }}
                                // provider={PROVIDER_GOOGLE}
                                // customMapStyle={mapStyle}
                                pitchEnabled={false}
                                rotateEnabled={false}
                                scrollEnabled={true}
                                zoomEnabled={true}
                                onRegionChangeComplete={this.onRegionChangeComplete}
                            >
                            </MapView>
                            <Image source={require('../../images/map/mapPin.png')} style={{ width: 40, height: 80, resizeMode: 'contain', position: 'absolute' }} />
                        </View>
                        :
                        null
                }
            </View>
        )
    }

    handleMapContainerLayoutChange = (event) => {
        this.mapWidth = event.nativeEvent.layout.width;
        this.mapHeight = event.nativeEvent.layout.height;
    }

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    backPressed = () => {
        if (this.state.mainTabSelectedIndex != 0) {
            this.setState({ mainTabSelectedIndex: this.state.mainTabSelectedIndex - 1 }, () => {
                if (this.step1ScrollView)
                    this.step1ScrollView.scrollTo({ x: 0, y: 20, animated: true })

                if (this.step2ScrollView)
                    this.step2ScrollView.scrollTo({ x: 0, y: 20, animated: true })
            })
        }
    }

    nextPressed = () => {

        if (this.isInputValid()) {

            if (this.state.mainTabSelectedIndex == 2) {

                this.finalizePressed()
            } else {
                this.setState({ mainTabSelectedIndex: this.state.mainTabSelectedIndex + 1 }, () => {
                    if (this.step1ScrollView)
                        this.step1ScrollView.scrollTo({ x: 0, y: 0, animated: true })

                    if (this.step2ScrollView)
                        this.step2ScrollView.scrollTo({ x: 0, y: 0, animated: true })
                })
            }
        }
    }

    dismissAlertMessage() {
        this.SBAlert.dimissAlert()
    }

    isInputValid() {

        var isValid = true

        if (this.state.mainTabSelectedIndex == 0) {//validate step 1 fields

            var emailValid = true, passwordValid = true, confirmPasswordValid = true, phoneValid = true, firstNameValid = true, lastNameValid = true, shopNameValid = true, shopPhoneValid = true, customerTypesValid = true;
            var emailError = '', passwordError = '', confirmPasswordError = '', phoneError = '', firstNameError = '', lastNameError = '', shopNameError = '', shopPhoneError = '';

            if (!validators.isEmpty(this.state.email)) {
                if (!validators.isEmailValid(this.state.email)) {
                    emailValid = false;
                    emailError = Locals.error_email_not_valid
                    isValid = false
                }
            } else {
                emailValid = false;
                emailError = Locals.error_email_empty
                isValid = false
            }

            if (!validators.isEmpty(this.state.password)) {
                if (!validators.isPasswordValid(this.state.password)) {
                    passwordValid = false;
                    passwordError = Locals.error_password_not_valid;
                    isValid = false
                }
            } else {
                passwordValid = false;
                passwordError = Locals.error_password_empty;
                isValid = false
            }

            if (!validators.isEmpty(this.state.confirmPassword)) {
                if (!validators.isPasswordValid(this.state.confirmPassword)) {
                    confirmPasswordValid = false;
                    confirmPasswordError = Locals.error_password_not_valid;
                    isValid = false
                }
            } else {
                confirmPasswordValid = false;
                confirmPasswordError = Locals.error_password_empty;
                isValid = false
            }

            if (this.state.password != this.state.confirmPassword && this.state.password != '') {
                passwordValid = false;
                passwordError = Locals.error_password_dont_match;
                confirmPasswordValid = false;
                confirmPasswordError = Locals.error_password_dont_match;
                isValid = false
            }

            if (!validators.isEmpty(this.state.phone)) {

                if (!validators.isPhoneValid(this.state.phone)) {
                    phoneValid = false;
                    phoneError = Locals.error_phone_not_valid;
                    isValid = false
                }
            } else {
                phoneValid = false;
                phoneError = Locals.error_phone_empty;
                isValid = false
            }

            if (validators.isEmpty(this.state.firstName)) {
                firstNameValid = false
                firstNameError = Locals.error_first_name_empty
                isValid = false
            }

            if (validators.isEmpty(this.state.lastName)) {
                lastNameValid = false
                lastNameError = Locals.error_last_name_empty
                isValid = false
            }

            if (this.state.selectedCustomerType == null) {
                customerTypesValid = false
                isValid = false
            } else {//check if its type is individual client or not

                if (this.state.selectedCustomerType.key != 19) { // its not individual client then validate shop name and shop phone number aswell
                    if (!validators.isEmpty(this.state.shopPhone)) {

                        if (!validators.isPhoneValid(this.state.shopPhone)) {
                            shopPhoneValid = false;
                            shopPhoneError = Locals.error_phone_not_valid;
                            isValid = false
                        }
                    } else {
                        shopPhoneValid = false;
                        shopPhoneError = Locals.error_phone_empty;
                        isValid = false
                    }

                    if (validators.isEmpty(this.state.shopName)) {
                        shopNameValid = false
                        shopNameError = Locals.error_first_name_empty
                        isValid = false
                    }
                }
            }

            this.setState({
                passwordError: !passwordValid,
                passwordErrorMessage: passwordError,
                confirmPasswordError: !confirmPasswordValid,
                confirmPasswordErrorMessage: confirmPasswordError,
                emailError: !emailValid,
                emailErrorMessage: emailError,
                phoneError: !phoneValid,
                phoneErrorMessage: phoneError,
                firstNameError: !firstNameValid,
                firstNameErrorMessage: firstNameError,
                lastNameError: !lastNameValid,
                lastNameErrorMessage: lastNameError,
                shopNameError: !shopNameValid,
                shopNameErrorMessage: shopNameError,
                shopPhoneError: !shopPhoneValid,
                shopPhoneErrorMessage: shopPhoneError,
                customerTypesError: !customerTypesValid
            }, () => { });

            if (!isValid) {
                this.notification.showNotification('Not all required field are valid', true)
            }

            return (isValid);
        } else if (this.state.mainTabSelectedIndex == 1) {//validate step 2

            var locationTypeValid = true, areaValid = true, deliveryPaymentMethodsValid = true;

            if (this.state.selectedArea == null) {
                areaValid = false
                isValid = false
            }

            if (this.state.selectedDeliveryPaymentMethod == null) {
                deliveryPaymentMethodsValid = false
                isValid = false
            }

            if (this.state.selectedLocationType == null) {
                locationTypeValid = false
                isValid = false
            }

            this.setState({
                areaError: !areaValid,
                deliveryPaymentMethodsError: !deliveryPaymentMethodsValid,
                locationTypesError: !locationTypeValid
            })

            if (!isValid) {
                this.notification.showNotification('Not all required field are valid', true)
            }

            return (isValid)

        } else {

            return true
        }
    }

    finalizePressed() {

        var visualCenterCoords = getRegionsVisualCenterCoordinates(this.state.region, {
            x: this.mapWidth,
            y: this.mapHeight
        });

        let values = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phone,
            shopName: this.state.shopName,
            shopPhone: this.state.shopPhone,
            customerType: this.state.selectedCustomerType.key,
            genderType: this.state.selectedGender.key,
            dob: this.state.selectedDOB ? moment(this.state.selectedDOB).format('YYYY-MM-D h:mm:ss') : null,
            goldenRule: this.state.goldenRule,
            deliveryPaymentMethods: this.state.selectedDeliveryPaymentMethod.key,
            mof: this.state.mof,
            vat: this.state.vat,
            accountingReferenceNumber: this.state.accountingReferenceNumber,
            locationType: this.state.selectedLocationType.key,
            area: this.state.selectedArea.key,
            building: this.state.building,
            floor: this.state.floor,
            directions: this.state.directions,
            coordinates: this.state.isPinningLocation ? {
                latitude: visualCenterCoords.latitude,
                longitude: visualCenterCoords.longitude,
            } : {
                    latitude: 0,
                    longitude: 0,
                },
            fcmToken: this.state.fcmToken ? this.state.fcmToken : '',
            deviceType: Platform.OS === 'ios' ? 2 : 1
        }

        this.props.createCustomer(values)
    }

}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        // alignContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // justifyContent: 'center'
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
        flex: 1,
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
        textAlign: 'left',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 11,
        backgroundColor: '#4c4c4c',
        width: Dimensions.get('screen').width - 120,
        borderRadius: 10,
        paddingHorizontal: 15,
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
        width: Dimensions.get('screen').width / 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
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