import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Pickers, Alerts, Buttons } from '../../components';
import Locals from '../../localization/local';
import * as objectTypes from '../../constants/object_types';

var moment = require('moment')

export default class CreateOrderStep4 extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentWillMount() {
        this.prepareData(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.prepareData(newProps)
    }

    prepareData(data) {

        console.log(data)

    }

    getName(item, type) {
        let final = ''
        if (type == 0) {//order types

            switch (this.props.step1Data.selectedPaymentType.id) {
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
            switch (this.props.step1Data.selectedDeliveryPaymentType.id) {
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

    getImage(type, id) {

        if (type == 0) {//order types

            switch (this.props.step1Data.selectedPaymentType.id) {
                case objectTypes.ORDER.ONE_WAY_TRIP.id:
                    return require('../../images/createOrder/createOrderOneWay2.png')
                case objectTypes.ORDER.BULK_TRIP.id:
                    return require('../../images/createOrder/createOrderBulk2.png')
                case objectTypes.ORDER.RETURN_TRIP.id:
                    return require('../../images/createOrder/createOrderReturn2.png')
                case objectTypes.ORDER.PIGGY_BANK_TRIP.id:
                // return isSelectedType ? require('../../images/createOrder/createOrderOneWay.png') : require('../../images/createOrder/createOrderOneWay2.png')
                default:
                    return require('../../images/createOrder/createOrderOneWay2.png')
            }


        } else if (type == 1) {//paymentMethod types
            switch (this.props.step1Data.selectedDeliveryPaymentType.id) {
                case objectTypes.PAYMENT_METHOD.ON_ACCOUNT.id:
                    return require('../../images/createOrder/createOrderAvatar2.png')
                case objectTypes.PAYMENT_METHOD.CASH_ON_DELIVERY.id:
                    return require('../../images/createOrder/createOrderOnDelivery2.png')
                case objectTypes.PAYMENT_METHOD.CASH_ON_PICKUP.id:
                    return require('../../images/createOrder/createOrderCashOn2.png')
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD.id:
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD2.id:
                case objectTypes.PAYMENT_METHOD.CREDIT_CARD3.id:
                    return require('../../images/createOrder/createOrderCreditCard2.png')
                default:
                    return require('../../images/createOrder/createOrderAvatar.png')
            }
        } else if (type == 2) {
            switch (id) {
                case objectTypes.CASH_COLLECTION.COLLECT_ON_DELIVERY.id:
                    return require('../../images/createOrder/createOrderCollectionOnDelivery2.png')
                case objectTypes.CASH_COLLECTION.COLLECT_ON_PICKUP.id:
                    return require('../../images/createOrder/createOrderCollectionOnPickUp2.png')
                case objectTypes.CASH_COLLECTION.PAID.id:
                    return require('../../images/createOrder/createOrderPaid2.png')
                default:
                    return require('../../images/createOrder/createOrderCollectionOnDelivery2.png')
            }
        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    style={{ backgroundColor: '#f0f0f0', height: '100%', width: '100%', padding: 20 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'>

                    <View style={[styles.mainContainer, { flex: 1, height: '100%', justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>

                        <View style={[styles.mainContainer, { justifyContent: 'flex-start', marginBottom: 20 }]}>
                            <Text style={styles.headerStyle}>{Locals.CREATE_ORDER_STEP4_SUBTITLE}</Text>

                            <View style={styles.parentStyle}>
                                {/* for order info */}
                                <View style={styles.parentTopSection}>
                                    <View style={[styles.parentHeaderStyle, { borderTopRightRadius: 10, borderTopLeftRadius: 10 }]}>
                                        <Text style={styles.parentHeaderTextStyle}>{Locals.CREATE_ORDER_ORDER_INFO}</Text>
                                    </View>
                                    <View style={[styles.parentSubStyle, { paddingBottom: 0 }]}>
                                        <Image source={require('../../images/drivers/driversLocation.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                        <Text style={styles.normalTextStyle}>{this.props.step1Data ? this.props.step1Data.selectedPickUpLocation.value : ''}</Text>
                                    </View>
                                    <View style={[styles.parentSubStyle]}>
                                        <View style={styles.parentSubSubStyle}>
                                            <Image source={this.getImage(0, null)} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                            <Text numberOfLines={1} style={styles.normalTextStyle}>{this.props.step1Data ? this.props.step1Data.selectedPaymentType.label : ''}</Text>
                                        </View>
                                        <View style={styles.parentSubSubStyle}>
                                            <Image source={this.getImage(1, null)} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                            <Text numberOfLines={1} style={styles.normalTextStyle}>{this.props.step1Data ? this.props.step1Data.selectedDeliveryPaymentType.label : ' '}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.parentSubStyle, { paddingTop: 0 }]}>
                                        <View style={styles.parentSubSubStyle}>
                                            <Image source={require('../../images/task/taskTime.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                            <Text numberOfLines={1} style={styles.normalTextStyle}>{this.props.step1Data ? moment(this.props.step1Data.selectedDate).format('DD/MM/YYYY') : ''}</Text>
                                        </View>
                                        <View style={styles.parentSubSubStyle}>
                                            <Image source={require('../../images/createOrder/clock.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                            <Text numberOfLines={1} style={styles.normalTextStyle}>{this.props.step1Data ? `${moment(this.props.step1Data.selectedFromTime).format('hh:mm A')} till ${moment(this.props.step1Data.selectedToTime).format('hh:mm A')}` : ''}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* for receiver info */}
                                <View style={styles.parentMiddleSection}>

                                    {
                                        this.props.step2Data.map((receiver, index) => {
                                            return (
                                                [
                                                    <View style={styles.parentHeaderStyle} key={index}>
                                                        <Text style={styles.parentHeaderTextStyle}>{`${this.props.step2Data.length > 1 ? 'RECEIVER ' + (index + 1) + ' INFO:' : Locals.CREATE_ORDER_RECEIVER_INFO}`}</Text>
                                                    </View>,
                                                    <View style={styles.parentTopSection}>
                                                        <View style={[styles.parentSubStyle, { paddingBottom: 0 }]}>
                                                            <Image source={require('../../images/drivers/driversLocation.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                            <Text style={styles.normalTextStyle}>{receiver.selectedReceiverLocation.value}</Text>
                                                        </View>
                                                        <View style={[styles.parentSubStyle]}>
                                                            <View style={styles.parentSubSubStyle}>
                                                                <Image source={require('../../images/task/taskTime.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                                <Text numberOfLines={1} style={styles.normalTextStyle}>{moment(receiver.preferredDate).format('DD/MM/YYYY')}</Text>
                                                            </View>
                                                            <View style={styles.parentSubSubStyle}>
                                                                <Image source={require('../../images/createOrder/clock.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                                {
                                                                    receiver.preferredFrom && receiver.preferredTo ?
                                                                        <Text numberOfLines={1} style={styles.normalTextStyle}>{`${moment(receiver.preferredFrom).format('hh:mm A')} till ${moment(receiver.preferredTo).format('hh:mm A')}`}</Text>
                                                                        :
                                                                        <Text numberOfLines={1} style={styles.normalTextStyle}>{'No Preferred Time'}</Text>
                                                                }
                                                            </View>
                                                        </View>

                                                        {
                                                            receiver.packagesToDeliverList.length > 0 ?
                                                                receiver.packagesToDeliverList.map((packageType, packIndex) => {
                                                                    return (
                                                                        <View key={packIndex} style={[styles.parentSubStyle, { paddingTop: 0 }]}>
                                                                            <View style={styles.parentSubSubStyle}>
                                                                                <Image source={require('../../images/createOrder/createOrderPackageQuantity.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                                                <Text numberOfLines={1} style={styles.normalTextStyle}>{packageType.quantity}</Text>
                                                                            </View>
                                                                            <View style={styles.parentSubSubStyle}>
                                                                                <Text numberOfLines={1} style={[styles.boldTextStyle, { width: 18, textAlign: 'center', height: 18 }]}>{packageType.packages.find((pack) => { return pack.isSelected == true }).labelAbbreviation}</Text>
                                                                                <Text numberOfLines={1} style={[styles.normalTextStyle, { height: 18, paddingLeft: 3 }]}>{packageType.packages.find((pack) => { return pack.isSelected == true }).label}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }) : null
                                                        }

                                                        {
                                                            receiver.packagesToReturnList.length > 0 && (this.props.step1Data.selectedPaymentType.id == objectTypes.ORDER.RETURN_TRIP.id) ?
                                                                receiver.packagesToReturnList.map((packageType, packIndex) => {
                                                                    return (
                                                                        <View key={packIndex} style={[styles.parentSubStyle, { paddingTop: 0 }]}>
                                                                            <View style={styles.parentSubSubStyle}>
                                                                                <Image source={require('../../images/createOrder/createOrderPackageQuantity.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                                                <Text numberOfLines={1} style={styles.normalTextStyle}>{packageType.quantity}</Text>
                                                                            </View>
                                                                            <View style={styles.parentSubSubStyle}>
                                                                                <Text numberOfLines={1} style={[styles.boldTextStyle, { width: 18, textAlign: 'center', height: 18 }]}>{packageType.packages.find((pack) => { return pack.isSelected == true }).labelAbbreviation}</Text>
                                                                                <Text numberOfLines={1} style={[styles.normalTextStyle, { height: 18, paddingLeft: 3 }]}>{packageType.packages.find((pack) => { return pack.isSelected == true }).label}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }) : null
                                                        }

                                                        <View style={[styles.parentSubStyle, { paddingTop: 0 }]}>
                                                            <Image source={this.getImage(2, receiver.collectionTypes.find((type) => { return type.isSelected == true }).id)} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                            <Text style={styles.normalTextStyle}>{receiver.collectionTypes.find((type) => { return type.isSelected == true }).label}</Text>
                                                        </View>
                                                        <View style={[styles.parentSubStyle, { paddingTop: 0, paddingBottom: 10 }]}>
                                                            <View style={[styles.parentSubSubStyle, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }]}>
                                                                <Text numberOfLines={1} style={styles.boldTextStyle}>{Locals.CREATE_ORDER_CURRENCY}</Text>
                                                                <Text numberOfLines={1} style={[styles.normalTextStyle, { paddingLeft: 0 }]}>{receiver.selectedCurrency == objectTypes.CURRENCY.USD.id ? objectTypes.CURRENCY.USD.type.toUpperCase() : objectTypes.CURRENCY.LBP.type.toUpperCase()}</Text>
                                                            </View>
                                                            <View style={[styles.parentSubSubStyle, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }]}>
                                                                <Text numberOfLines={1} style={styles.boldTextStyle}>{Locals.CREATE_ORDER_COLLECTION_AMOUNT}</Text>
                                                                <Text numberOfLines={1} style={[styles.normalTextStyle, { paddingLeft: 0 }]}>{receiver.collectionAmount != '' ? receiver.collectionAmount : 'No Collection Amount'}</Text>
                                                            </View>
                                                        </View>
                                                        {
                                                            receiver.selectedDescription ?
                                                                <View style={[styles.parentSubStyle, { paddingTop: 0, paddingBottom: this.props.step3Data.isSignatureRequired == false && this.props.step3Data.isPictureRequired == false ? 0 : 10 }]}>
                                                                    <Text style={[styles.normalTextStyle, { paddingLeft: 0 }]}>{receiver.selectedDescription.value}</Text>
                                                                </View>
                                                                :
                                                                null
                                                        }

                                                    </View>
                                                ]
                                            )
                                        })
                                    }

                                </View>

                                {/* for signature and picture required */}
                                {
                                    this.props.step3Data.isSignatureRequired == true || this.props.step3Data.isPictureRequired == true ?
                                        <View style={styles.parentBottomSection}>
                                            {
                                                this.props.step3Data.isSignatureRequired ?
                                                    <View style={[styles.parentSubSubStyle, { width: '100%', paddingHorizontal: 20, paddingTop: 10, paddingBottom: this.props.step3Data.isPictureRequired ? 0 : 10 }]}>
                                                        <Image source={require('../../images/createOrder/createOrderSignature2.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                        <Text numberOfLines={1} style={styles.normalTextStyle}>{'Signature Required'}</Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                            {
                                                this.props.step3Data.isPictureRequired ?
                                                    <View style={[styles.parentSubSubStyle, { width: '100%', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 }]}>
                                                        <Image source={require('../../images/createOrder/createOrderPicture2.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                                        <Text numberOfLines={1} style={styles.normalTextStyle}>{'Picture Required'}</Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                        :
                                        null
                                }

                            </View>
                        </View>

                        {/* buttons here */}
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

                            <Buttons.RoundCornerButton
                                buttonStyle={[styles.button, { width: null, flex: 1, shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]}
                                textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                label={Locals.CREATE_ORDER_BACK_BUTTON}
                                sectionPressed={() => {
                                    this.props.backPressed()
                                }}
                            />

                            <Buttons.RoundCornerButton
                                buttonStyle={[styles.button, { width: null, flex: 1, borderWidth: 0, backgroundColor: '#f3be0c', marginLeft: 8 }]}
                                textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                label={Locals.CREATE_ORDER_SAVE_BUTTON}
                                sectionPressed={() => {
                                    this.nextPressed()
                                }}
                            />
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View >
        )
    }

    nextPressed() {
        this.props.nextPressed()
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
    parentStyle: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#919191',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 1,
    },
    parentTopSection: {

    },
    parentSubStyle: {
        flexDirection: 'row',
        minHeight: 30,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    parentSubSubStyle: {
        alignItems: 'center',
        width: '50%',
        flexDirection: 'row'
    },
    parentMiddleSection: {

    },
    parentBottomSection: {
        borderTopColor: Colors.SUB_COLOR,
        borderTopWidth: 1,
    },
    normalTextStyle: {
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        color: '#919191',
        paddingLeft: 5,
    },
    boldTextStyle: {
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 13,
        color: '#919191'
    },
    parentHeaderStyle: {
        backgroundColor: Colors.SUB_COLOR,
        height: 40,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    parentHeaderTextStyle: {
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff',
        fontSize: 15
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
    }
})