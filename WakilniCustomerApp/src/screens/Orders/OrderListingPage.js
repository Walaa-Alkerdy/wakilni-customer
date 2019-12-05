import React, { Component } from 'react';
import { Platform, Dimensions, RefreshControl, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {
    Loaders, BadgeButton, Buttons, OrdersPageSections,
    NoResultsPage, Alerts, RadioButton
} from '../../components';
import Orientation from 'react-native-orientation';
import { Colors, Fonts } from '../../constants/general';
import { STATE, ACTION_ORDER, ACTION_CONSTANTS, ACTION_CUSTOMER } from '../../constants/states';
import Locals from '../../localization/local';
import { OrderStatus } from '../../constants/server_states';

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
            filterIndex: 0,
            ordersList: [],

            selectedStartDate: moment(new Date()).format("DD/MM/YYYY"),
            selectedEndDate: moment(new Date()).format("DD/MM/YYYY"),

            ordersPageNumber: 0,
            isLoadingMore: false,

            // filter related 
            wayBill: '',
            statuses: [
                {
                    key: -1,
                    value: 'All Statuses'
                },
                {
                    key: OrderStatus.ORDER_STATUS_PENDING.key,
                    value: OrderStatus.ORDER_STATUS_PENDING.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_CONFIRMED.key,
                    value: OrderStatus.ORDER_STATUS_CONFIRMED.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_DECLINED.key,
                    value: OrderStatus.ORDER_STATUS_DECLINED.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_CANCELED.key,
                    value: OrderStatus.ORDER_STATUS_CANCELED.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_PROCESSING.key,
                    value: OrderStatus.ORDER_STATUS_PROCESSING.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_SUCCESS.key,
                    value: OrderStatus.ORDER_STATUS_SUCCESS.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_FAILED.key,
                    value: OrderStatus.ORDER_STATUS_FAILED.label
                },
                {
                    key: OrderStatus.ORDER_STATUS_CLOSED_FAILED.key,
                    value: OrderStatus.ORDER_STATUS_CLOSED_FAILED.label
                }
            ],
            selectedStatus: {
                key: -1,
                value: 'All Statuses'
            },
            orderTypes: [],
            selectedOrderType: {
                key: -1,
                value: 'All Types'
            },
            recipients: [],
            selectedRecipient: null,
            createdOn: null,
            createdTill: null,
            completedOn: null,
            completedTill: null,

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

        if (this.props.appState
            && this.props.appState.constantsList
            && this.props.appState.constantsList.length > 0) {
            this.setState({ orderTypes: this.props.appState.constantsList.orderTypes })
        }

        this.refreshList(false, true, this.state.selectedStartDate, this.state.selectedEndDate);
        // let values = {
        //     accessToken: this.props.appState.user.tokenData.accessToken,
        //     customerId: this.props.appState.user.userInfo.customerId,
        // }
        // this.props.getCustomerRecipients(values)

    }

    renderFooterComponent = () => {

        if (!this.state.isLoadingMore || this.state.isInitalLoading)
            return null

        return (
            <Loaders.Loader isLoadMoreView={true} />
        )
    }

    refreshList(isRefreshing, isLoadingMore, fromDate, toDate) {

        if (isLoadingMore) {

            if (this.props.appState.canLoadMoreOrders || this.state.ordersPageNumber == 0) {//is initial load or i can load more
                this.setState({ isFiltering: false, listRefreshing: isRefreshing, ordersPageNumber: this.state.ordersPageNumber + 1, isLoadingMore: this.props.appState.canLoadMoreOrders ? isLoadingMore : false }, () => {
                    let values = {
                        isHistory: this.state.filterIndex == 1,
                        accessToken: this.props.appState.user.tokenData.accessToken,
                        id: this.props.appState.user.userInfo.customerId,
                        pageNumber: this.state.ordersPageNumber,
                    }
                    this.props.getOrdersOrHistory(values)
                })
            }

        } else {
            this.setState({

                //reset
                wayBill: '',
                selectedStatus: {
                    key: -1,
                    value: 'All Statuses'
                },
                selectedOrderType: {
                    key: -1,
                    value: 'All Types'
                },
                selectedRecipient: null,
                createdOn: null,
                createdTill: null,
                completedOn: null,
                completedTill: null,

                isFiltering: false,
                listRefreshing: isRefreshing,
                ordersPageNumber: 0,
                isLoadingMore: false
            }, () => {
                let values = {
                    isHistory: this.state.filterIndex == 1,
                    accessToken: this.props.appState.user.tokenData.accessToken,
                    id: this.props.appState.user.userInfo.customerId,
                }
                this.props.getOrdersOrHistory(values)
            })
        }
    }

    refreshListWithFilter(isRefreshing, isLoadingMore, fromDate, toDate) {

        if (isLoadingMore) {

            if (this.props.appState.canLoadMoreOrders || this.state.ordersPageNumber == 0) {//is initial load or i can load more
                this.setState({ isFiltering: true, listRefreshing: isRefreshing, ordersPageNumber: this.state.ordersPageNumber + 1, isLoadingMore: this.props.appState.canLoadMoreOrders ? isLoadingMore : false }, () => {
                    let values = {
                        isHistory: this.state.filterIndex == 1,
                        accessToken: this.props.appState.user.tokenData.accessToken,
                        id: this.props.appState.user.userInfo.customerId,
                        pageNumber: this.state.ordersPageNumber,
                        wayBill: this.state.wayBill,
                        selectedOrderType: this.state.selectedOrderType,
                        selectedStatus: this.state.selectedStatus,
                        selectedRecipient: this.state.selectedRecipient,
                        createdOn: this.state.createdOn ? moment(this.state.createdOn).format('YYYY-MM-D') : null,
                        createdTill: this.state.createdTill ? moment(this.state.createdTill).format('YYYY-MM-D') : null,
                        completedOn: this.state.completedOn ? moment(this.state.completedOn).format('YYYY-MM-D') : null,
                        completedTill: this.state.completedTill ? moment(this.state.completedTill).format('YYYY-MM-D') : null,
                        isFiltering: true
                    }
                    this.props.getOrdersOrHistory(values)
                })
            }

        } else {
            this.setState({ isFiltering: true, listRefreshing: isRefreshing, ordersPageNumber: 0, isLoadingMore: false }, () => {
                let values = {
                    isHistory: this.state.filterIndex == 1,
                    accessToken: this.props.appState.user.tokenData.accessToken,
                    id: this.props.appState.user.userInfo.customerId,
                    wayBill: this.state.wayBill,
                    selectedOrderType: this.state.selectedOrderType,
                    selectedStatus: this.state.selectedStatus,
                    selectedRecipient: this.state.selectedRecipient,
                    createdOn: this.state.createdOn ? moment(this.state.createdOn).format('YYYY-MM-D') : null,
                    createdTill: this.state.createdTill ? moment(this.state.createdTill).format('YYYY-MM-D') : null,
                    completedOn: this.state.completedOn ? moment(this.state.completedOn).format('YYYY-MM-D') : null,
                    completedTill: this.state.completedTill ? moment(this.state.completedTill).format('YYYY-MM-D') : null,
                    isFiltering: true,
                }
                this.props.getOrdersOrHistory(values)
            })
        }
    }

    componentWillReceiveProps(newProps) {

        //badge listener
        if (this.props.appState.badgeCount != newProps.appState.badgeCount) {
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_ORDER.GET_ORDERS) {

            this.setState({
                listRefreshing: false,
                isInitalLoading: false,
                isLoadingMore: false,
                // ordersList: newProps.appState.customerOrders.sort((a, b) => { return b.id - a.id })
                ordersList: newProps.appState.customerOrders
            })
            this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_ORDER.GET_ORDERS) {

            this.setState({ listRefreshing: false, isInitalLoading: false, isLoadingMore: false })
            this.props.resetState();
        }

        if (this.state.orderTypes.length == 0) {
            this.setState({ orderTypes: newProps.appState.constantsList.orderTypes })
        }
        if (newProps.appState.customerOrders != this.state.ordersList && this.state.ordersList.length > 0) {
            this.setState({ ordersList: newProps.appState.customerOrders })
        }
    }

    render() {

        return (
            <View style={[styles.mainContainer, { overflow: 'hidden', justifyContent: this.props.appState.state == STATE.LOADING ? 'flex-start' : 'center' }]}>
                <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconHelp.png')} />

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, paddingHorizontal: 20 }}>
                    <Buttons.RoundCornerButton
                        buttonStyle={[styles.button, { width: null, flex: 1, shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]}
                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 14 }}
                        label={Locals.CLEAR_FILTERS}
                        sectionPressed={() => {
                            if (this.state.isFiltering) {
                                this.refreshList(true, false, this.state.selectedStartDate, this.state.selectedEndDate)
                            }
                        }}
                    />
                    <Buttons.RoundCornerButton
                        buttonStyle={[styles.button, { width: null, flex: 1, marginLeft: 8 }]}
                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 14 }}
                        label={Locals.BUTTON_FILTER}
                        sectionPressed={() => {
                            this.orderFilter.show(this.state.wayBill, this.state.statuses, this.state.orderTypes, this.state.selectedStatus, this.state.selectedOrderType, this.state.selectedRecipient, this.state.createdOn, this.state.createdTill, this.state.completedOn, this.state.completedTill)
                        }}
                    />
                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, paddingHorizontal: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <RadioButton
                        buttonStyle={[{ width: '50%', shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]}
                        textStyle={{ color: '#333333', fontFamily: Fonts.MAIN_FONT, fontSize: 14 }}
                        label={Locals.ACTIVE_ORDERS}
                        isSelected={this.state.filterIndex == 0}
                        onPress={() => {
                            if (this.state.filterIndex != 0) {
                                this.setState({ filterIndex: 0 }, () => {
                                    this, this.refreshList(true, false, Date(), Date());
                                })
                            }
                        }}
                    />
                    <RadioButton
                        buttonStyle={[{ width: '50%', marginLeft: 8 }]}
                        textStyle={{ color: '#333333', fontFamily: Fonts.MAIN_FONT, fontSize: 14 }}
                        label={Locals.ORDER_HISTORY}
                        isSelected={this.state.filterIndex == 1}
                        onPress={() => {
                            if (this.state.filterIndex != 1) {
                                this.setState({ filterIndex: 1 }, () => {
                                    this, this.refreshList(true, false, Date(), Date());
                                });
                            }
                        }}
                    />
                </View>

                <FlatList
                    style={{ marginTop: 20, marginBottom: 20 }}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.SUB_COLOR}
                            onRefresh={() => {
                                this.setState({}, () => {
                                    this.refreshList(true, false, this.state.selectedStartDate, this.state.selectedEndDate)
                                })
                            }}
                            refreshing={this.state.listRefreshing && this.props.appState.state == STATE.LOADING}
                        />
                    }
                    ListEmptyComponent={() => {
                        var message = this.props.appState.errorMessage;
                        if (this.props.appState.errorMessage == '') {
                            message = Locals.NO_RESULTS
                        }
                        return <NoResultsPage messageToShow={message} />
                    }}
                    bounces={true}
                    centerContent={this.state.ordersList.length == 0}
                    data={this.state.ordersList}
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
                    ListFooterComponent={this.renderFooterComponent}
                    onEndReached={() => { this.state.isFiltering ? this.refreshListWithFilter(false, true, this.state.selectedStartDate, this.state.selectedEndDate) : this.refreshList(false, true, this.state.selectedStartDate, this.state.selectedEndDate) }}
                    onEndReachedThreshold={0.5}
                />

                {
                    this.state.isInitalLoading || this.state.isRefreshing || this.props.appState.state == STATE.LOADING ?
                        <Loaders.Loader />
                        :
                        null
                }
                <Alerts.OrderFiltersPopUp
                    ref={orderFilter => this.orderFilter = orderFilter}
                    confirmPressed={this.filterConfirmPressed}
                    selectedRecipient={this.state.selectedRecipient}
                    onRecipientPress={this.moveToRecipientPage}
                />
            </View>
        );
    }

    moveToRecipientPage = () => {

        this.props.navigation.navigate({ routeName: 'RecipientsContainer', params: { onRecipientPageReturn: this.onRecipientPageReturn } })
    }

    onRecipientPageReturn = (selectedRecipient) => {
        this.setState({ selectedRecipient: selectedRecipient })
    }

    filterConfirmPressed = (values) => {

        if (values.waybill == '' && values.selectedOrderType == null && values.selectedStatus == null && values.selectedRecipient == null && values.fromCreatedDate == null && values.toCreatedDate == null && values.fromCompletedDate == null && values.toCompletedDate == null) {
            return;
        }

        this.setState({
            wayBill: values.waybill,
            selectedOrderType: values.selectedOrderType ? values.selectedOrderType.key == -1 ? null : values.selectedOrderType : null,
            selectedStatus: values.selectedStatus ? values.selectedStatus.key == -1 ? null : values.selectedStatus : null,
            selectedRecipient: values.selectedRecipient,
            createdOn: values.fromCreatedDate,
            createdTill: values.toCreatedDate,
            completedOn: values.fromCompletedDate,
            completedTill: values.toCompletedDate,
        }, () => {
            // send filter request
            this.refreshListWithFilter(true, false, this.state.selectedStartDate, this.state.selectedEndDate)
        })
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
    button: {
        backgroundColor: Colors.SUB_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderColor: Colors.SUB_COLOR,
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
})