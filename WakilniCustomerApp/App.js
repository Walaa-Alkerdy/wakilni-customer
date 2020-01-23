import React, { Component } from 'react';
import { AppRegistry, Platform, View, StatusBar } from "react-native";
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import { DrawerNavigator, StackNavigator, addNavigationHelpers, Animated, Easing } from "react-navigation";
import { Provider, connect } from 'react-redux';
import store from './src/stores/index';
import { defaultState } from './src/constants/default_state';
import * as localStorage from './src/utils/helpers/localStorage';
import { Loaders, MyStatusBar } from './src/components';
import Locals from './src/localization/local';
import { Colors } from './src/constants/general';

//Containers
import LoginContainer from './src/containers/auth/LoginContainer';
import RegistrationContainer from './src/containers/auth/RegistrationContainer';
import MainPageContainer from './src/containers/main/MainPageContainer';
import ProfilePageContainer from './src/containers/Profile/ProfilePageContainer';
import ChangePasswordPageContainer from './src/containers/Profile/ChangePasswordPageContainer';
import NotificationsPageContainer from './src/containers/Notifications/NotificationsPageContainer';
import CreateOrderContainer from './src/containers/Orders/CreateOrderContainer';
import OrderListingPageContainer from './src/containers/Orders/OrderListingPageContainer';
import RecipientsContainer from './src/containers/Recipients/RecipientsContainer';
import Support from './src/containers/Support/Support';


const getInitialState = () => {
  return defaultState
}
let initialState = getInitialState();

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 200,
      // easing: Easing.out(Easing.poly(4)),
      // timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: Locals.getLanguage() == 'en' ? [width, 0, 0] : [-width, 0, width]
      })

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const slideFromBottom = { transform: [{ translateY }] }

      const lastSceneIndex = scenes[scenes.length - 1].index

      // Test whether we're skipping back more than one screen
      // and slide from bottom if true
      if (lastSceneIndex - toIndex > 1) {
        // Do not transform the screen being navigated to
        if (scene.index === toIndex) return
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return { opacity: 0 }
        // Slide top screen down
        return slideFromBottom
      }
      // Otherwise slide from right
      return slideFromRight
    },
  }
}

const commonNavOptions = {
  headerStyle: {
    backgroundColor: Colors.NAVIGATION_BAR_COLOR,
    height: (Platform.OS === "ios" ? 70 : (70 + StatusBar.currentHeight)),
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  gesturesEnabled: false,
}

const MainScreenNavigatorNotLoggedIn = StackNavigator({

  LoginContainer: { screen: LoginContainer, navigationOptions: commonNavOptions },
  RegistrationContainer: { screen: RegistrationContainer, navigationOptions: commonNavOptions },
  MainPageContainer: { screen: MainPageContainer, navigationOptions: commonNavOptions },
  NotificationsPageContainer: { screen: NotificationsPageContainer, navigationOptions: commonNavOptions },
  ProfilePageContainer: { screen: ProfilePageContainer, navigationOptions: commonNavOptions },
  ChangePasswordPageContainer: { screen: ChangePasswordPageContainer, navigationOptions: commonNavOptions },
  CreateOrderContainer: { screen: CreateOrderContainer, navigationOptions: commonNavOptions },
  OrderListingPageContainer: { screen: OrderListingPageContainer, navigationOptions: commonNavOptions },
  RecipientsContainer: { screen: RecipientsContainer, navigationOptions: commonNavOptions },
  Support: { screen: Support, navigationOptions: commonNavOptions },

}, {
    initialRouteName: 'LoginContainer',
    // initialRouteName: 'MainPageContainer',
    headerMode: 'screen',
    transitionConfig: transitionConfig
  })

const MainScreenNavigatorLoggedIn = StackNavigator({

  LoginContainer: { screen: LoginContainer, navigationOptions: commonNavOptions },
  RegistrationContainer: { screen: RegistrationContainer, navigationOptions: commonNavOptions },
  MainPageContainer: { screen: MainPageContainer, navigationOptions: commonNavOptions },
  NotificationsPageContainer: { screen: NotificationsPageContainer, navigationOptions: commonNavOptions },
  ProfilePageContainer: { screen: ProfilePageContainer, navigationOptions: commonNavOptions },
  ChangePasswordPageContainer: { screen: ChangePasswordPageContainer, navigationOptions: commonNavOptions },
  CreateOrderContainer: { screen: CreateOrderContainer, navigationOptions: commonNavOptions },
  OrderListingPageContainer: { screen: OrderListingPageContainer, navigationOptions: commonNavOptions },
  RecipientsContainer: { screen: RecipientsContainer, navigationOptions: commonNavOptions },
  Support: { screen: Support, navigationOptions: commonNavOptions },
}, {
    initialRouteName: 'MainPageContainer',
    headerMode: 'screen',
    transitionConfig: transitionConfig
  })

// const Drawer = DrawerNavigator(
//   {
//     Main: { screen: MainScreenNavigator }
//   },
//   {
//     contentComponent: DrawerMenu,
//     drawerWidth: Dimensions.get("window").width - 60,
//     // drawerPosition: 'right'
//   }
// );

class Proj extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isChecking: true
    }

    localStorage.getUser((user) => {

      localStorage.getSavedLanguage((lang) => {

        if (lang === "null") {
          Locals.setLanguage(initialState.lang);
          this.setState({ isLoggedIn: true, isChecking: false })
        } else {
          Locals.setLanguage(JSON.parse(lang));
          this.setState({ isLoggedIn: true, isChecking: false })
        }
      }, (error) => {
        Locals.setLanguage(initialState.lang);
        this.setState({ isLoggedIn: true, isChecking: false })
      })

    }, (error) => {

      localStorage.getSavedLanguage((lang) => {

        if (lang === "null") {
          Locals.setLanguage(initialState.lang);
          this.setState({ isLoggedIn: false, isChecking: false })
        } else {
          Locals.setLanguage(JSON.parse(lang));
          this.setState({ isLoggedIn: false, isChecking: false })
        }
      }, (error) => {
        Locals.setLanguage(initialState.lang);
        this.setState({ isLoggedIn: false, isChecking: false })
      })
    })

  }

  render() {
    if (this.state.isChecking) {
      return (
        <Loaders.Loader />
      )
    } else {
      if (this.state.isLoggedIn) {

        return (
          <View style={{ flex: 1 }}>
            <MyStatusBar />
            <MainScreenNavigatorLoggedIn />
          </View>
        )
      } else {

        return (
          <View style={{ flex: 1 }}>
            <MyStatusBar />
            <MainScreenNavigatorNotLoggedIn />
          </View>
        )
      }
    }
  }
}

// Use Navigator inside Redux
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // // iOS: show permission prompt for the first call. later just check permission in user settings
    // // Android: check permission in user settings
    FCM.requestPermissions({ badge: true, sound: true, alert: true }).then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

    // FCM.getInitialNotification().then(notif => {//when app is terminated and opened from a notification
    //   console.log("Initial Notification", notif)
    //   Alert.alert(JSON.stringify(notif))
    // });

    // FCM.getFCMToken().then(token => {
    //   Alert.alert(JSON.stringify(token))
    //   console.log(token)
    // })

    //reset badge number
    // FCM.setBadgeNumber(0)
  }

  componentWillUnmount() {
    // stop listening for events
    // this.notificationListener.remove();
    // this.refreshTokenListener.remove();
  }

  render() {
    return (
      <Provider store={store}>
        <Proj navigation={addNavigationHelpers({ state: store.getState(), dispatch: this.props.dispatcher })} />
      </Provider>
    )
  }
}

export default App;