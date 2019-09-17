import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar } from 'react-native-calendars';
import { Pickers, Alerts, Buttons } from '../../components';
import CreateOrderStep2Components from './CreateOrderStep2Components';
import HeaderComponent from './CreateOrderStep2Components/HeaderComponent';
import Locals from '../../localization/local';
import * as objectTypes from '../../constants/object_types';
import Accordion from 'react-native-collapsible/Accordion';

var moment = require('moment')

export default class CreateOrderStep2 extends Component {

    constructor(props) {
        super(props);

        this.state = {

            activeAccordionSection: null,
            accordionData: [
                {
                    key: 0,
                    headerLabel: 'Receiver 1',
                    selectedReceiverLocation: null,
                    preferredDate: new Date(),
                    preferredFrom: new Date(),
                    preferredTo: new Date(),
                    descriptionData: [],
                    selectedDescription: null,
                    customNote: '',
                    selectedCurrencyId: 1,
                    wayBill: '',
                    collectionAmount: '',
                    collectionTypes: [],
                    packageTypes: [],
                    packagesToDeliverList: [],
                    packagesToReturnList: [],
                    orderTypeId: props.orderTypeId,
                    allowDriverContact: true,
                    allowSendingDirectMessage: true
                }
            ],
        }
    }

    mainComponentDataChanged(index, data) {

        let temp = JSON.parse(JSON.stringify(this.state.accordionData))
        temp.forEach((item) => {

            if (item.key == index) {
                item.selectedReceiverLocation = data.selectedReceiverLocation
                item.preferredDate = data.preferredDate
                item.preferredFrom = data.isInitialPreferredFrom ? null : data.preferredFrom
                item.preferredTo = data.isInitialPreferredTo ? null : data.preferredTo
                item.descriptionData = data.descriptionData
                item.selectedDescription = data.selectedDescription
                item.customNote = data.customNote
                item.selectedCurrencyId = data.selectedCurrencyId
                item.wayBill = data.wayBill
                item.collectionAmount = data.collectionAmount
                item.collectionTypes = data.collectionTypes
                item.packageTypes = data.packageTypes
                item.packagesToDeliverList = data.packagesToDeliverList
                item.packagesToReturnList = data.packagesToReturnList
                item.allowDriverContact = data.allowDriverContact
                item.allowSendingDirectMessage = data.allowSendingDirectMessage
            }
        })

        this.setState({ accordionData: temp }, () => { })
    }

    componentWillMount() {
        this.prepareData(this.props)
    }

    componentWillReceiveProps(newProps) {

        this.prepareData(newProps)
    }

