import React, { Component } from 'react';
import { Platform, RefreshControl, StatusBar, Image, StyleSheet, Dimensions, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Loaders, CreateOrder, Buttons, Alerts, NoResultsPage, NotificationPopUp } from '../../components';
import { Colors, Fonts } from '../../constants/general';
import { STATE, ACTION_ORDER, ACTION_LOCATION, ACTION_CONSTANTS, ACTION_CUSTOMER } from '../../constants/states';
import Locals from '../../localization/local';
import Orientation from 'react-native-orientation';
import * as objectTypes from '../../constants/object_types';
import * as localStorage from '../../utils/helpers/localStorage';
import { NavigationActions } from 'react-navigation';

var moment = require('moment')

export default class CreateOrderPage extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: Locals.CREATE_NEW_ORDER,
        headerTitle: (
            <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', width: '100%', textAlign: 'center' }}>{Locals.CREATE_NEW_ORDER}</Text>
        ),
        headerLeft: (

            <View>
                {
                    Locals.getLanguage() == 'en' ?

                        <View style={{ paddingHorizontal: 10 }}>
                            {
                                <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => {
                                    navigation.goBack()
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
                                <Buttons.HomeButton language={Locals.getLanguage()} buttonPressed={() => {
                                    console.log('here')
                                    navigation.goBack()
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
            isLoadingLocations: true,
            isLoadingAreas: true,
            getLocationsError: '',
            getAreasError: '',

            //step 1
            selectedPickUpLocation: null,
            step1Data: null,
            // step1SelectedDate: null,
            // step1SelectedFromTime: null,
            // step1SelectedToTime: null,
            // step1SelectedPaymentType: null,
            // step1SelectedDeliveryPaymentType: null,

            // step 2
            selectedReceiverLocation: null,
            selectedReceiverIndex: 0,
            step2Data: null,
            step3Data: null,
            step4Data: null,
        }

        this.onMainTabPress = this.onMainTabPress.bind(this);
        this.tabToRender = this.tabToRender.bind(this);
        this.dismissAlertMessage = this.dismissAlertMessage.bind(this);
    }

    componentWillMount() {
        Orientation.lockToPortrait();
        this.props.navigation.setParams({ language: this.props.appState.lang })
        let values = {
            customerId: this.props.appState.user.userInfo.customerId,
            accessToken: this.props.appState.user.tokenData.accessToken,
        }
        this.props.getLocations(values)

        if (this.props.appState.areas.length == 0) {
            this.setState({ isLoadingAreas: false }, () => {
                this.props.getAreas()
            })
        } else {
            this.setState({ isLoadingAreas: false })
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_LOCATION.GET_LOCATIONS) {

            if (!this.state.isLoadingLocations) {

                let selectedPickUpLocation = newProps.appState.pickUpLocations.length > 0 ? newProps.appState.pickUpLocations[newProps.appState.pickUpLocations.length - 1] : null
                let selectedReceiverLocation = newProps.appState.receiverLocations.length > 0 ? newProps.appState.receiverLocations[newProps.appState.receiverLocations.length - 1] : null
                this.setState({
                    isLoadingLocations: false,
                    selectedPickUpLocation: selectedPickUpLocation,
                    selectedReceiverLocation: selectedReceiverLocation,
                })
            } else {
                this.setState({ isLoadingLocations: false })
            }

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_LOCATION.GET_LOCATIONS) {
            this.setState({ isLoadingLocations: false, getLocationsError: newProps.appState.errorMessage })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CONSTANTS.GET_AREAS) {

            this.setState({ isLoadingAreas: false })

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CONSTANTS.GET_AREAS) {
            this.setState({ isLoadingAreas: false, getAreasError: newProps.appState.errorMessage })
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_LOCATION.CREATE_LOCATION) {

            let values = {
                customerId: this.props.appState.user.userInfo.customerId,
                accessToken: this.props.appState.user.tokenData.accessToken,
            }
            this.props.getLocations(values)

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_LOCATION.CREATE_LOCATION) {
            this.notification.showNotification(newProps.appState.errorMessage, true)
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_CUSTOMER.CREATE_NEW_RECEIVER) {

            let values = {
                customerId: this.props.appState.user.userInfo.customerId,
                accessToken: this.props.appState.user.tokenData.accessToken,
            }
            this.props.getLocations(values)

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_CUSTOMER.CREATE_NEW_RECEIVER) {
            this.notification.showNotification(newProps.appState.errorMessage, true)
        }

        if (newProps.appState.state === STATE.SUCCESS && newProps.appState.action === ACTION_ORDER.CREATE_ORDERS) {

            if (this.SBAlert) {
                this.SBAlert.showAlert(newProps.appState.successMessage, false)
            }

        } else if (newProps.appState.state === STATE.FAILED && newProps.appState.action === ACTION_ORDER.CREATE_ORDERS) {
            this.notification.showNotification(newProps.appState.errorMessage, true)
        }

    }

    //step 1 actions
    createCustomerLocationPressed(receivedData) {
        let values = {
            accessToken: this.props.appState.user.tokenData.accessToken,
            customerId: this.props.appState.user.userInfo.customerId,
            areaId: receivedData.selectedArea.key,
            typeId: receivedData.selectedType.key,
            building: receivedData.building ? receivedData.building : '',
            coordinates: { latitude: receivedData.selectedCoordinates.latitude, longitude: receivedData.selectedCoordinates.longitude },
            floor: receivedData.floor ? receivedData.floor : '',
            directions: receivedData.directions ? receivedData.directions : '',
            picture: ''
        }
        this.props.createCustomerLocation(values)
    }

    //step 2 actions
    createReceiverPressed(receivedData, receiverIndex, oldPageData) {

        let values = {
            accessToken: this.props.appState.user.tokenData.accessToken,
            customerId: this.props.appState.user.userInfo.customerId,
            firstName: receivedData.firstName,
            lastName: receivedData.lastName,
            phoneNumber: receivedData.phoneNumber,
            secondaryPhoneNumber: receivedData.secondaryPhoneNumber,
            dob: receivedData.dob,
            gender: receivedData.gender,
            email: receivedData.email,
            allowDriverContact: receivedData.allowDriverContact,
            location: {
                latitude: receivedData.selectedCoordinates ? receivedData.selectedCoordinates.latitude : 0.0,
                longitude: receivedData.selectedCoordinates ? receivedData.selectedCoordinates.longitude : 0.0,
                areaId: receivedData.selectedArea.key,
                building: receivedData.building,
                floor: receivedData.floor,
                directions: receivedData.directions,
                typeId: receivedData.selectedType.key
            }
        }

        this.setState({ selectedReceiverIndex: receiverIndex, oldPageData: oldPageData })
        this.props.createNewReceiver(values)
    }


    //general
    backPressed() {
        switch (this.state.mainTabSelectedIndex) {
            case 0://Step 1                
                break;
            case 1://Step 2
                this.setState({ mainTabSelectedIndex: this.state.mainTabSelectedIndex - 1 })
                break;
            case 2://Step 3
                this.setState({ mainTabSelectedIndex: this.state.mainTabSelectedIndex - 1 })
                break;
            case 3://Step 4
                this.setState({ mainTabSelectedIndex: this.state.mainTabSelectedIndex - 1 })
                break;
            default:
                break;
        }
    }
    nextPressed(receivedData) {

        switch (this.state.mainTabSelectedIndex) {
            case 0://Step 1
                if (receivedData) {
                    this.setState({ step1Data: receivedData, step2Data: this.state.step1Data ? this.state.step1Data.selectedPaymentType.id != receivedData.selectedPaymentType.id ? null : this.state.step2Data : null, mainTabSelectedIndex: this.state.mainTabSelectedIndex + 1, selectedReceiverIndex: 0, oldPageData: null })
                }
                break;
            case 1://Step 2
                if (receivedData) {
                    this.setState({ step2Data: receivedData, mainTabSelectedIndex: this.state.mainTabSelectedIndex + 1, selectedReceiverIndex: 0, oldPageData: null })
                }
                break;
            case 2://Step 3
                if (receivedData) {
                    this.setState({ step3Data: receivedData, mainTabSelectedIndex: this.state.mainTabSelectedIndex + 1, selectedReceiverIndex: 0, oldPageData: null })
                }
                break;
            case 3://Step 4
                this.createOrder()
                break;
            default:
                break;
        }
    }

    createOrder() {

        let tempReceiveData = []

        this.state.step2Data.selectedData.forEach((item) => {

            let tempPackages = []

            item.packagesToDeliverList.forEach((pack) => {
                tempPackages.push({
                    new: true,
                    quantity: pack.quantity,
                    typeId: pack.packages.find((packa) => { return packa.isSelected == true }).id,
                    tripNumber: 1
                })
            })

            item.packagesToReturnList.forEach((pack) => {
                tempPackages.push({
                    new: true,
                    quantity: pack.quantity,
                    typeId: pack.packages.find((packa) => { return packa.isSelected == true }).id,
                    tripNumber: 2
                })
            })

            tempReceiveData.push({
                receiverLocationId: item.selectedReceiverLocation.key,
                preferredReceiverDate: moment(item.preferredDate).format('YYYY-MM-DD'),
                preferredReceiverFromTime: item.preferredFrom ? moment(item.preferredFrom).format('hh:mm:ss') : null,
                preferredReceiverToTime: item.preferredTo ? moment(item.preferredTo).format('hh:mm:ss') : null,
                description: item.customNote,
                collectionCurrency: item.selectedCurrencyId,
                collectionTypeId: item.collectionTypes.find((cType) => { return cType.isSelected == true }).id,
                collectionAmount: item.collectionAmount,
                allowReceiverContact: item.allowDriverContact,
                sendReceiverMsg: item.allowSendingDirectMessage,
                wayBill: item.wayBill,
                isSamePackage: this.state.step1Data.selectedPaymentType.id != objectTypes.ORDER.RETURN_TRIP.id ? false : this.state.step2Data.selectedData.filter((item) => { return item.packagesToReturnList.length > 0 }).length > 0 ? true : false,
                packages: tempPackages
            })
        })


        let values = {
            customerId: this.props.appState.user.userInfo.customerId,
            accessToken: this.props.appState.user.tokenData.accessToken,
            orderDetails: {
                senderData: moment(this.state.step1Data.selectedDate).format('YYYY-MM-DD'),
                senderFromTime: this.state.step1Data.selectedFromTime ? moment(this.state.step1Data.selectedFromTime).format('hh:mm:ss') : null,
                senderToTime: this.state.step1Data.selectedToTime ? moment(this.state.step1Data.selectedToTime).format('hh:mm:ss') : null,
                typeId: this.state.step1Data.selectedPaymentType.id,
                // isSamePackage: this.state.step1Data.selectedPaymentType.id != objectTypes.ORDER.RETURN_TRIP.id ? false : this.state.step2Data.selectedData.filter((item) => { return item.packagesToReturnList.length > 0 }).length > 0 ? true : false,
                customerId: this.props.appState.user.userInfo.customerId,
                paymentTypeId: this.state.step1Data.selectedDeliveryPaymentType.id,
                senderLocationId: this.state.step1Data.selectedPickUpLocation.key,
                senderLocationAreaId: this.props.appState.pickUpLocations.find((location) => { return location.id == this.state.step1Data.selectedPickUpLocation.key }).area.id,
                receiveData: tempReceiveData,
                requireSignature: this.state.step3Data.isSignatureRequired,
                requirePicture: this.state.step3Data.isPictureRequired
            }
        }

        this.props.createOrder(values)
    }

    dismissAlertMessage() {
        this.SBAlert.dimissAlert()
        this.props.navigation.goBack()
    }


    onMainTabPress(tabId) {

        // if (tabId != this.state.mainTabSelectedIndex) {
        //     this.setState({ mainTabSelectedIndex: tabId })
        switch (tabId) {
            case 0://Step 1
                // this.step1View.nextPressed()
                break;
            case 1://Step 2
                // this.step2View.nextPressed()
                break;
            case 2://Step 3
                // this.step3View.nextPressed()
                break;
            case 3://Step 4
                // this.step4View.nextPressed()
                break;
            default:
                break;
        }
        // }
    }

    tabToRender(tabId) {
        switch (tabId) {
            case 0://Step 1
                return (
                    <CreateOrder.CreateOrderStep1
                        ref={step1View => this.step1View = step1View}
                        areaList={this.props.appState.areas}
                        constantsList={this.props.appState.constantsList}
                        pickUpLocations={this.props.appState.pickUpLocations}
                        selectedPickUpLocation={this.state.selectedPickUpLocation}
                        step1Data={this.state.step1Data}
                        createCustomerLocationPressed={(receivedData) => { this.createCustomerLocationPressed(receivedData) }}
                        nextPressed={(receivedData) => { this.nextPressed(receivedData) }}
                    />
                )
            case 1://Step 2
                return (
                    <CreateOrder.CreateOrderStep2
                        ref={step2View => this.step2View = step2View}
                        areaList={this.props.appState.areas}
                        constantsList={this.props.appState.constantsList}
                        receiverLocations={this.props.appState.receiverLocations}
                        selectedReceiverLocation={this.state.selectedReceiverLocation}
                        orderTypeId={this.state.step1Data.selectedPaymentType.id}
                        step2Data={this.state.step2Data ? this.state.step2Data.selectedData : null}
                        oldPageData={this.state.oldPageData ? this.state.oldPageData : null}
                        backPressed={() => { this.backPressed() }}
                        selectedReceiverIndex={this.state.selectedReceiverIndex}
                        createReceiverPressed={(receivedData, receiverIndex, oldPageData) => { this.createReceiverPressed(receivedData, receiverIndex, oldPageData) }}
                        showNotification={() => { this.notification.showNotification('Not all required fields are filled', true) }}
                        nextPressed={(receivedData) => { this.nextPressed(receivedData) }}
                    />
                )
            case 2://Step 3
                return (
                    <CreateOrder.CreateOrderStep3
                        ref={step3View => this.step3View = step3View}
                        step3Data={this.state.step3Data}
                        backPressed={() => { this.backPressed() }}
                        nextPressed={(receivedData) => { this.nextPressed(receivedData) }}
                    />
                )
            case 3://Step 4
                return (
                    <CreateOrder.CreateOrderStep4
                        ref={step4View => this.step4View = step4View}
                        step1Data={this.state.step1Data}
                        step2Data={this.state.step2Data ? this.state.step2Data.selectedData : null}
                        step3Data={this.state.step3Data}
                        backPressed={() => { this.backPressed() }}
                        nextPressed={(receivedData) => { this.nextPressed(receivedData) }}
                    />
                )
            default:
                return (null)
        }
    }

    render() {
        if (this.state.isLoadingAreas || this.state.isLoadingLocations) {
            return (<Loaders.Loader />)
        } else if (!this.state.isInitialLoad && this.state.getLocationsError != '' && this.state.getAreasError != '') {
            return (<NoResultsPage messageToShow={this.state.getLocationsError} />)
        } else {

            if (this.props.appState.user) {
                return (
                    <View style={styles.mainContainer}>
                        <View style={styles.tabContainerStyle}>
                            <TouchableOpacity activeOpacity={1} style={styles.tabStyle} onPress={() => this.onMainTabPress(0)}>
                                <Text style={this.state.mainTabSelectedIndex == 0 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP1}</Text>
                                <View style={this.state.mainTabSelectedIndex == 0 ? [styles.indicatorStyle, { width: '100%' }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: 0 }]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={styles.tabStyle} onPress={() => this.onMainTabPress(1)}>
                                <Text style={this.state.mainTabSelectedIndex == 1 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP2}</Text>
                                <View style={this.state.mainTabSelectedIndex == 1 ? [styles.indicatorStyle, { width: '100%' }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: 0 }]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={styles.tabStyle} onPress={() => this.onMainTabPress(2)}>
                                <Text style={this.state.mainTabSelectedIndex == 2 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP3}</Text>
                                <View style={this.state.mainTabSelectedIndex == 2 ? [styles.indicatorStyle, { width: '100%' }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: 0 }]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} style={styles.tabStyle} onPress={() => this.onMainTabPress(3)}>
                                <Text style={this.state.mainTabSelectedIndex == 3 ? styles.tabLabelStyle : [styles.tabLabelStyle, { color: Colors.TEXT_COLOR }]}>{Locals.CREATE_ORDER_STEP4}</Text>
                                <View style={this.state.mainTabSelectedIndex == 3 ? [styles.indicatorStyle, { width: '100%' }] : [styles.indicatorStyle, { backgroundColor: 'transparent', width: 0 }]}></View>
                            </TouchableOpacity>
                        </View>

                        {this.tabToRender(this.state.mainTabSelectedIndex)}

                        {
                            this.props.appState.state == STATE.LOADING ? <Loaders.Loader /> : null
                        }

                        <Alerts.SingleButtonAlert
                            ref={SBAlert => this.SBAlert = SBAlert}
                            language={this.props.appState.lang}
                            dismissAlert={this.dismissAlertMessage}
                        />

                        <NotificationPopUp ref={notification => this.notification = notification} />
                    </View>
                )
            } else {
                return (
                    <Loaders.Loader />
                )
            }
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
        alignItems: 'center'
    },
    tabStyle: {
        flexDirection: 'column',
        flex: 4,
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
        fontSize: 15,
    },
})