import React, { Component } from 'react';
import { Platform, RefreshControl, StatusBar, Image, StyleSheet, Dimensions, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Loaders, Alerts, NotificationPopUp, NotificationsPageSections, NoResultsPage, BadgeButton, Buttons } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import * as ServerStatus from '../../constants/server_states';
import * as Object_TYPES from '../../constants/object_types';
import { STATE, ACTION_MESSAGES, ACTION_DRIVER, ACTION_RESET } from '../../constants/states';
import Locals from '../../localization/local';
import Orientation from 'react-native-orientation';
import * as Helpers from '../../utils/helpers/generalHelpers';
import * as localStorage from '../../utils/helpers/localStorage';
import { NavigationActions } from 'react-navigation';
import moment from 'moment'

export default class NotificationsPage extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: Locals.NOTIFICATION,
        headerTitle: (
            <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', width: '100%', textAlign: 'center' }}>{Locals.NOTIFICATION}</Text>
        ),
        headerLeft: (

            <View>
                {
                    Locals.getLanguage() == 'en' ?

                        <View style={{ paddingHorizontal: 10 }}>
                            {
                                navigation.state.params ? (navigation.state.params.cameFromMainPage == true) ?
                                    <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => {

                                        localStorage.getNavigationHelper((result) => {
                                            localStorage.removeNavigationHelperStatus();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'MainPageContainer' })
                                                ]
                                            });
                                            navigation.dispatch(resetAction);

                                        }, (err) => {
                                            navigation.goBack()
                                        })
                                    }} />
                                    :
                                    <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => {

                                        localStorage.getNavigationHelper((result) => {
                                            localStorage.removeNavigationHelperStatus();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'MainPageContainer' })
                                                ]
                                            });
                                            navigation.dispatch(resetAction);

                                        }, (err) => {
                                            navigation.goBack()
                                        })
                                    }} />
                                    :
                                    <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => {

                                        localStorage.getNavigationHelper((result) => {
                                            localStorage.removeNavigationHelperStatus();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'MainPageContainer' })
                                                ]
                                            });
                                            navigation.dispatch(resetAction);

                                        }, (err) => {
                                            navigation.goBack()
                                        })
                                    }} />
                            }

                        </View>
                        :
                        <View>
                        </View>
                }
            </View>
        ),
        headerRight: (
            <View>
                {
                    Locals.getLanguage() == 'en' ?

                        <View style={{ paddingHorizontal: 10 }}>
                            {/* <BadgeButton badgeCount={2} position='topLeft' url={require('../../images/notificationIconMain.png')} buttonPressed={() => navigation.state.params.handleNotificationPress()} /> */}
                        </View>
                        :
                        <View style={{ paddingHorizontal: navigation.state.params ? (navigation.state.params.cameFromMainPage == true) ? 10 : 10 : 0 }}>
                            {
                                navigation.state.params ? (navigation.state.params.cameFromMainPage == true) ?
                                    <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => {

                                        localStorage.getNavigationHelper((result) => {
                                            localStorage.removeNavigationHelperStatus();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'MainPageContainer' })
                                                ]
                                            });
                                            navigation.dispatch(resetAction);

                                        }, (err) => {
                                            navigation.goBack()
                                        })
                                    }} />
                                    :
                                    <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => {

                                        localStorage.getNavigationHelper((result) => {
                                            localStorage.removeNavigationHelperStatus();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'MainPageContainer' })
                                                ]
                                            });
                                            navigation.dispatch(resetAction);

                                        }, (err) => {
                                            navigation.goBack()
                                        })
                                    }} />
                                    :
                                    <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => {

                                        localStorage.getNavigationHelper((result) => {
                                            localStorage.removeNavigationHelperStatus();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'MainPageContainer' })
                                                ]
                                            });
                                            navigation.dispatch(resetAction);

                                        }, (err) => {
                                            navigation.goBack()
                                        })
                                    }} />
                            }
                        </View>
                }
            </View>
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            mainTabSelectedIndex: 0,
            subTabSelectedIndex: 0,
            mainWidthTab1: 0,
            mainWidthTab2: 0,

            alertsList: [],
            alertsPageNumber: 0,
            isLoadingMore: false,
            notificationRequestsList: [],
            listRefreshing: false,
            isLoadingMessages: true,
            isLoadingAlerts: true
        }

        this.refreshAlertsList = this.refreshAlertsList.bind(this);
        this.subTabPressed = this.subTabPressed.bind(this);
        this.notificationAlerts = this.notificationAlerts.bind(this);
        this.alertCellPressed = this.alertCellPressed.bind(this);
        // this.notificationRequests = this.notificationRequests.bind(this);
    }

    onLayoutTab1 = (e) => {
        this.setState({
            mainWidthTab1: e.nativeEvent.layout.width + 20
        })
    }

    onLayoutTab2 = (e) => {
        this.setState({
            mainWidthTab2: e.nativeEvent.layout.width + 20
        })
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.navigation.setParams({ language: this.props.appState.lang })
        this.refreshAlertsList(false, true);
    }

    componentWillReceiveProps(newProps) {

        // if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_MESSAGES.SHOW_MESSAGES) {

        //     this.setState({ listRefreshing: false, isLoadingMessages: false })
        //     this.props.resetState();

        // } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_MESSAGES.SHOW_MESSAGES) {

        //     this.setState({ listRefreshing: false, isLoadingMessages: false })
        //     this.props.resetState();
        // }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_MESSAGES.SHOW_ALERTS) {

            this.setState({
                isLoadingMore: false,
                alertsList: newProps.appState.alertsList.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return moment(b.createdAt.date) - moment(a.createdAt.date)
                    }
                })
            })
            if (newProps.appState.alertsList.filter((item) => item.readAt == null).length != 0 && ACTION_MESSAGES.SHOW_ALERTS) {//i have unread alerts

                this.props.updateAlertsToRead(this.props.appState.user ? this.props.appState.user.tokenData.accessToken : '')
                this.setState({ listRefreshing: false })
            } else {
                // console.log('nothing to update all are read')
                this.setState({ listRefreshing: false, isLoadingAlerts: false, isLoadingMore: false })
            }
            // this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_MESSAGES.SHOW_ALERTS) {

            this.setState({ listRefreshing: false, isLoadingAlerts: false })
            // this.props.resetState();
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_MESSAGES.UPDATE_ALERTS) {

            this.setState({ listRefreshing: false })
            this.props.getAlerts(this.props.appState.user ? this.props.appState.user.tokenData.accessToken : '', true)

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_MESSAGES.UPDATE_ALERTS) {

            this.setState({ listRefreshing: false, isLoadingAlerts: false })
            this.props.resetState();
        }

        if (newProps.appState.action != ACTION_RESET.RESET) {

            this.setState({
                notificationRequestsList: newProps.appState.notificationsList.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return moment(b.createdAt.date) - moment(a.createdAt.date)
                    }
                })
            }, () => { })
        }

        // if ((newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_DRIVER.REPLY_TO_REQUEST_NOTIFICATION_PAGE)) {

        //     this.setState({ alertMessageToShow: newProps.appState.successMessage })
        //     this.notification.showNotification(newProps.appState.successMessage, false)
        //     this.props.resetState();

        // } else if ((newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_DRIVER.REPLY_TO_REQUEST_NOTIFICATION_PAGE)) {

        //     this.setState({ alertMessageToShow: newProps.appState.errorMessage })
        //     this.notification.showNotification(newProps.appState.errorMessage, true)
        //     this.props.resetState();
        // }
    }

    render() {
        if (this.props.appState.user) {
            return (
                this.renderCustomerPage()
            )
        } else {
            return (
                <Loaders.Loader />
            )
        }
    }

    renderCustomerPage() {

        if (this.state.isLoadingAlerts) {
            return (<Loaders.Loader />)
        } else {

            return (
                <View style={styles.mainContainer}>

                    {this.notificationAlerts()}
                    {
                        (this.props.appState.state == STATE.LOADING && this.state.listRefreshing != true) ? <Loaders.Loader /> : null
                    }

                    <NotificationPopUp ref={notification => this.notification = notification} />
                </View>
            )
        }
    }

    notificationAlerts() {

        if (this.state.isLoadingAlerts) {
            return (
                <Loaders.Loader />
            )

        } else if (this.props.appState.state == STATE.INTITAL && this.state.alertsList.length == 0) {

            return (
                <NoResultsPage messageToShow={this.props.appState.errorMessage != '' ? this.props.appState.errorMessage : Locals.NO_RESULTS} />
            )
        } else {

            return (
                <View style={{ flex: 1, width: '100%', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                    <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconHelp.png')} />
                    <FlatList
                        style={{ flex: 1, marginBottom: 10 }}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.SUB_COLOR}
                                onRefresh={() => this.refreshAlertsList(true)}
                                refreshing={this.state.listRefreshing && this.props.appState.state == STATE.LOADING}
                            />
                        }
                        bounces={true}
                        data={this.state.alertsList.length != 0 ? this.state.alertsList : []}
                        keyExtractor={item => JSON.stringify(item.id)}//key for each cell most probably will use the id in real projects
                        renderItem={({ item }) =>
                            <NotificationsPageSections.AlertsSection lang={this.props.appState.lang} alertData={item} cellPressed={() => this.alertCellPressed(item)} />
                        }
                        ListFooterComponent={this.renderFooterComponent}
                        onEndReached={() => { this.refreshAlertsList(false, true) }}
                        onEndReachedThreshold={0.5}
                    />
                    {
                        this.state.listRefreshing == true ? <Loaders.Loader /> : null
                    }
                </View>
            )
        }
    }

    renderFooterComponent = () => {

        if (!this.state.isLoadingMore)
            return null

        return (
            <Loaders.Loader isLoadMoreView={true} />
        )
    }

    alertCellPressed(alertData) {

        // if (this.props.appState.user.userInfo.roleId == ServerStatus.UserRoles.Driver.id) {
        //     if (alertData.objectType != -1) {
        //         switch (alertData.objectType) {
        //             case Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_NOTIFICATION_MESSAGE:
        //                 this.props.navigation.navigate("NotificationDetailsPageContainer", { selectedItemId: alertData.objectId })
        //                 break;
        //             case Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TIMESHEET:
        //                 this.props.navigation.navigate("TimeSheetPageContainer", { didComeFromNotificationPage: true });
        //                 break;
        //             case Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TASKS:
        //                 this.props.navigation.navigate("TasksPage2Container", { notifId: alertData.objectId, didComeFromPushNotification: true, Task1PageKey: this.props.navigation.state.key });
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }
        // }
    }

    refreshAlertsList(isRefreshing, isLoadingMore) {

        // console.log(isLoadingMore)
        // console.log(this.props.appState.canLoadMoreAlerts)
        if (isLoadingMore) {

            if (this.props.appState.canLoadMoreAlerts || this.state.alertsPageNumber == 0) {//is initial load or i can load more
                this.setState({ listRefreshing: isRefreshing, alertsPageNumber: this.state.alertsPageNumber + 1, isLoadingMore: this.props.appState.canLoadMoreAlerts ? isLoadingMore : false }, () => {
                    this.props.getAlerts(this.props.appState.user ? this.props.appState.user.tokenData.accessToken : '', true, this.state.alertsPageNumber)
                })
            }

        } else {
            this.setState({ listRefreshing: isRefreshing, alertsPageNumber: 0, isLoadingMore: false }, () => {

                this.props.getAlerts(this.props.appState.user ? this.props.appState.user.tokenData.accessToken : '', true)
            })
        }
    }

    subTabPressed(id) {
        switch (id) {
            case 0://all
                this.state.notificationRequestsList.forEach((item) => {
                    item.hiddenFromFilter = false;
                })
                this.setState({ subTabSelectedIndex: 0, notificationRequestsList: this.state.notificationRequestsList })
                break;
            case 1://sent
                this.state.notificationRequestsList.forEach((item) => {
                    item.hiddenFromFilter = true;
                    if (item.sender.id == this.props.appState.user.userInfo.contactId) {
                        item.hiddenFromFilter = false
                    }
                })
                this.setState({ subTabSelectedIndex: 1, notificationRequestsList: this.state.notificationRequestsList })
                break;
            case 2://received
                this.state.notificationRequestsList.forEach((item) => {
                    item.hiddenFromFilter = true;
                    if (item.sender.id != this.props.appState.user.userInfo.contactId) {
                        item.hiddenFromFilter = false
                    }
                })
                this.setState({ subTabSelectedIndex: 2, notificationRequestsList: this.state.notificationRequestsList })
                break;
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
    },
    tabContainerStyle: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
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
    notificationRequestTabSubSection: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        width: '100%',
        backgroundColor: Colors.MAIN_COLOR,
        zIndex: 1,
    },
    notificationRequestSubTabSubButton: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.MAIN_COLOR
    },
    notificationRequestSubTabSubText: {
        textAlign: 'center',
        color: Colors.SUB_COLOR,
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 13,
    },
    notificationRequestSubTabIndicator: {
        backgroundColor: Colors.SUB_COLOR,
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: '65%'
    },
    motoIconStyle: {
        position: 'absolute',
        resizeMode: 'contain',
        width: Dimensions.get('screen').width / 2 + 60,
        height: Dimensions.get('screen').width / 2 + 67,
        right: -67,
        bottom: -2,
        overflow: 'hidden'
    },

})