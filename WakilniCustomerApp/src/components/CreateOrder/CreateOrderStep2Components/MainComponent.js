import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../../constants/general';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { Calendar } from 'react-native-calendars';
import { Pickers, Alerts, Buttons, RadioButton } from '../../../components';
import Locals from '../../../localization/local';
import * as objectTypes from '../../../constants/object_types';
import PackagesComponent from './PackagesComponent';

var moment = require('moment')

export default class MainComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step1OrderTypeId: props.orderTypeId,

            preferredDate: new Date(),
            isDatePickerVisible: false,

            isInitialPreferredFrom: true,
            preferredFrom: new Date(),
            isInitialPreferredTo: true,
            preferredTo: new Date(),
            isTimePickerVisible: false,
            isSelectingFromTime: false,

            receiverLocations: [],
            selectedReceiverLocation: null,
            descriptionData: [],
            selectedDescription: null,

            customNote: '',
            customNoteError: false,
            wayBill: '',
            wayBillError: false,
            collectionAmount: '',
            collectionAmountError: false,

            selectedCurrencyId: objectTypes.CURRENCY.USD.id,
            collectionTypes: [],

            packageTypes: [],
            isDifferentPackageTypes: false,
            packagesToDeliverList: [],
            packagesToReturnList: [],

            allowDriverContact: false,
            allowSendingDirectMessage: false,
        }
    }

    componentWillMount() {
        this.prepareData(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.prepareData(newProps)
    }


    prepareData(data) {

        let tempReceiverLocations = []
        let tempDescriptions = []
        let tempCollectionTypes = []
        let tempPackageTypes = []

        if (data.receivedData.collectionTypes.length > 0) {

            data.receivedData.collectionTypes.forEach((collectionType, index) => {

                if (collectionType.id == objectTypes.CASH_COLLECTION.COLLECT_ON_DELIVERY.id || collectionType.id == objectTypes.CASH_COLLECTION.COLLECT_ON_PICKUP.id || collectionType.id == objectTypes.CASH_COLLECTION.PAID.id) {

                    let temp = collectionType
                    temp.name = this.getName(collectionType, 0)
                    temp.isNotSelectedIcon = this.getImage(collectionType, 0, false)
                    temp.isSelectedIcon = this.getImage(collectionType, 0, true)
                    tempCollectionTypes.push(temp)
                }
            })
        } else if (data.constantsList) {

            data.constantsList.collectionTypes.forEach((collectionType, index) => {

                collectionType.isSelected = false
                if (collectionType.id == objectTypes.CASH_COLLECTION.COLLECT_ON_DELIVERY.id || collectionType.id == objectTypes.CASH_COLLECTION.COLLECT_ON_PICKUP.id || collectionType.id == objectTypes.CASH_COLLECTION.PAID.id) {
                    let temp = JSON.parse(JSON.stringify(collectionType))
                    temp.name = this.getName(collectionType, 0)
                    temp.isNotSelectedIcon = this.getImage(collectionType, 0, false)
                    temp.isSelectedIcon = this.getImage(collectionType, 0, true)

                    // if (data.step1Data) {

                    //     if (orderType.id == data.step1Data.selectedPaymentType.id) {
                    //         temp.isSelected = true
                    //     }

                    // } else {
                    if (index == 1) {
                        temp.isSelected = true
                    }
                    // }
                    tempCollectionTypes.push(temp)
                }
            })
        }

        if (data.constantsList) {

            data.constantsList.packageTypes.forEach((packageType, index) => {
                let temp = JSON.parse(JSON.stringify(packageType))
                if (index == 0) {
                    temp.isSelected = true
                } else {
                    temp.isSelected = false
                }
                temp.label = this.getPackageText(temp.id, 0)
                temp.labelAbbreviation = this.getPackageText(temp.id, 1)
                tempPackageTypes.push(temp)
            })
        }

        data.receiverLocations.forEach((location) => {
            tempReceiverLocations.push({
                key: location.id,
                value: location.location
            })
        })

        objectTypes.NOTES.forEach((note) => {
            tempDescriptions.push({
                key: note.id,
                value: note.label
            })
        })

        // add default package
        let tempDeliver = []
        if (data.receivedData.packagesToDeliverList.length > 0) {
            tempDeliver = data.receivedData.packagesToDeliverList
        } else {
            tempDeliver.push({
                key: tempDeliver.length > 0 ? tempDeliver[tempDeliver.length - 1].key + 1 : 1,
                quantity: "1",
                packages: JSON.parse(JSON.stringify(tempPackageTypes))
            })
        }

        let tempReturn = []
        if (data.receivedData.packagesToReturnList.length > 0) {
            tempReturn = data.receivedData.packagesToReturnList
        } else {
            // tempReturn.push({
            //     key: tempReturn.length > 0 ? tempReturn[tempReturn.length - 1].key + 1 : 1,
            //     quantity: "1",
            //     packages: JSON.parse(JSON.stringify(tempPackageTypes))
            // })
        }

        this.setState({
            selectedReceiverLocation: data.selectedReceiverLocation ? {
                key: data.selectedReceiverLocation.id ? data.selectedReceiverLocation.id : data.selectedReceiverLocation.key ? data.selectedReceiverLocation.key : -1,
                value: data.selectedReceiverLocation.location ? data.selectedReceiverLocation.location : data.selectedReceiverLocation.value ? data.selectedReceiverLocation.value : ''
            } : null,
            isReceiverLocationError: data.receivedData ? data.receivedData.isReceiverLocationError : false,
            receiverLocations: tempReceiverLocations,
            descriptionData: tempDescriptions,
            collectionTypes: tempCollectionTypes,
            packageTypes: tempPackageTypes,
            packagesToDeliverList: tempDeliver,
            packagesToReturnList: tempReturn,
            selectedDescription: data.receivedData ? data.receivedData.selectedDescription ? data.receivedData.selectedDescription : null : null,
            customNote: data.receivedData ? data.receivedData.customNote ? data.receivedData.customNote : '' : '',
            orderTypeId: data.orderTypeId,
            allowDriverContact: data.receivedData ? data.receivedData.allowDriverContact : false,
            allowSendingDirectMessage: data.receivedData ? data.receivedData.allowSendingDirectMessage : false
        }, () => {
            // this.props.onChangeData(this.state)
        })
    }

    getPackageText(packageId, type) {

        let final = ''
        if (type == 0) {//label
            switch (packageId) {
                case objectTypes.PACKAGES.PAPER.id:
                    final = objectTypes.PACKAGES.PAPER.label
                    break;
                case objectTypes.PACKAGES.REGULAR_BOX.id:
                    final = objectTypes.PACKAGES.REGULAR_BOX.label
                    break;
                case objectTypes.PACKAGES.SMALL_BAG_OR_BOX.id:
                    final = objectTypes.PACKAGES.SMALL_BAG_OR_BOX.label
                    break;
                case objectTypes.PACKAGES.LARGE_BOX.id:
                    final = objectTypes.PACKAGES.LARGE_BOX.label
                    break;
                case objectTypes.PACKAGES.VERY_LARGE_BOX.id:
                    final = objectTypes.PACKAGES.VERY_LARGE_BOX.label
                    break;
                default:
                    break;
            }

        } else {//label abbreviation
            switch (packageId) {
                case objectTypes.PACKAGES.PAPER.id:
                    final = objectTypes.PACKAGES.PAPER.labelAbbreviation
                    break;
                case objectTypes.PACKAGES.REGULAR_BOX.id:
                    final = objectTypes.PACKAGES.REGULAR_BOX.labelAbbreviation
                    break;
                case objectTypes.PACKAGES.SMALL_BAG_OR_BOX.id:
                    final = objectTypes.PACKAGES.SMALL_BAG_OR_BOX.labelAbbreviation
                    break;
                case objectTypes.PACKAGES.LARGE_BOX.id:
                    final = objectTypes.PACKAGES.LARGE_BOX.labelAbbreviation
                    break;
                case objectTypes.PACKAGES.VERY_LARGE_BOX.id:
                    final = objectTypes.PACKAGES.VERY_LARGE_BOX.labelAbbreviation
                    break;
                default:
                    break;
            }
        }


        return final
    }

    getName(item, type) {
        let final = ''
        if (type == 0) {//collection types

            switch (item.id) {
                case objectTypes.CASH_COLLECTION.COLLECT_ON_DELIVERY.id:
                    final = Locals.CREATE_ORDER_COLLECTION_TYPE1
                    break
                case objectTypes.CASH_COLLECTION.COLLECT_ON_PICKUP.id:
                    final = Locals.CREATE_ORDER_COLLECTION_TYPE2
                    break
                case objectTypes.CASH_COLLECTION.PAID.id:
                    final = Locals.CREATE_ORDER_COLLECTION_TYPE3
                    break
                default:
                    final = Locals.CREATE_ORDER_COLLECTION_TYPE1
                    break
            }
        }

        return final
    }

    getImage(item, type, isSelectedType) {

        if (type == 0) {//order types

            switch (item.id) {
                case objectTypes.CASH_COLLECTION.COLLECT_ON_DELIVERY.id:
                    return isSelectedType ? require('../../../images/createOrder/createOrderCollectionOnDelivery1.png') : require('../../../images/createOrder/createOrderCollectionOnDelivery2.png')
                case objectTypes.CASH_COLLECTION.COLLECT_ON_PICKUP.id:
                    return isSelectedType ? require('../../../images/createOrder/createOrderCollectionOnPickUp1.png') : require('../../../images/createOrder/createOrderCollectionOnPickUp2.png')
                case objectTypes.CASH_COLLECTION.PAID.id:
                    return isSelectedType ? require('../../../images/createOrder/createOrderPaid1.png') : require('../../../images/createOrder/createOrderPaid2.png')
                default:
                    return isSelectedType ? require('../../../images/createOrder/createOrderCollectionOnDelivery1.png') : require('../../../images/createOrder/createOrderCollectionOnDelivery2.png')
            }
        }
    }

    render() {

        return (
            <View style={styles.innerContainer}>

                {/* Receiver Location section */}
                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_RECEIVER_LOCATION}</Text>
                <View style={[{ flexDirection: 'row', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },]}>
                    <TouchableOpacity activeOpacity={this.state.receiverLocations.length > 0 ? 0.5 : 1} style={[{ flex: 1, marginRight: 15, backgroundColor: this.state.receiverLocations.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 5, justifyContent: 'center', height: 40 }, this.state.isReceiverLocationError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        if (this.state.receiverLocations.length > 0) {
                            this.singlePickerLocation.show()
                        }
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedReceiverLocation ? this.state.selectedReceiverLocation.value : Locals.CREATE_ORDER_CHOOSE_LOCATION}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        this.props.openPopUp()
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

                {/* description section */}
                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_DESCRIPTION}</Text>
                <View style={[{ flexDirection: 'row', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },]}>
                    <TouchableOpacity activeOpacity={this.state.descriptionData.length > 0 ? 0.5 : 1} style={[{ flex: 1, backgroundColor: this.state.descriptionData.length > 0 ? '#f0f0f0' : '#919191', borderRadius: 5, justifyContent: 'center', height: 40 }, this.state.descriptionError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                        // must open picker
                        if (this.state.descriptionData.length > 0) {
                            this.singlePickerDescription.show()
                        }
                    }}>
                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#c4c4c4', paddingLeft: 10 }}>{this.state.selectedDescription ? this.state.selectedDescription.value : Locals.CREATE_ORDER_CHOOSE_DESCRIPTION}</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.selectedDescription ? this.state.selectedDescription.key == 8 ?
                        <TextInput
                            selectionColor='#919191'
                            style={[styles.inputFields, this.state.customNoteError ? styles.inputFieldsError : null]}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Custom Note'}
                            returnKeyType={'done'}
                            // placeholder={Locals.EMAIL_PLACEHOLDER}
                            // placeholderTextColor={Colors.TEXT_COLOR}
                            // placeholderStyle={styles.inputFieldsPlaceholder}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={this.state.customNote}
                            onChangeText={customNote => {
                                this.setState({ customNote: customNote }, () => {
                                    this.props.onChangeData(this.state)
                                });
                            }} />
                        : null : null
                }

                {/* Way Bill */}
                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_WAY_BILL}</Text>
                <TextInput
                    selectionColor='#919191'
                    style={[styles.inputFields, this.state.collectionAmountError ? styles.inputFieldsError : null]}
                    underlineColorAndroid={'transparent'}
                    placeholder={''}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    // placeholder={Locals.EMAIL_PLACEHOLDER}
                    // placeholderTextColor={Colors.TEXT_COLOR}
                    // placeholderStyle={styles.inputFieldsPlaceholder}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={this.state.wayBill}
                    onChangeText={wayBill => {
                        this.setState({ wayBill: wayBill }, () => {
                            this.props.onChangeData(this.state)
                        });
                    }} />

                {/* currency section */}
                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_CURRENCY}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity
                        style={[{
                            marginTop: 5,
                            flex: 2,
                            height: 50,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderRightColor: '#c4c4c4',
                            borderRightWidth: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: this.state.selectedCurrencyId == objectTypes.CURRENCY.USD.id ? Colors.SUB_COLOR : '#ffffff',
                            shadowColor: '#919191',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 1
                        }]}
                        onPress={() => {
                            this.setState({ selectedCurrencyId: objectTypes.CURRENCY.USD.id }, () => {
                                this.props.onChangeData(this.state)
                            })
                        }}
                    >
                        <Text style={{ fontFamily: Fonts.MAIN_FONT, color: this.state.selectedCurrencyId == objectTypes.CURRENCY.USD.id ? '#ffffff' : '#929292', textAlign: 'center' }}>{objectTypes.CURRENCY.USD.type.toUpperCase()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{
                            marginTop: 5,
                            flex: 2,
                            height: 50,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderRightColor: '#c4c4c4',
                            borderRightWidth: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: this.state.selectedCurrencyId == objectTypes.CURRENCY.LBP.id ? Colors.SUB_COLOR : '#ffffff',
                            shadowColor: '#919191',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 1
                        }]}
                        onPress={() => {
                            this.setState({ selectedCurrencyId: objectTypes.CURRENCY.LBP.id }, () => {
                                this.props.onChangeData(this.state)
                            })
                        }}
                    >
                        <Text style={{ fontFamily: Fonts.MAIN_FONT, color: this.state.selectedCurrencyId == objectTypes.CURRENCY.LBP.id ? '#ffffff' : '#929292', textAlign: 'center' }}>{objectTypes.CURRENCY.LBP.type.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>

                {/* collection amount */}
                {
                    this.state.collectionTypes.filter((item) => { return item.id == objectTypes.CASH_COLLECTION.PAID.id && item.isSelected == true }).length > 0 ?
                        null :
                        [
                            <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_COLLECTION_AMOUNT}</Text>,
                            <TextInput
                                selectionColor='#919191'
                                style={[styles.inputFields, this.state.collectionAmountError ? styles.inputFieldsError : null]}
                                underlineColorAndroid={'transparent'}
                                placeholder={''}
                                returnKeyType={'done'}
                                keyboardType={'numeric'}
                                // placeholder={Locals.EMAIL_PLACEHOLDER}
                                // placeholderTextColor={Colors.TEXT_COLOR}
                                // placeholderStyle={styles.inputFieldsPlaceholder}
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={this.state.collectionAmount}
                                onChangeText={collectionAmount => {
                                    this.setState({ collectionAmount: collectionAmount }, () => {
                                        this.props.onChangeData(this.state)
                                    });
                                }} />
                        ]
                }

                {/* collection type */}
                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_COLLECTION_TYPE}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {
                        this.state.collectionTypes.map((item, index) => {
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
                                        let temp = this.state.collectionTypes
                                        temp.forEach((type) => {
                                            type.isSelected = false
                                            if (type.id == item.id) {
                                                type.isSelected = true
                                            }
                                        })

                                        this.setState({ collectionTypes: temp, collectionAmount: item.id == objectTypes.CASH_COLLECTION.PAID ? '' : this.state.collectionAmount }, () => {
                                            this.props.onChangeData(this.state)
                                        })
                                    }}
                                >
                                    <Image source={item.isSelected ? item.isSelectedIcon : item.isNotSelectedIcon} style={{ width: 15, height: 15, resizeMode: 'contain', marginBottom: 5 }} />
                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, color: item.isSelected ? '#ffffff' : '#929292', textAlign: 'center' }}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <View style={[styles.radioButtonView, { alignSelf: 'flex-start', width: null, marginTop: 10 }]}>
                    <RadioButton
                        textStyle={{ color: '#919191' }}
                        outerViewStyle={{ borderColor: '#919191' }}
                        containerStyle={{ justifyContent: 'flex-start', width: '95%', paddingHorizontal: 5 }}
                        // animation={'bounceIn'}
                        label={Locals.CREATE_RECEIVER_ALLOW_DRIVER_CONTACT2}
                        language={'en'}
                        isSelected={this.state.allowDriverContact == true}
                        onPress={() => { this.setState({ allowDriverContact: !this.state.allowDriverContact }, () => { this.props.onChangeData(this.state) }) }}
                    />
                </View>
                <View style={[styles.radioButtonView, { alignSelf: 'flex-start', width: null }]}>
                    <RadioButton
                        textStyle={{ color: '#919191' }}
                        outerViewStyle={{ borderColor: '#919191' }}
                        containerStyle={{ justifyContent: 'flex-start', width: '95%', paddingHorizontal: 5 }}
                        // animation={'bounceIn'}
                        label={Locals.CREATE_RECEIVER_ALLOW_SENDING_DIRECT_MESSAGE}
                        language={'en'}
                        isSelected={this.state.allowSendingDirectMessage == true}
                        onPress={() => { this.setState({ allowSendingDirectMessage: !this.state.allowSendingDirectMessage }, () => { this.props.onChangeData(this.state) }) }}
                    />
                </View>

                {
                    this.state.step1OrderTypeId == objectTypes.ORDER.RETURN_TRIP.id ?
                        <View style={[styles.radioButtonView, { alignSelf: 'flex-start', width: null }]}>
                            <RadioButton
                                textStyle={{ color: '#919191' }}
                                outerViewStyle={{ borderColor: '#919191' }}
                                containerStyle={{ justifyContent: 'flex-start', width: '95%', paddingHorizontal: 5, marginLeft: Platform.OS == 'ios' ? 0 : 1 }}
                                // animation={'bounceIn'}
                                label={'The returned package is different than the one delivered ?'}
                                language={'en'}
                                isSelected={this.state.isDifferentPackageTypes}
                                onPress={() => this.setState({
                                    isDifferentPackageTypes: !this.state.isDifferentPackageTypes
                                }, () => {
                                    if (this.state.isDifferentPackageTypes) {
                                        let temp = []

                                        temp.push({
                                            key: this.state.packagesToReturnList.length > 0 ? this.state.packagesToReturnList[this.state.packagesToReturnList.length - 1].key + 1 : 1,
                                            quantity: "1",
                                            packages: JSON.parse(JSON.stringify(this.state.packageTypes))
                                        })

                                        this.setState({ packagesToReturnList: temp }, () => {
                                            this.props.onChangeData(this.state)
                                        })
                                    }
                                })}
                            />
                        </View>
                        :
                        null
                }
                {/* packages section */}
                <Text style={[styles.subHeaders, { fontSize: 17, fontFamily: Fonts.MAIN_FONT, marginBottom: 0 }]}>Packages To Deliver</Text>
                {
                    this.state.packagesToDeliverList.map((packageItem, index) => {
                        return (
                            <PackagesComponent
                                key={`D ${index}`}
                                isFirst={index == 0}
                                data={packageItem}
                                packageId={index + 1}
                                total={this.state.packagesToDeliverList.length}
                                didPressDelete={(selectedPackageKey) => {
                                    let temp = this.state.packagesToDeliverList
                                    let foundIndex = -1
                                    temp.forEach((packageList, index) => {
                                        if (selectedPackageKey == packageList.key) {
                                            foundIndex = index
                                        }
                                    })

                                    if (foundIndex != -1) {
                                        temp.splice(foundIndex, 1)
                                    }
                                    this.setState({ packagesToDeliverList: temp }, () => {
                                        this.props.onChangeData(this.state)
                                    })
                                }}
                                didChangeQTY={(newQty, selectedPackageKey) => {
                                    let temp = this.state.packagesToDeliverList
                                    temp.forEach((packageList) => {
                                        if (selectedPackageKey == packageList.key) {
                                            packageList.quantity = newQty
                                        }
                                    })
                                    this.setState({ packagesToDeliverList: temp }, () => {
                                        this.props.onChangeData(this.state)
                                    })
                                }}
                                didPress={(selectedPackageType, selectedPackageKey) => {
                                    let temp = this.state.packagesToDeliverList
                                    temp.forEach((packageList) => {
                                        if (selectedPackageKey == packageList.key) {
                                            packageList.packages.forEach((packageType) => {
                                                packageType.isSelected = false
                                                if (packageType.id == selectedPackageType.id) {
                                                    packageType.isSelected = true
                                                }
                                            })
                                        }
                                    })
                                    this.setState({ packagesToDeliverList: temp }, () => {
                                        this.props.onChangeData(this.state)
                                    })
                                }}
                            />
                        )
                    })
                }

                {
                    this.state.isDifferentPackageTypes ?
                        [
                            <Text style={[styles.subHeaders, { fontSize: 17, fontFamily: Fonts.MAIN_FONT, marginBottom: 0 }]}>Packages To Return</Text>,
                            this.state.packagesToReturnList.map((packageItem, index) => {
                                return (
                                    <PackagesComponent
                                        key={`R ${index}`}
                                        data={packageItem}
                                        isFirst={index == 0}
                                        packageId={index + 1}
                                        total={this.state.packagesToReturnList.length}
                                        didPressDelete={(selectedPackageKey) => {
                                            let temp = this.state.packagesToReturnList
                                            let foundIndex = -1
                                            temp.forEach((packageList, index) => {
                                                if (selectedPackageKey == packageList.key) {
                                                    foundIndex = index
                                                }
                                            })

                                            if (foundIndex != -1) {
                                                temp.splice(foundIndex, 1)
                                            }
                                            this.setState({ packagesToReturnList: temp }, () => {
                                                this.props.onChangeData(this.state)
                                            })
                                        }}
                                        didChangeQTY={(newQty, selectedPackageKey) => {
                                            let temp = this.state.packagesToReturnList
                                            temp.forEach((packageList) => {
                                                if (selectedPackageKey == packageList.key) {
                                                    packageList.quantity = newQty
                                                }
                                            })
                                            this.setState({ packagesToReturnList: temp }, () => {
                                                this.props.onChangeData(this.state)
                                            })
                                        }}
                                        didPress={(selectedPackageType, selectedPackageKey) => {
                                            let temp = this.state.packagesToReturnList
                                            temp.forEach((packageList) => {
                                                if (selectedPackageKey == packageList.key) {
                                                    packageList.packages.forEach((packageType) => {
                                                        packageType.isSelected = false
                                                        if (packageType.id == selectedPackageType.id) {
                                                            packageType.isSelected = true
                                                        }
                                                    })
                                                }
                                            })
                                            this.setState({ packagesToReturnList: temp }, () => {
                                                this.props.onChangeData(this.state)
                                            })
                                        }}
                                    />
                                )
                            })
                        ]
                        :
                        null
                }

                <Buttons.RoundCornerButton
                    buttonStyle={[styles.button, { width: null, flex: 1, height: 35, borderWidth: 0, backgroundColor: '#f3be0c', marginTop: 20 }]}
                    textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                    label={Locals.CREATE_ORDER_ADD_NEW_DELIVER_PACKAGE}
                    sectionPressed={() => {
                        let temp = JSON.parse(JSON.stringify(this.state.packagesToDeliverList))

                        temp.push({
                            key: this.state.packagesToDeliverList.length > 0 ? this.state.packagesToDeliverList[this.state.packagesToDeliverList.length - 1].key + 1 : 1,
                            quantity: "1",
                            packages: JSON.parse(JSON.stringify(this.state.packageTypes))
                        })

                        this.setState({ packagesToDeliverList: temp }, () => {
                            this.props.onChangeData(this.state)
                        })
                    }}
                />
                {
                    this.state.isDifferentPackageTypes ?
                        <Buttons.RoundCornerButton
                            buttonStyle={[styles.button, { width: null, flex: 1, height: 35, borderWidth: 0, backgroundColor: '#f3be0c', marginTop: 10 }]}
                            textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                            label={Locals.CREATE_ORDER_ADD_NEW_RETURN_PACKAGE}
                            sectionPressed={() => {
                                let temp = JSON.parse(JSON.stringify(this.state.packagesToReturnList))

                                temp.push({
                                    key: this.state.packagesToReturnList.length > 0 ? this.state.packagesToReturnList[this.state.packagesToReturnList.length - 1].key + 1 : 1,
                                    quantity: "1",
                                    packages: JSON.parse(JSON.stringify(this.state.packageTypes))
                                })

                                this.setState({ packagesToReturnList: temp }, () => {
                                    this.props.onChangeData(this.state)
                                })
                            }}
                        />
                        :
                        null
                }

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
                        this.setState({ isDatePickerVisible: false, preferredDate: date }, () => {
                            this.props.onChangeData(this.state)
                        })
                    }}
                    onCancel={() => {
                        this.setState({ isDatePickerVisible: false })
                    }}
                />

                <DateTimePicker
                    date={this.state.isSelectingFromTime ? this.state.preferredFrom : this.state.preferredTo}
                    onDateChange={(date) => {
                        // if (this.state.isSelectingFromTime) {
                        //     this.setState({ preferredFrom: date, isInitialPreferredFrom: false })
                        // } else {
                        //     this.setState({ preferredTo: date, isInitialPreferredTo: false })
                        // }
                    }}
                    titleIOS={this.state.isSelectingFromTime ? 'From Time' : 'To Time'}
                    mode='time'
                    neverDisableConfirmIOS={true}
                    is24Hour={false}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={(date) => {
                        if (this.state.isSelectingFromTime) {
                            this.setState({ isTimePickerVisible: false, preferredFrom: date, isSelectingFromTime: false, isInitialPreferredFrom: false }, () => {
                                this.props.onChangeData(this.state)
                            })
                        } else {
                            this.setState({ isTimePickerVisible: false, preferredTo: date, isSelectingFromTime: false, isInitialPreferredTo: false }, () => {
                                this.props.onChangeData(this.state)
                            })
                        }
                    }}
                    onCancel={() => {
                        this.setState({ isTimePickerVisible: false, isSelectingFromTime: false })
                    }}
                />

                {/* pickers */}
                <Pickers.SinglePicker
                    style={{ backgroundColor: 'white' }}
                    lang="en-US"
                    ref={ref => this.singlePickerLocation = ref}
                    // defaultSelectedValue={}
                    onConfirm={(option) => {
                        this.setState({ selectedReceiverLocation: option }, () => {
                            this.props.onChangeData(this.state)
                        })
                    }}
                    onSelect={(value) => {
                        // console.log(value)
                        // this.setState({ selected: option.value })
                    }}
                    options={this.state.receiverLocations}
                // buttonCancelStyle={{ paddingLeft: 10, fontFamily: Fonts.MAIN_FONT }}
                // buttonAcceptStyle={{ paddingRight: 10, fontFamily: Fonts.MAIN_FONT }}
                >
                </Pickers.SinglePicker>

                <Pickers.SinglePicker
                    style={{ backgroundColor: 'white' }}
                    lang="en-US"
                    ref={ref => this.singlePickerDescription = ref}
                    // defaultSelectedValue={}
                    onConfirm={(option) => {

                        this.setState({ selectedDescription: option, customNote: option.key != 8 ? '' : this.state.customNote }, () => {
                            this.props.onChangeData(this.state)
                        })
                    }}
                    onSelect={(value) => {
                        // console.log(value)
                        // this.setState({ selected: option.value })
                    }}
                    options={this.state.descriptionData}
                // buttonCancelStyle={{ paddingLeft: 10, fontFamily: Fonts.MAIN_FONT }}
                // buttonAcceptStyle={{ paddingRight: 10, fontFamily: Fonts.MAIN_FONT }}
                >
                </Pickers.SinglePicker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
    inputFields: {
        color: '#c4c4c4',
        textAlign: 'left',
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        backgroundColor: '#f0f0f0',
        width: '100%',
        borderRadius: 5,
        paddingLeft: 15,
        paddingVertical: 0,
        height: 40,
    },
    inputFieldsError: {
        borderColor: Colors.BADGE_COLOR,
        borderWidth: 1
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
    radioButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
})
