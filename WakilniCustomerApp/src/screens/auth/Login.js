import React, { Component } from 'react';
import { Platform, StatusBar, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Animated, Keyboard, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';
import { STATE, ACTION_AUTH, ACTION_DATABASE } from '../../constants/states';
import Locals from '../../localization/local';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loaders, Alerts, MyStatusBar, RadioButton, GesturePassword } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import * as validators from '../../utils/validators/userInfoValidators';
import Orientation from 'react-native-orientation';
import * as ServerStatus from '../../constants/server_states';
import * as localStorage from '../../utils/helpers/localStorage'
const headerTitlePadding = (Platform.OS === "ios" ? 0 : Dimensions.get('screen').width / 1.5);
const headerIconWidth = (Platform.OS === "ios" ? '60%' : '35%');
const headerIconHeight = (Platform.OS === "ios" ? '60%' : '35%');
const initialLayout = { height: 0, width: Dimensions.get('window').width };

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

      email: '',
      emailError: false,
      emailErrorMessage: '',


      password: '',
      passwordError: false,
      passwordErrorMessage: '',

      radioSelected: 'en',
      isEnglish: true,

      buttonDisabled: false,

      fcmToken: null,
    };

    //for animation on error messages
    this.animated = new Animated.Value(0);

    this.registerPressed = this.registerPressed.bind(this);
    this.loginPressed = this.loginPressed.bind(this);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);;
  }

  componentDidMount() {
    Orientation.lockToPortrait();

    if (Platform.OS === 'android') {
      PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION").catch((error) => console.log(error))
    }

    FCM.getFCMToken().then((token) => {
      this.setState({ fcmToken: token })
    })

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      // console.log(token)
      // fcm token may not be available on first load, catch it here
      this.setState({ fcmToken: token })
    });
  }

  animate() {
    this.animated.setValue(0);
    Animated.spring(this.animated, {
      toValue: 1,
      duration: 1500//in milliseconds
    }).start()
  }

  handleRadioButtonChange(selectedRadioText) {

    if (selectedRadioText === 'en') {

      this.setState({ isEnglish: true, radioSelected: 'en' })
    } else {
      this.setState({ isEnglish: false, radioSelected: 'ar' })
    }

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

        {this.LoginNoPattern()}

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

    if (newProps.appState.user && newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_AUTH.LOGIN) {

      this.props.resetState();
      localStorage.saveAuthStatus("false")
      // if (newProps.appState.user.userInfo.isLastLogin) {
      this.props.navigation.navigate("MainPageContainer");
      // } else {
      //   this.props.navigation.navigate("ChangePasswordPageContainer", { currentPassword: this.state.password })
      // }

    } else if (newProps.appState.user && newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_DATABASE.SUCCESS) {

      this.props.resetState();
      this.props.navigation.navigate("MainPageContainer");

    } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_AUTH.LOGIN) {

      this.SBAlert.showAlert(newProps.appState.errorMessage, true)
    }
  }

  dismissAlertMessage() {
    this.SBAlert.dimissAlert()
  }

  registerPressed() {

    this.props.navigation.navigate('RegistrationContainer')
  }

  loginPressed() {

    if (this.isInputValid()) {

      let values = {
        email: this.state.email,
        // phoneNumber: this.state.phone,
        language_type: this.state.isEnglish ? ServerStatus.LanguageType.ENGLISH : ServerStatus.LanguageType.ARABIC
      }

      values = {
        ...values,
        password: this.state.password,
      }

      Keyboard.dismiss();

      values = {
        ...values,
        fcmToken: this.state.fcmToken ? this.state.fcmToken : '',
        deviceType: Platform.OS === 'ios' ? 2 : 1
      }

      this.props.loginAPI(values);

    }
  }

  isInputValid() {
    var emailValid = true, passwordValid = true, phoneValid = true;
    var emailError = '', passwordError = '', phoneError = '';
    if (!validators.isEmpty(this.state.email)) {
      if (!validators.isEmailValid(this.state.email)) {
        emailValid = false;
        emailError = Locals.error_email_not_valid
      }
    } else {
      emailValid = false;
      emailError = Locals.error_email_empty
    }

    // if (validators.isEmpty(this.state.phone)) {
    //   phoneValid = false;
    //   phoneError = Locals.error_phone_empty;
    // }

    if (!validators.isEmpty(this.state.password)) {
      if (!validators.isPasswordValid(this.state.password)) {
        passwordValid = false;
        passwordError = Locals.error_password_not_valid;
      }
    } else {
      passwordValid = false;
      passwordError = Locals.error_password_empty;
    }

    this.setState({ passwordError: !passwordValid, passwordErrorMessage: passwordError, emailError: !emailValid, emailErrorMessage: emailError }, () => {
      this.animate()
    });
    return (emailValid && passwordValid);
  }

  LoginNoPattern = () => {

    return (
      // <View style={styles.mainContainer}>

      <KeyboardAwareScrollView
        // resetScrollToCoords={{ x: 0, y: 0 }}
        style={{ backgroundColor: Colors.MAIN_COLOR }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'>

        <View style={[styles.mainContainer, { justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>

          <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconMain.png')} />

          <View style={[styles.mainContainer, { justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'transparent' }]}>

            <View style={[styles.elementContainer, { marginTop: 30 }]}>
              <View style={[styles.labelContainer]}>
                <Text style={[styles.textFieldLabel, {}]}>{Locals.PROFILE_PAGE_EMAIL}</Text>
                {/* {
                this.state.emailError ? <Text style={[styles.errorMessage, { marginTop: 30 }]}>{Locals.formatString(Locals.braces, this.state.emailErrorMessage)}</Text> : null
              } */}
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
            </View>

            <View style={[styles.elementContainer, {}]}>
              <View style={[styles.labelContainer]}>
                <Text style={[styles.textFieldLabel]}>{Locals.PASSWORD_PLACEHOLDER}</Text>
                {/* {
                      this.state.passwordError ? <Text style={styles.errorMessage}>{Locals.formatString(Locals.braces, this.state.passwordErrorMessage)}</Text> : null
                    } */}
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
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 30, marginHorizontal: 20 }}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]} disabled={this.state.buttonDisabled} onPress={() => {
              this.setState({ buttonDisabled: false }, () => {
                this.loginPressed()
              })
              // enable after 2 second
              setTimeout(() => {
                this.setState({ buttonDisabled: false });
              }, 2000)
            }}>
              <Text style={styles.buttonText}>
                {Locals.LOGIN}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {}]} disabled={this.state.buttonDisabled} onPress={() => {
              this.setState({ buttonDisabled: false }, () => {
                this.registerPressed()
              })
              // enable after 2 second
              setTimeout(() => {
                this.setState({ buttonDisabled: false });
              }, 2000)
            }}>
              <Text style={styles.buttonText}>
                {Locals.REGISTER}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView >
    )
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
    marginBottom: 5,
    marginRight: 10,
    width: 100,
  },
  inputFields: {
    color: Colors.TEXT_COLOR,
    textAlign: 'left',
    fontFamily: Fonts.MAIN_FONT,
    fontSize: 11,
    backgroundColor: '#4c4c4c',
    flex: 1,
    // width: Dimensions.get('screen').width - 120,
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
    flex: 1,
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
  },
  elementContainer: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  labelContainer: {
    height: 40,
    justifyContent: 'center'
  }
});