    prepareData(data) {
        console.log(data)
        if (data.step2Data) {
            this.setState({ accordionData: data.step2Data })
        } else {
            if (data.oldPageData) {
                let temp = data.oldPageData
                if (data.selectedReceiverLocation) {
                    temp[data.selectedReceiverIndex].selectedReceiverLocation = { key: data.selectedReceiverLocation.id, value: data.selectedReceiverLocation.location }
                }
                this.setState({ accordionData: temp })
            }
            // let temp = this.state.accordionData
            // if (data.selectedReceiverLocation) {
            //     temp[this.props.selectedReceiverIndex].selectedReceiverLocation = { key: data.selectedReceiverLocation.id, value: data.selectedReceiverLocation.location }
            // }
            // this.setState({ accordionData: temp })
        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    style={{ backgroundColor: '#f0f0f0', width: '100%', padding: 20 }}
                    contentContainerStyle={{ flexGrow: 1, }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'>

                    <View style={[{ justifyContent: 'space-between', backgroundColor: '#f0f0f0', alignContent: 'center', height: '100%', overflow: 'hidden' }]}>

                        <View style={[{ justifyContent: 'flex-start', backgroundColor: '#f0f0f0', marginBottom: 20 }]}>
                            <Text style={styles.headerStyle}>{Locals.CREATE_ORDER_STEP2_SUBTITLE}</Text>

                            {
                                this.props.orderTypeId == objectTypes.ORDER.BULK_TRIP.id ?
                                    <Accordion
                                        activeSection={this.state.activeAccordionSection}
                                        onChange={(selectedSectionIndex) => { this.setState({ activeAccordionSection: (selectedSectionIndex == false) ? this.state.activeAccordionSection == null ? selectedSectionIndex : null : selectedSectionIndex }) }}
                                        underlayColor='transparent'
                                        style={{ width: '100%' }}
                                        sections={this.state.accordionData.length != 0 ? this.state.accordionData : []}
                                        renderHeader={(items, index) => {
                                            return (
                                                <HeaderComponent
                                                    lang={'en'}
                                                    key={items.key}
                                                    item={items}
                                                    openedIndex={this.state.activeAccordionSection}
                                                    currentIndex={index}
                                                    isOpened={this.state.activeAccordionSection == index}
                                                    isFirst={index == 0}
                                                />
                                            );
                                        }}
                                        renderContent={(items, index) => {
                                            return (
                                                <CreateOrderStep2Components.MainComponent
                                                    key={items.key}
                                                    constantsList={this.props.constantsList}
                                                    receiverLocations={this.props.receiverLocations}
                                                    selectedReceiverLocation={items.selectedReceiverLocation}
                                                    orderTypeId={items.orderTypeId}
                                                    receivedData={items}
                                                    onChangeData={(data) => this.mainComponentDataChanged(items.key, data)}
                                                    fetchLocations={this.props.fetchLocations}
                                                    openPopUp={() => {
                                                        this.newLocationPopUp.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList, index)
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                    :
                                    this.state.accordionData.length > 0 ?
                                        <CreateOrderStep2Components.MainComponent
                                            constantsList={this.props.constantsList}
                                            receiverLocations={this.props.receiverLocations}
                                            selectedReceiverLocation={this.state.accordionData[0].selectedReceiverLocation}
                                            orderTypeId={this.state.accordionData[0].orderTypeId}
                                            receivedData={this.state.accordionData[0]}
                                            onChangeData={(data) => this.mainComponentDataChanged(0, data)}
                                            fetchLocations={this.props.fetchLocations}
                                            openPopUp={() => {
                                                this.newLocationPopUp.show(this.props.constantsList ? this.props.constantsList.locationTypes : [], this.props.areaList, 0)
                                            }}
                                        />
                                        :
                                        null
                            }

                        </View>

                        <View>
                            {
                                this.props.orderTypeId == objectTypes.ORDER.BULK_TRIP.id ?
                                    <Buttons.RoundCornerButton
                                        buttonStyle={[styles.button, { width: '100%', height: 40, borderWidth: 0, backgroundColor: '#00e1c8', shadowColor: '#00e1c8' }]}
                                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                        label={Locals.CREATE_ORDER_ADD_NEW_RECEIVER}
                                        sectionPressed={() => {
                                            let temp = JSON.parse(JSON.stringify(this.state.accordionData))

                                            let key = this.state.accordionData.length > 0 ? this.state.accordionData[this.state.accordionData.length - 1].key + 1 : 1
                                            temp.push({
                                                key: key,
                                                headerLabel: `Receiver ${this.state.accordionData.length + 1}`,
                                                selectedReceiverLocation: null,
                                                receiverLocations: [],
                                                descriptionData: [],
                                                collectionTypes: [],
                                                packageTypes: [],
                                                packagesToDeliverList: [],
                                                packagesToReturnList: [],
                                                orderTypeId: this.props.orderTypeId,
                                            })

                                            this.setState({ accordionData: temp })
                                        }}
                                    />
                                    :
                                    null
                            }

                            {/* buttons here */}
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: this.props.orderTypeId != objectTypes.ORDER.BULK_TRIP.id ? 40 : this.state.activeAccordionSection != null ? 40 : 0 }}>

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
                                    label={Locals.CREATE_ORDER_NEXT_BUTTON}
                                    sectionPressed={() => {
                                        this.nextPressed()
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                </KeyboardAwareScrollView>

                <Alerts.NewReceiverPopUp
                    ref={newLocationPopUp => this.newLocationPopUp = newLocationPopUp}
                    typesList={this.props.constantsList ? this.props.constantsList.locationTypes : []}
                    areasList={this.props.areaList}
                    onCreatePress={(receivedData, index) => {
                        this.props.createReceiverPressed(receivedData, index, this.state.accordionData)
                        // this.props.createCustomerLocationPressed(receivedData)
                    }}
                />
            </View>
        )
    }

    isInputValid() {
        var locationValid = true

        let temp = this.state.accordionData
        temp.forEach((item) => {
            item.isReceiverLocationError = false
            if (item.selectedReceiverLocation == null) {
                item.isReceiverLocationError = true
                locationValid = false
            }
        })

        console.log(temp);

        this.setState({ accordionData: temp })

        if (!locationValid) {
            this.props.showNotification()
        }

        return (locationValid)
    }

    nextPressed() {


        if (this.isInputValid()) {

            //move to step two
            let values = {
                selectedData: this.state.accordionData
                // selectedPaymentType: this.state.paymentTypes.find((item) => { return item.isSelected == true }),
                // selectedDeliveryPaymentType: this.state.deliveryPaymentTypes.find((item) => { return item.isSelected == true }),
                // selectedPickUpLocation: this.state.selectedPickUpLocation,
                // selectedDate: this.state.preferredDate,
                // selectedFromTime: this.state.preferredFrom,
                // selectedToTime: this.state.preferredTo,
            }

            this.props.nextPressed(values)
        }
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