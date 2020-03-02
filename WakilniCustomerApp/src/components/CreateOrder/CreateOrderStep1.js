import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { Calendar } from 'react-native-calendars';
import Autocomplete from 'react-native-autocomplete-input';
import { Pickers, Alerts, Buttons } from '../../components';
import Locals from '../../localization/local';
import * as objectTypes from '../../constants/object_types';
import { SelectionType } from '../alertPopups/LocationPrompt';

var moment = require('moment')

export default class CreateOrderStep1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            mustHideLocationsDropList: true,
            paymentTypes: [],
            deliveryPaymentTypes: [],
            preferredDate: new Date(),
            isDatePickerVisible: false,

            isInitialPreferredFrom: true,
            preferredFrom: new Date(),
            isInitialPreferredTo: true,
            preferredTo: new Date(),
            isTimePickerVisible: false,
            isSelectingFromTime: false,

            pickUpLocations: [],
            selectedPickUpLocation: null,
        }
    }

    componentWillMount() {
        this.prepareData(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.prepareData(newProps)
    }

    prepareData(data) {
        let paymentTypes = []
        let deliveryPaymentTypes = []
        let pickUpLocations = []

        if (data.constantsList) {
            data.constantsList.orderTypes.forEach((orderType, index) => {
                orderType.isSelected = false
                if (orderType.id == objectTypes.ORDER.ONE_WAY_TRIP.id || orderType.id == objectTypes.ORDER.BULK_TRIP.id || orderType.id == objectTypes.ORDER.RETURN_TRIP.id) {

                    let temp = orderType
                    temp.name = this.getName(orderType, 0)
                    temp.isNotSelectedIcon = this.getImage(orderType, 0, false)
                    temp.isSelectedIcon = this.getImage(orderType, 0, true)

                    if (data.step1Data) {

                        if (orderType.id == data.step1Data.selectedPaymentType.id) {
                            temp.isSelected = true
                        }

                    } else {
                        if (index == 0) {
                            temp.isSelected = true
                        }
                    }
                    paymentTypes.push(temp)
                }
            })

            data.constantsList.paymentMethodTypes.forEach((paymentMethodType, index) => {
                paymentMethodType.isSelected = false
                // || paymentMethodType.id == objectTypes.PAYMENT_METHOD.CREDIT_CARD.id || paymentMethodType.id == objectTypes.PAYMENT_METHOD.CREDIT_CARD2.id || paymentMethodType.id == objectTypes.PAYMENT_METHOD.CREDIT_CARD3.id
                if (paymentMethodType.id == objectTypes.PAYMENT_METHOD.ON_ACCOUNT.id || paymentMethodType.id == objectTypes.PAYMENT_METHOD.CASH_ON_DELIVERY.id || paymentMethodType.id == objectTypes.PAYMENT_METHOD.CASH_ON_PICKUP.id) {
                    let temp = paymentMethodType
                    temp.name = this.getName(paymentMethodType, 1)
                    temp.isNotSelectedIcon = this.getImage(paymentMethodType, 1, false)
                    temp.isSelectedIcon = this.getImage(paymentMethodType, 1, true)

                    if (data.step1Data) {

                        if (paymentMethodType.id == data.step1Data.selectedDeliveryPaymentType.id) {
                            temp.isSelected = true
                        }

                    } else {
                        if (index == 0) {
                            temp.isSelected = true
                        }
                    }
                    deliveryPaymentTypes.push(temp)
                }
            })
        }

        data.pickUpLocations.forEach((location) => {

            pickUpLocations.push({
                key: location.id,
                value: location.location
            })
        })
        console.log(pickUpLocations);
        this.setState({
            deliveryPaymentTypes: deliveryPaymentTypes,
            paymentTypes: paymentTypes,
            pickUpLocations: pickUpLocations,
            selectedPickUpLocation: data.step1Data ? {
                key: data.step1Data.selectedPickUpLocation.key,
                value: data.step1Data.selectedPickUpLocation.value
            } : data.selectedPickUpLocation ? {
                key: data.selectedPickUpLocation.id ? data.selectedPickUpLocation.id : data.selectedPickUpLocation.key ? data.selectedPickUpLocation.key : -1,
                value: data.selectedPickUpLocation.location ? data.selectedPickUpLocation.location : data.selectedPickUpLocation.value ? data.selectedPickUpLocation.value : ''
            } : null,
            preferredDate: data.step1Data ? data.step1Data.selectedDate ? data.step1Data.selectedDate : new Date() : new Date(),
            preferredFrom: data.step1Data ? data.step1Data.selectedFromTime ? data.step1Data.selectedFromTime : new Date() : new Date(),
            preferredTo: data.step1Data ? data.step1Data.selectedToTime ? data.step1Data.selectedToTime : new Date() : new Date(),
            isInitialPreferredFrom: data.step1Data ? data.step1Data.selectedFromTime ? false : true : true,
            isInitialPreferredTo: data.step1Data ? data.step1Data.selectedToTime ? false : true : true,
        }, () => {
        })
    }

    getName(item, type) {
        let final = ''
        if (type == 0) {//order types

            switch (item.id) {
                case objectTypes.ORDER.ONE_WAY_TRIP.id:
                    final = Locals.CREATE_ORDER_PAYMENT_TYPE_1
                    break
                case objectTypes.ORDER.BULK_TRIP.id:
                    final = Locals.CREATE_ORDER_PAYMENT_TYPE_2
                    break
                case objectTypes.ORDER.RETURN_TRIP.id:
                    final = Locals.CREATE_ORDER_PAYMENT_TYPE_3
                    break
                case objectTypes.ORDER.PIGGY_BANK_TRIP.id:
                    final = Locals.CREATE_ORDER_PAYMENT_TYPE_1
                    break
                default:
                    final = Locals.CREATE_ORDER_PAYMENT_TYPE_1
                    break
            }


        } else if (type == 1) {//paymentMethod types
            switch (item.id) {
                case objectTypes.PAYMENT_METHOD.ON_ACCOUNT.id:
                    final = Locals.CREATE_ORDER_DELIVERY_PAYMENT_TYPE_1
                    break
                case objectTypes.PAYMENT_METHOD.CASH_ON_DELIVERY.id:
                    final = Locals.CREATE_ORDER_DELIVERY_PAYMENT_TYPE_2
                    break
                case objectTypes.PAYMENT_METHOD.CASH_ON_PICKUP.id:
                    final = Locals.CREATE_ORDER_DELIVERY_PAYMENT_TYPE_3
                    break
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD.id:
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD2.id:
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD3.id:
                    final = Locals.CREATE_ORDER_DELIVERY_PAYMENT_TYPE_4
                    break
                default:
                    final = Locals.CREATE_ORDER_DELIVERY_PAYMENT_TYPE_1
                    break
            }
        }

        return final
    }

    getImage(item, type, isSelectedType) {

        if (type == 0) {//order types

            switch (item.id) {
                case objectTypes.ORDER.ONE_WAY_TRIP.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderOneWay.png') : require('../../images/createOrder/createOrderOneWay2.png')
                case objectTypes.ORDER.BULK_TRIP.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderBulk.png') : require('../../images/createOrder/createOrderBulk2.png')
                case objectTypes.ORDER.RETURN_TRIP.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderReturn.png') : require('../../images/createOrder/createOrderReturn2.png')
                case objectTypes.ORDER.PIGGY_BANK_TRIP.id:
                // return isSelectedType ? require('../../images/createOrder/createOrderOneWay.png') : require('../../images/createOrder/createOrderOneWay2.png')
                default:
                    return isSelectedType ? require('../../images/createOrder/createOrderOneWay.png') : require('../../images/createOrder/createOrderOneWay2.png')
            }


        } else if (type == 1) {//paymentMethod types
            switch (item.id) {
                case objectTypes.PAYMENT_METHOD.ON_ACCOUNT.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderAvatar.png') : require('../../images/createOrder/createOrderAvatar2.png')
                case objectTypes.PAYMENT_METHOD.CASH_ON_DELIVERY.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderOnDelivery.png') : require('../../images/createOrder/createOrderOnDelivery2.png')
                case objectTypes.PAYMENT_METHOD.CASH_ON_PICKUP.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderCashOn.png') : require('../../images/createOrder/createOrderCashOn2.png')
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD.id:
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD2.id:
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD3.id:
                    return isSelectedType ? require('../../images/createOrder/createOrderCreditCard.png') : require('../../images/createOrder/createOrderCreditCard2.png')
                default:
                    return isSelectedType ? require('../../images/createOrder/createOrderAvatar.png') : require('../../images/createOrder/createOrderAvatar.png')
            }
        }

    }

    showLocationDialog = () => {
        this.locationPrompt.show()
        return
        Alert.alert("New Location", "What would you like to add?", [
            {
                text: 'My location',
                onPress: () => {
                    this.newLocationPopUp.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList)
                }
            },
            {
                text: 'Other',
                onPress: () => {
                    this.newReceiverPopup.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList)
                }
            }
        ], 'default')
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    nestedScrollEnabled
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    style={{ backgroundColor: '#f0f0f0', height: '100%', width: '100%', padding: 20 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>

                    <View style={[styles.mainContainer, { flex: 1, height: '100%', justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }, Platform.OS == 'ios' ? {} : { marginBottom: 30 }]}>

                        <View style={[styles.mainContainer, { justifyContent: 'flex-start', backgroundColor: 'transparent', marginBottom: 20 }]}>
                            <Text style={styles.headerStyle}>{Locals.CREATE_ORDER_STEP1_SUBTITLE}</Text>

                            <View style={styles.innerContainer}>
                                {/* Payment Types section */}
                                <Text style={[styles.subHeaders, { marginTop: 0 }]}>{Locals.CREATE_ORDER_PAYMENT_TYPE}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                    {
                                        this.state.paymentTypes.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    style={[{
                                                        marginTop: 5,
                                                        width: (Dimensions.get('screen').width - 40 - 20) / 3,
                                                        height: 80,
                                                        borderTopRightRadius: index % 2 == 0 && index != 0 ? 5 : 0,
                                                        borderBottomRightRadius: index % 2 == 0 && index != 0 ? 5 : 0,
                                                        borderTopLeftRadius: index % 3 == 0 || index == 0 ? 5 : 0,
                                                        borderBottomLeftRadius: index % 3 == 0 || index == 0 ? 5 : 0,
                                                        borderRightColor: '#c4c4c4',
                                                        borderRightWidth: index % 2 != 0 || index == 0 ? 0.5 : 0,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: item.isSelected ? Colors.SUB_COLOR : '#ffffff',
                                                        shadowColor: '#919191',
                                                        shadowOffset: { width: 2, height: 2 },
                                                        shadowOpacity: 0.5,
                                                        shadowRadius: 2,
                                                        elevation: 1
                                                    }]}
                                                    key={index}
                                                    onPress={() => {
                                                        let temp = this.state.paymentTypes
                                                        temp.forEach((type) => {
                                                            type.isSelected = false
                                                            if (type.id == item.id) {
                                                                type.isSelected = true
                                                            }
                                                        })

                                                        this.setState({ paymentTypes: temp }, () => { })
                                                    }}
                                                >
                                                    <Image source={item.isSelected ? item.isSelectedIcon : item.isNotSelectedIcon} style={{ width: 15, height: 15, resizeMode: 'contain', marginBottom: 5 }} />
                                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, color: item.isSelected ? '#ffffff' : '#929292', textAlign: 'center' }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                                {/* Delivery Payment Types section */}
                                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_DELIVERY_PAYMENT_TYPE}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                    {
                                        this.state.deliveryPaymentTypes.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    style={[{
                                                        marginTop: 5,
                                                        width: (Dimensions.get('screen').width - 40 - 20) / 3,
                                                        height: 80,
                                                        borderTopRightRadius: index % 2 == 0 && index != 0 ? 5 : 0,
                                                        borderBottomRightRadius: index % 2 == 0 && index != 0 ? 5 : 0,
                                                        borderTopLeftRadius: index % 3 == 0 || index == 0 ? 5 : 0,
                                                        borderBottomLeftRadius: index % 3 == 0 || index == 0 ? 5 : 0,
                                                        borderRightColor: '#c4c4c4',
                                                        borderRightWidth: index % 2 != 0 || index == 0 ? 0.5 : 0,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: item.isSelected ? Colors.SUB_COLOR : '#ffffff',
                                                        shadowColor: '#919191',
                                                        shadowOffset: { width: 2, height: 2 },
                                                        shadowOpacity: 0.5,
                                                        shadowRadius: 2,
                                                        elevation: 1

                                                        // in case 4 are displayed
                                                        // marginTop: 5,
                                                        // width: (Dimensions.get('screen').width - 40 - 20) / 4,
                                                        // height: 90,
                                                        // borderTopRightRadius: index % 3 == 0 && index != 0 ? 5 : 0,
                                                        // borderBottomRightRadius: index % 3 == 0 && index != 0 ? 5 : 0,
                                                        // borderTopLeftRadius: index % 4 == 0 || index == 0 ? 5 : 0,
                                                        // borderBottomLeftRadius: index % 4 == 0 || index == 0 ? 5 : 0,
                                                        // justifyContent: 'center',
                                                        // borderRightColor: '#c4c4c4',
                                                        // borderRightWidth: index % 4 != 0 || index == 0 ? 0.5 : 0,
                                                        // alignItems: 'center',
                                                        // backgroundColor: item.isSelected ? Colors.SUB_COLOR : '#ffffff',
                                                        // shadowColor: '#919191',
                                                        // shadowOffset: { width: 2, height: 2 },
                                                        // shadowOpacity: 0.5,
                                                        // shadowRadius: 2,
                                                        // elevation: 1
                                                    }]}
                                                    key={index}
                                                    onPress={() => {
                                                        let temp = this.state.deliveryPaymentTypes
                                                        temp.forEach((type) => {
                                                            type.isSelected = false
                                                            if (type.id == item.id) {
                                                                type.isSelected = true
                                                            }
                                                        })
                                                        // LOG HERE
                                                        this.setState({ deliveryPaymentTypes: temp })
                                                    }}
                                                >
                                                    <Image source={item.isSelected ? item.isSelectedIcon : item.isNotSelectedIcon} style={{ width: 15, height: 15, resizeMode: 'contain', marginBottom: 5 }} />
                                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, color: item.isSelected ? '#ffffff' : '#929292', textAlign: 'center' }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                                {/* Pickup Location section */}
                                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_PICKUP_LOCATION}</Text>
                                <View style={[{ zIndex: 100, flexDirection: 'row', minHeight: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },]}>
                                    <Autocomplete
                                        inputContainerStyle={{ borderColor: 'transparent', borderWidth: 0, width: Dimensions.get('screen').width - 110 }}
                                        style={[{
                                            paddingHorizontal: 10, width: '100%', marginRight: 15, backgroundColor: '#f0f0f0', borderRadius: 5, justifyContent: 'center', height: 40, fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', fontSize: 14
                                        }, this.state.isPickUpError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]}
                                        listStyle={{ maxHeight: 150, backgroundColor: '#f0f0f0', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderWidth: 1 }}
                                        // data={this.state.pickUpLocations.filter((location) => { return location.value.includes(this.state.query) })}
                                        data={this.state.pickUpLocations}
                                        hideResults={this.state.mustHideLocationsDropList ? true : false}
                                        defaultValue={this.state.selectedPickUpLocation ? this.state.selectedPickUpLocation.value : ''}
                                        placeholder={Locals.CREATE_ORDER_START_TYPING}
                                        onChangeText={text => this.setState({ query: text, mustHideLocationsDropList: false }, () => {
                                            if (this.state.query.length > 2) {
                                                this.props.fetchLocations(this.state.query.trim())
                                            }
                                        })}
                                        renderItem={({ item, i }) => (
                                            <TouchableOpacity
                                                key={item.key}
                                                style={{
                                                    paddingHorizontal: 10, borderBottomColor: 'black', borderBottomWidth: 0.5, height: 55,
                                                    marginBottom: 8,
                                                    justifyContent: 'center', alignItems: 'flex-start', width: '100%'
                                                }}
                                                onPress={() => { this.setState({ selectedPickUpLocation: item, query: item.value, mustHideLocationsDropList: true }) }}
                                            >
                                                <Text style={{ fontSize: 13 }}>{item.value}</Text>
                                            </TouchableOpacity>
                                        )}
                                        nestedScrollEnabled
                                        flatListProps={{
                                            bounces: false, nestedScrollEnabled: true
                                        }}
                                    />

                                    {/* <TouchableOpacity activeOpacity={this.state.pickUpLocations.length > 0 ? 0.5 : 1} style={[{ flex: 1, marginRight: 15, backgroundColor: this.state.pickUpLocations.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 5, justifyContent: 'center', height: 40 }, this.state.isPickUpError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                        // must open picker
                                        if (this.state.pickUpLocations.length > 0) {
                                            this.singlePicker.show()
                                        }
                                    }}>
                                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedPickUpLocation ? this.state.selectedPickUpLocation.value : Locals.CREATE_ORDER_CHOOSE_LOCATION}</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                                        // must open location component 0000000
                                        // this.newLocationPopUp.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList)
                                        this.showLocationDialog()
                                    }}>
                                        <View style={{
                                            backgroundColor: Colors.SUB_COLOR,
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            shadowColor: Colors.SUB_COLOR,
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                            elevation: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ fontFamily: Fonts.MAIN_FONT, color: '#ffffff', fontSize: 20, textAlign: 'center' }}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Preferred Date section */}
                                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_PREFERRED_DATE}</Text>
                                <TouchableOpacity style={[{ flex: 1, backgroundColor: '#f0f0f0', borderRadius: 5, justifyContent: 'center', height: 40 }]} onPress={() => {
                                    this.setState({ isDatePickerVisible: true })
                                }}>
                                    <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{moment(this.state.preferredDate).format('YYYY-MM-DD')}</Text>
                                </TouchableOpacity>

                                {/* Preferred time section */}
                                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_PREFERRED_TIME}</Text>
                                <View style={{ flexDirection: 'row', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={[{ flex: 2, marginRight: 15, backgroundColor: '#f0f0f0', borderRadius: 5, justifyContent: 'center', height: 40 }, this.state.fromTimeError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                        this.setState({ isTimePickerVisible: true, isSelectingFromTime: true })
                                    }}>
                                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.isInitialPreferredFrom ? Locals.CREATE_ORDER_FROM_TIME : moment(this.state.preferredFrom).format('hh:mm A')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[{ flex: 2, backgroundColor: '#f0f0f0', borderRadius: 5, justifyContent: 'center', height: 40 }, this.state.toTimeError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                        this.setState({ isTimePickerVisible: true, isSelectingFromTime: false })
                                    }}>
                                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.isInitialPreferredTo ? Locals.CREATE_ORDER_TO_TIME : moment(this.state.preferredTo).format('hh:mm A')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* buttons here */}
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: Platform.OS == 'ios' ? 80 : 50 }}>

                            <Buttons.RoundCornerButton
                                isDisabled={true}
                                buttonStyle={[styles.button, { width: null, flex: 1, shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]}
                                textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                label={Locals.CREATE_ORDER_BACK_BUTTON}
                                sectionPressed={() => { }}
                            />

                            <Buttons.RoundCornerButton
                                buttonStyle={[styles.button, { width: null, flex: 1, borderWidth: 0, backgroundColor: '#f3be0c', marginLeft: 8 }]}
                                textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                label={Locals.CREATE_ORDER_NEXT_BUTTON}
                                sectionPressed={() => {
                                    this.nextPressed()
                                }}
                            />
                        </View>
                    </View>

                </KeyboardAwareScrollView>

                <DateTimePicker
                    date={this.state.preferredDate}
                    onDateChange={(date) => {
                        this.setState({ preferredDate: date })
                    }}
                    titleIOS={'Choose Date'}
                    neverDisableConfirmIOS={true}
                    is24Hour={false}
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={(date) => {
                        this.setState({ isDatePickerVisible: false, preferredDate: date })
                    }}
                    onCancel={() => {
                        this.setState({ isDatePickerVisible: false })
                    }}
                />

                <DateTimePicker
                    date={this.state.isSelectingFromTime ? this.state.preferredFrom : this.state.preferredTo}
                    onDateChange={(date) => {
                        if (this.state.isSelectingFromTime) {
                            this.setState({ preferredFrom: date, isInitialPreferredFrom: false })
                        } else {
                            this.setState({ preferredTo: date, isInitialPreferredTo: false })
                        }
                    }}
                    titleIOS={this.state.isSelectingFromTime ? 'From Time' : 'To Time'}
                    mode='time'
                    neverDisableConfirmIOS={true}
                    is24Hour={false}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={(date) => {
                        if (this.state.isSelectingFromTime) {
                            this.setState({ isTimePickerVisible: false, preferredFrom: date, isSelectingFromTime: false, isInitialPreferredFrom: false })
                        } else {
                            this.setState({ isTimePickerVisible: false, preferredTo: date, isSelectingFromTime: false, isInitialPreferredTo: false })
                        }
                    }}
                    onCancel={() => {
                        this.setState({ isTimePickerVisible: false, isSelectingFromTime: false })
                    }}
                />

                <Pickers.SinglePicker
                    style={{ backgroundColor: 'white' }}
                    lang="en-US"
                    ref={ref => this.singlePicker = ref}
                    // defaultSelectedValue={}
                    onConfirm={(option) => {
                        this.setState({ selectedPickUpLocation: option })
                    }}
                    onSelect={(value) => {
                        // console.log(value)
                        // this.setState({ selected: option.value })
                    }}
                    options={this.state.pickUpLocations}
                // buttonCancelStyle={{ paddingLeft: 10, fontFamily: Fonts.MAIN_FONT }}
                // buttonAcceptStyle={{ paddingRight: 10, fontFamily: Fonts.MAIN_FONT }}
                >
                </Pickers.SinglePicker>

                <Alerts.NewReceiverPopUp
                    ref={newLocationPopUp => this.newReceiverPopup = newLocationPopUp}
                    typesList={this.props.constantsList ? this.props.constantsList.locationTypes : []}
                    areasList={this.props.areaList}
                    onCreatePress={(receivedData, index) => {
                        this.props.createReceiverPressed(receivedData, index, this.state.accordionData)
                    }}
                />
                <Alerts.LocationPrompt
                    ref={newLocationPopUp => this.locationPrompt = newLocationPopUp}
                    personName={`${this.props.appState.user.userInfo.firstName} ${this.props.appState.user.userInfo.lastName}`}
                    onCreatePress={(type) => {
                        if (type == SelectionType.Personal) {
                            this.newLocationPopUp.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList)
                        } else {
                            this.newReceiverPopup.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList)
                        }
                    }}
                />
                <Alerts.NewLocationPopUp
                    ref={newLocationPopUp => this.newLocationPopUp = newLocationPopUp}
                    typesList={this.props.constantsList ? this.props.constantsList.locationTypes : []}
                    areasList={this.props.areaList}
                    onCreatePress={(receivedData) => {
                        this.props.createCustomerLocationPressed(receivedData)
                    }}
                />
            </View>
        )
    }

    isInputValid() {
        var locationValid = true, fromTimeValid = true, toTimeValid = true

        if (!this.state.selectedPickUpLocation) {
            locationValid = false
        }

        // if (this.state.isInitialPreferredFrom) {
        //     fromTimeValid = false
        // }

        // if (this.state.isInitialPreferredTo) {
        //     toTimeValid = false
        // }

        this.setState({ isPickUpError: !locationValid, fromTimeError: !fromTimeValid, toTimeError: !toTimeValid })

        return (locationValid && fromTimeValid && toTimeValid)
    }

    nextPressed() {
        // console.log(this.state.deliveryPaymentTypes.find((item) => { return item.isSelected == true }), 'AAAADDDDZZZ')
        if (this.isInputValid()) {

            //move to step two
            let values = {
                selectedPaymentType: this.state.paymentTypes.find((item) => { return item.isSelected == true }),

                selectedDeliveryPaymentType: this.state.deliveryPaymentTypes.find((item) => { return item.isSelected == true }),

                selectedPickUpLocation: this.state.selectedPickUpLocation,

                selectedDate: this.state.preferredDate,

                selectedFromTime: this.state.isInitialPreferredFrom ? null : this.state.preferredFrom,

                selectedToTime: this.state.isInitialPreferredTo ? null : this.state.preferredTo,
            }

            this.props.nextPressed(values)
        }
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    headerStyle: {
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 17,
        marginBottom: 5,
        color: '#929292'
    },
    innerContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
    },
    subHeaders: {
        color: '#929292',
        fontFamily: Fonts.SUB_FONT,
        marginTop: 15,
        marginBottom: 5,
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
})