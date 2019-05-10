import React, { Component } from 'react';
import Locals from '../../localization/local';
import { Colors } from '../../constants/general';
import * as object_types from '../../constants/object_types';
import * as pushNotificationHelpers from '../../utils/helpers/pushNotificationHelpers';
import Orientation from 'react-native-orientation';
// import BackgroundTask from 'react-native-background-task'
// import BackgroundTimer from 'react-native-background-timer';
import * as localStorage from '../../utils/helpers/localStorage';
import * as generalHelpers from '../../utils/helpers/generalHelpers';
import { NavigationActions } from 'react-navigation';
import * as ServerStatus from '../../constants/server_states';

import { Platform, PermissionsAndroid, NetInfo, StatusBar, AsyncStorage, StyleSheet, Text, View, Dimensions, Image, ScrollView, Animated, LayoutAnimation, Alert } from 'react-native';
import { STATE, ACTION_DRIVER, ACTION_MESSAGES, ACTION_DATABASE, ACTION_AUTH } from '../../constants/states';
import { Loaders, Alerts, BadgeButton, MainPageSections, Buttons, MyStatusBar, NotificationPopUp } from '../../components';

const headerTitlePadding = (Platform.OS === "ios" ? 0 : Dimensions.get('screen').width / 1.5);
const headerIconWidth = (Platform.OS === "ios" ? '60%' : '35%');
const headerIconHeight = (Platform.OS === "ios" ? '60%' : '35%');

