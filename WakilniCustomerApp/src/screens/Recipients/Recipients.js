import React, { Component } from 'react';
import { RefreshControl, StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { Loaders, BadgeButton, Buttons, NoResultsPage, RecipientsCell } from '../../components';
import Orientation from 'react-native-orientation';
import { Colors, Fonts } from '../../constants/general';
import { STATE, ACTION_CUSTOMER } from '../../constants/states';
import Locals from '../../localization/local';

var moment = require('moment');

export default class RecipientsPage extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: Locals.RECIPIENTS,
        headerTitle: (
            <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', width: '100%', textAlign: 'center' }}>{Locals.RECIPIENTS}</Text>
        ),
        headerLeft: (

            <View style={{ paddingHorizontal: 12 }}>
                {
                    Locals.getLanguage() == 'en' ?

                        <View>
                            {
                                navigation.state.params ?
                                    navigation.state.params.mustBeBack ?
                                        <Buttons.BackButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />
                                        :
                                        <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />
                                    :
                                    <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => navigation.goBack()} />

                            }
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
            recipientsList: [],
            canSelectRecipient: false,

            recipientsPageNumber: 0,
            isLoadingMore: false,

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

        if (this.props.navigation.state.params) {
            if (this.props.navigation.state.params.onRecipientPageReturn) {
                this.setState({ canSelectRecipient: true })
                this.props.navigation.setParams({ handleNotificationPress: this.goToNotifications, badgeCount: this.props.appState.badgeCount, language: this.props.appState.lang, mustBeBack: true })
            } else {
                this.props.navigation.setParams({ handleNotificationPress: this.goToNotifications, badgeCount: this.props.appState.badgeCount, language: this.props.appState.lang, mustBeBack: false })
            }
        } else {
            this.props.navigation.setParams({ handleNotificationPress: this.goToNotifications, badgeCount: this.props.appState.badgeCount, language: this.props.appState.lang, mustBeBack: false })
        }

        this.refreshList(false, true);
    }

    renderFooterComponent = () => {

        if (this.props.appState.currentCustomerRecipientPages >= this.props.appState.totalCustomerRecipientPages)
            return null

        return (
            <Loaders.Loader isLoadMoreView={true} />
        )
    }

    refreshList(isRefreshing, isLoadingMore) {

        if (isLoadingMore) {

            if (this.props.appState.canLoadMoreCustomerRecipients || this.state.recipientsPageNumber == 0) {//is initial load or i can load more
                this.setState({ listRefreshing: isRefreshing, recipientsPageNumber: this.state.recipientsPageNumber + 1, isLoadingMore: this.props.appState.canLoadMoreCustomerRecipients ? isLoadingMore : false }, () => {
                    let values = {
                        accessToken: this.props.appState.user.tokenData.accessToken,
                        customerId: this.props.appState.user.userInfo.customerId,
                        pageNumber: this.state.recipientsPageNumber
                    }
                    this.props.getCustomerRecipients(values)
                })
            }

        } else {
            this.setState({ listRefreshing: isRefreshing, recipientsPageNumber: 0, isLoadingMore: false }, () => {
                let values = {
                    accessToken: this.props.appState.user.tokenData.accessToken,
                    customerId: this.props.appState.user.userInfo.customerId,
                }
                this.props.getCustomerRecipients(values)
            })
        }
    }

    componentWillReceiveProps(newProps) {

        //badge listener
        if (this.props.appState.badgeCount != newProps.appState.badgeCount) {
            this.props.navigation.setParams({ badgeCount: newProps.appState.badgeCount })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CUSTOMER.GET_CUSTOMER_RECIPIENTS) {

            this.setState({
                listRefreshing: false,
                isInitalLoading: false,
                isLoadingMore: false,
                recipientsList: newProps.appState.customerRecipients
            })
            this.props.resetState();

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CUSTOMER.GET_CUSTOMER_RECIPIENTS) {

            this.setState({ listRefreshing: false, isInitalLoading: false, isLoadingMore: false })
            this.props.resetState();
        }

        if (newProps.appState.customerRecipients != this.state.recipientsList && this.state.recipientsList.length > 0) {
            this.setState({ recipientsList: newProps.appState.customerRecipients })
        }
    }

    render() {

        return (
            <View style={[styles.mainContainer, { overflow: 'hidden', justifyContent: this.props.appState.state == STATE.LOADING ? 'flex-start' : 'center' }]}>
                <Image style={styles.motoIconStyle} source={require('../../images/common/motoIconHelp.png')} />

                <FlatList
                    style={{ width: '100%', marginBottom: 20 }}
                    contentContainerStyle={{ padding: 20 }}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.SUB_COLOR}
                            onRefresh={() => {
                                this.setState({}, () => {
                                    this.refreshList(true, false)
                                })
                            }}
                            refreshing={this.state.listRefreshing && this.props.appState.state == STATE.LOADING}
                        />
                    }
                    bounces={true}
                    data={this.state.recipientsList.length != 0 ? this.state.recipientsList : []}
                    renderItem={({ item, index }) =>
                        <RecipientsCell
                            key={index}
                            canSelect={this.state.canSelectRecipient}
                            recipient={item}
                            onCellPress={() => {
                                this.props.navigation.state.params.onRecipientPageReturn(item)
                                this.props.navigation.goBack()
                            }}
                        />
                    }
                    ListFooterComponent={this.renderFooterComponent}
                    onEndReached={() => { this.refreshList(false, true) }}
                    onEndReachedThreshold={0.3}
                />

                {
                    this.state.isInitalLoading ?
                        <Loaders.Loader />
                        :
                        null
                }

                {
                    this.state.isInitalLoading == false && this.state.recipientsList.length == 0 ?
                        <NoResultsPage messageToShow={this.props.appState.errorMessage != '' ? this.props.appState.errorMessage : Locals.NO_RESULTS} />
                        :
                        null
                }
            </View>
        );
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