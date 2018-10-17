import React, { Component } from 'react';
import { Platform, RefreshControl, StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { Loaders, BadgeButton, Buttons, OrdersPageSections, NoResultsPage } from '../../components';
import Orientation from 'react-native-orientation';
import { Colors, Fonts } from '../../constants/general';
import { STATE, ACTION_ORDER } from '../../constants/states';
import Locals from '../../localization/local';

var moment = require('moment');

export default class OrderListingPage extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: Locals.ORDERS_PAGE,
        headerTitle: (
            <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', width: '100%', textAlign: 'center' }}>{Locals.ORDERS_PAGE}</Text>
        ),
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
            ordersList: [],

            selectedStartDate: moment(new Date()).format("DD/MM/YYYY"),
            selectedEndDate: moment(new Date()).format("DD/MM/YYYY"),

            listRefreshing: false,
            isInitalLoading: true
        }

        this.refreshList = this.refreshList.bind(this);
        this.goToNotifications = this.goToNotifications.bind(this);
    }

    goToNotifications() {

        this.props.navigation.navigate("NotificationsPageContainer");
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        this.props.navigation.setParams({ handleNotificationPress: this.goToNotifications, badgeCount: this.props.appState.badgeCount, language: this.props.appState.lang })

        this.refreshList(false, this.state.selectedStartDate, this.state.selectedEndDate);
    }

    refreshList(isRefreshing, fromDate, toDate) {

        this.setState({ listRefreshing: isRefreshing }, () => {
            let values = {
                accessToken: this.props.appState.user.tokenData.accessToken,
                id: this.props.appState.user.userInfo.customerId,
            }
            this.props.getOrders(values)
        })
    }

    componentWillReceiveProps(newProps) {

        //badge listener
        if (this.props.appState.badgeCount != newProps.appState.badgeCount) {
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_ORDER.GET_ORDERS) {

            this.setState({ listRefreshing: false, isInitalLoading: false, ordersList: newProps.appState.customerOrders.sort((a, b) => { return b.id - a.id }) })
            this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_ORDER.GET_ORDERS) {

            this.setState({ listRefreshing: false, isInitalLoading: false })
            this.props.resetState();
        }

        if (newProps.appState.customerOrders != this.state.ordersList && this.state.ordersList.length > 0) {
            this.setState({ ordersList: newProps.appState.customerOrders })
        }
    }

    render() {

        if (this.state.isInitalLoading) {
            return (
                <Loaders.Loader />
            )
        } else if (this.props.appState.state != STATE.LOADING && this.state.ordersList.length == 0 && this.props.appState.errorMessage != '') {
            return (
                <NoResultsPage messageToShow={this.props.appState.errorMessage} />
            )
        } else {
            return (
                <View style={[styles.mainContainer, { overflow: 'hidden', justifyContent: this.props.appState.state == STATE.LOADING ? 'flex-start' : 'center' }]}>
                    <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconHelp.png')} />

                    {
                        this.props.appState.state == STATE.LOADING ? <Loaders.Loader />
                            :
                            this.state.ordersList.length == 0 ?
                                <View style={{ flex: 1, width: '100%', marginTop: 10, marginBottom: 50 }}>
                                    <NoResultsPage messageToShow={this.props.appState.errorMessage != '' ? this.props.appState.errorMessage : Locals.NO_RESULTS} />
                                </View>
                                :
                                <FlatList
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                    refreshControl={
                                        <RefreshControl
                                            tintColor={Colors.SUB_COLOR}
                                            onRefresh={() => {
                                                this.setState({}, () => {
                                                    this.refreshList(true, this.state.selectedStartDate, this.state.selectedEndDate)
                                                })
                                            }}
                                            refreshing={this.state.listRefreshing && this.props.appState.state == STATE.LOADING}
                                        />
                                    }
                                    bounces={true}
                                    data={this.state.ordersList.length != 0 ? this.state.ordersList : []}
                                    keyExtractor={item => JSON.stringify(item.id)}//key for each cell most probably will use the id
                                    renderItem={({ item, index }) =>
                                        <OrdersPageSections
                                            key={item.id}
                                            lang={this.props.appState.lang}
                                            order={item}
                                            currentIndex={index}
                                            isFirst={index == 0}
                                        />
                                    }
                                />
                    }
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    headerSection: {
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#f0f0f0'
    },
    dateSection: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 30,
        marginBottom: 15,
        marginLeft: 25,
        marginRight: 25
    },
    dateStyle: {
        marginRight: 15,
        fontFamily: Fonts.MAIN_FONT
    },
    dateButtons: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 30,
        minWidth: (Dimensions.get('screen').width / 2.5) - 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    filtersTabSection: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        width: '100%',
        zIndex: 1,
    },
    filtersSubTabSection: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.MAIN_COLOR
    },
    filtersSubTabSectionText: {
        textAlign: 'center',
        color: Colors.SUB_COLOR,
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 13,
    },
    filtersSubTabSectionIndicator: {
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