export default class MainPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: Locals.MAIN_PAGE,
        gesturesEnabled: false,
        // headerStyle: {
        //     backgroundColor: Colors.NAVIGATION_BAR_COLOR,
        //     height: (Platform.OS === "ios" ? 70 : (70 + StatusBar.currentHeight)),
        //     paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        // },
        headerTitle: (
            <Image style={{ paddingLeft: headerTitlePadding, width: headerIconWidth, height: headerIconHeight, resizeMode: 'contain' }} source={require('../../images/common/wakilniLogoMain.png')} />
        ),
        headerLeft: (

            <View style={{ paddingHorizontal: 12 }}>
                {
                    Locals.getLanguage() == 'ar' ?

                        <View style={{ paddingTop: 5 }}>
                            <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/common/notificationIconMain.png')} buttonPressed={() => navigation.state.params.handleNotificationPress ? navigation.state.params.handleNotificationPress() : null} />
                        </View>
                        : null
                }
            </View>
        ),
        headerRight: (
            <View style={{ paddingHorizontal: 12, paddingTop: 5 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View style={{ paddingTop: 5 }}>
                            <BadgeButton badgeCount={navigation.state.params ? navigation.state.params.badgeCount : 0} position='topLeft' url={require('../../images/common/notificationIconMain.png')} buttonPressed={() => navigation.state.params.handleNotificationPress ? navigation.state.params.handleNotificationPress() : null} />
                        </View>
                        : null
                }
            </View>
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            selectedSectionForAlert: null,
            alertMessageToShow: '',
            isInitialLoad: true
        }
        this.sectionPressed = this.sectionPressed.bind(this);
        this.okAlertPressed = this.okAlertPressed.bind(this);
        this.dismissAlertMessage = this.dismissAlertMessage.bind(this);
        this.goToNotifications = this.goToNotifications.bind(this);
        this.preparePage = this.preparePage.bind(this);
    }

    preparePage() {

        // Optional: Check if the device is blocking background tasks or not
        // this.checkStatus()

        if (this.props.appState.user) {
            this.props.getConstants(this.props.appState.user.tokenData.accessToken)
            this.props.getAlerts(this.props.appState.user.tokenData.accessToken, true)
            this.props.getMessages({ accessToken: this.props.appState.user.tokenData.accessToken }, false, false)
        }

        pushNotificationHelpers.handlePushNotifications((result) => {

            if (this.props.appState.user) {
                this.props.getAlerts(this.props.appState.user.tokenData.accessToken, false)
                this.props.getMessages({ accessToken: this.props.appState.user.tokenData.accessToken }, false, false)
            }

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: result.moveTo, params: { didComeFromPushNotification: result.didComeFromPushNotification, notifId: result.notifId } })
                ]
            });
            this.props.navigation.dispatch(resetAction);
            // this.props.navigation.navigate(result.moveTo, { didComeFromPushNotification: result.didComeFromPushNotification, notifId: result.notifId })
        })

        // if (Platform.OS === 'android') {
        //     PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION").catch((error) => console.log(error))
        // } else {
        //     navigator.geolocation.requestAuthorization()
        // }

        Orientation.lockToPortrait();
        this.props.navigation.setParams({ handleNotificationPress: this.goToNotifications, badgeCount: this.props.appState.badgeCount, language: this.props.appState.lang })

    }

    componentDidMount() {

        setTimeout(() => {
            if (this.props.appState.user) {
                let values = {
                    accessToken: this.props.appState.user.tokenData.accessToken
                }
                this.props.isTokenValid(values)
            }
        }, 500)

    }

    componentWillReceiveProps(newProps) {

        //badge listener
        if (this.props.appState.badgeCount != newProps.appState.badgeCount) {
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_AUTH.IS_TOKEN_VALID) {

            this.setState({ isInitialLoad: false }, () => {
                this.preparePage()
            })

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_AUTH.IS_TOKEN_VALID) {

            // if (newProps.appState.errorMessage.toString() == "401") {
            this.setState({ isInitialLoad: false }, () => {
                // this.stopTimers()
                generalHelpers.clearCache()
                let resetNavigation = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LoginContainer' }),
                    ],
                });
                newProps.navigation.dispatch(resetNavigation);
                this.props.resetState();
            })
            // } else {
            //     this.setState({ isInitialLoad: false }, () => {
            //         this.preparePage()
            //     })
            // }
        }

        if (newProps.appState.action === ACTION_MESSAGES.SHOW_MESSAGES_MAIN_PAGE) {
            this.props.resetState();
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        if (newProps.appState.action === ACTION_MESSAGES.SHOW_ALERTS_MAIN_PAGE) {
            this.props.resetState();
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_DATABASE.SUCCESS) {

            if (newProps.appState.user) {
                this.props.getConstants(newProps.appState.user.tokenData.accessToken)
                this.props.getAlerts(newProps.appState.user.tokenData.accessToken, false)
                this.props.getMessages({ accessToken: newProps.appState.user.tokenData.accessToken }, false, false)
            }
        }

        // localStorage.getAuthStatus((result) => {

        //     if (result == true) {

        //         if (localStorage.removeAuthStatus()) {
        // this.stopTimers()

        // let resetNavigation = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'LoginContainer' }),
        //     ],
        // });
        // newProps.navigation.dispatch(resetNavigation);
        // this.props.resetState();
        //         }
        //     }

        // }, (error) => { })
    }

    //was will mount when tested
    componentWillUnmount() {
        // pushNotificationHelpers.removeListener()
        // navigator.geolocation.clearWatch(this.watchID);
    }

    goToNotifications() {
        if (this.DBAlert) {
            this.DBAlert.dimissAlert()
        }
        if (this.SBAlert) {
            this.SBAlert.dimissAlert()
        }
        this.props.navigation.navigate("NotificationsPageContainer", { cameFromMainPage: true });
    }

    sectionPressed(selectedSection) {

        switch (selectedSection) {
            case 1://Tasks
                this.props.navigation.navigate("TasksPage1Container");
                break;
            case 2://Order Listing
                this.props.navigation.navigate("OrderListingPageContainer");
                break;
            case 3://Request an order
                this.setState({ selectedSectionForAlert: 3, alertMessageToShow: Locals.MAIN_PAGE_REQUEST_AN_ORDER_POP_UP_MESSAGE }, () => {
                    //show alert message 
                    this.DBAlert.showAlert(Locals.MAIN_PAGE_REQUEST_AN_ORDER_POP_UP_MESSAGE, false)
                });
                break;
            case 4://TimeSheet
                this.props.navigation.navigate("TimeSheetPageContainer", { didComeFromNotificationsPage: false });
                break;
            case 5://Back To Office
                this.setState({ selectedSectionForAlert: 5, alertMessageToShow: Locals.MAIN_PAGE_BACK_TO_OFFICE_POP_UP_MESSAGE }, () => {
                    //show alert message
                    this.DBAlert.showAlert(Locals.MAIN_PAGE_BACK_TO_OFFICE_POP_UP_MESSAGE, false)
                });
                break;
            case 6://Cash Account
                this.props.navigation.navigate("CashAccountPageContainer");
                break;
            case 7://Request a leave
                this.props.navigation.navigate("RequestLeaveContainer");
                break;
            case 8://Check in
                this.props.navigation.navigate("CheckInOutPageContainer");
                break;
            case 9://Profile
                this.props.navigation.navigate("ProfilePageContainer");
                break;
            case 10://Packages
                this.props.navigation.navigate("PackagesPageContainer");
                break;
            case 11://Create Order
                this.props.navigation.navigate("CreateOrderContainer");
                break;
            case 12://Customer Recipients
                this.props.navigation.navigate("RecipientsContainer");
                break;
        }
    }

    renderMainView() {

        return (
            <View style={[styles.mainContainer, { overflow: 'hidden' }]}>
                <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconMain.png')} />
                {
                    this.props.appState.lang == 'ar' ?
                        <View style={styles.subSection}>
                            <MainPageSections language={this.props.appState.lang} isFirst={true} label={Locals.ORDERS} url={require('../../images/mainpage/ordersMain.png')} sectionPressed={() => this.sectionPressed(2)} />
                            <MainPageSections language={this.props.appState.lang} label={Locals.CREATE_ORDER} url={require('../../images/mainpage/createOrderMain.png')} sectionPressed={() => this.sectionPressed(11)} />
                        </View>
                        :
                        <View style={styles.subSection}>
                            <MainPageSections language={this.props.appState.lang} isFirst={true} label={Locals.ORDERS} url={require('../../images/mainpage/ordersMain.png')} sectionPressed={() => this.sectionPressed(2)} />
                            <MainPageSections language={this.props.appState.lang} label={Locals.CREATE_ORDER} url={require('../../images/mainpage/createOrderMain.png')} sectionPressed={() => this.sectionPressed(11)} />
                        </View>
                }
                {
                    this.props.appState.lang == 'ar' ?
                        <View style={styles.subSection}>
                            <MainPageSections language={this.props.appState.lang} isLast={true} label={Locals.PROFILE} url={require('../../images/mainpage/profileMain.png')} sectionPressed={() => this.sectionPressed(9)} />
                            <MainPageSections language={this.props.appState.lang} label={Locals.RECIPIENTS} url={require('../../images/mainpage/recipientsMain.png')} sectionPressed={() => this.sectionPressed(12)} />
                        </View>
                        :
                        <View style={styles.subSection}>
                            <MainPageSections language={this.props.appState.lang} isLast={true} label={Locals.PROFILE} url={require('../../images/mainpage/profileMain.png')} sectionPressed={() => this.sectionPressed(9)} />
                            <MainPageSections language={this.props.appState.lang} label={Locals.RECIPIENTS} url={require('../../images/mainpage/recipientsMain.png')} sectionPressed={() => this.sectionPressed(12)} />
                        </View>
                }

                {
                    this.props.appState.state == STATE.LOADING ? <Loaders.Loader /> : null
                }
                {
                    this.state.selectedSectionForAlert ?
                        <Alerts.DoubleButtonAlert
                            ref={DBAlert => this.DBAlert = DBAlert}
                            language={this.props.appState.lang}
                            dismissAlert={this.dismissAlertMessage}
                            okAlert={this.okAlertPressed}
                        />
                        :
                        <Alerts.SingleButtonAlert
                            ref={SBAlert => this.SBAlert = SBAlert}
                            language={this.props.appState.lang}
                            dismissAlert={this.dismissAlertMessage}
                        />
                }

                <NotificationPopUp ref={notification => this.notification = notification} />
            </View>
        )
    }

    render() {

        if (this.state.isInitialLoad) {
            return (
                <Loaders.Loader />
            )
        } else {
            if (this.props.appState.user) {
                return (
                    this.renderMainView()
                )
            } else {
                return (
                    <Loaders.Loader />
                )
            }
        }
    }

    //function that is called when the ok button is pressed on the alert message that pops up
    okAlertPressed() {
        let values = {
            accessToken: this.props.appState.user.tokenData.accessToken
        }
        switch (this.state.selectedSectionForAlert) {
            case 3://request an order
                values = {
                    ...values,
                    // title: object_types.MESSAGE.REQUEST_AN_ORDER.label,
                    // message: '',
                    type_id: object_types.MESSAGE.REQUEST_AN_ORDER.id,
                    // content_type_id: object_types.LOCATION_LOG.TEXT.id
                }
                this.props.requestAnOrder(values);
                break;
            case 5://back to office
                values = {
                    ...values,
                    id: this.props.appState.user.userInfo.driverId,
                    action: 'back_to_office'
                }
                this.props.backToOffice(values);
                break;
        }
        if (this.DBAlert) {
            this.DBAlert.dimissAlert()
        }
        if (this.SBAlert) {
            this.SBAlert.dimissAlert()
        }
        this.setState({ selectedSectionForAlert: null });
    }

    //function that is called when the cancel button is pressed on the alert message that pops up
    dismissAlertMessage() {
        if (this.DBAlert) {
            this.DBAlert.dimissAlert()
        }
        if (this.SBAlert) {
            this.SBAlert.dimissAlert()
        }
        this.setState({ selectedSectionForAlert: null });
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.MAIN_COLOR,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    bottomParent: {
        width: '100%',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subSection: {//four subSections 
        width: '100%',
        flexDirection: 'column', // place as row if we want them next to each other like wakilni OPS app
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})