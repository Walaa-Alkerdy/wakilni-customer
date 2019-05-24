import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, TextInput, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import Locals from '../../localization/local';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Buttons, Pickers } from '../../components';

var moment = require('moment')

export default class OrderFiltersPopUp extends Component {

    state = {
        animatedValue: new Animated.Value(0),

        pickerData: [],
        selectedPickerTypeIndex: 0,

        waybill: '',
        statuses: [],
        selectedStatus: null,
        orderTypes: [],
        selectedOrderType: null,
        selectedRecipient: null,
        fromCreatedDate: null,
        toCreatedDate: null,
        fromCompletedDate: null,
        toCompletedDate: null,
    }

    dimissAlert = () => {
        this.setState({
            animatedValue: new Animated.Value(0),
        })
    }

    show = (waybill, statuses, orderTypes, selectedStatus, selectedOrderType, selectedRecipient, fromCreatedDate, toCreatedDate, fromCompletedDate, toCompletedDate) => {

        let temp = [
            {
                key: -1,
                value: 'All'
            }
        ]

        orderTypes.forEach((orderType) => {
            temp.push({
                key: orderType.id,
                value: orderType.label
            })
        })


        this.setState(
            {
                waybill,
                pickerData: statuses,
                statuses,
                selectedStatus,
                orderTypes: temp,
                selectedOrderType,
                selectedRecipient,
                fromCompletedDate,
                toCompletedDate,
                fromCreatedDate,
                toCreatedDate,
                mustShow: true,
            },
            () => {

                Animated.sequence([

                    Animated.parallel([
                        Animated.spring(this.state.animatedValue, {
                            toValue: 0.5,
                        }),
                        Animated.spring(this.state.animatedValue, {
                            toValue: 1,
                            friction: 3,
                            tension: 40
                        }),

                    ]),

                ]).start();
            }
        );
    };

    componentWillReceiveProps(newProps) {

        this.setState({ selectedRecipient: newProps.selectedRecipient })
    }

    render() {

        if (this.state.mustShow) {
            const actionStyle = {
                transform: [
                    {
                        scale: this.state.animatedValue,
                    },
                ],
            };

            return (
                <View style={styles.container}>
                    {/* <View style={styles.alertHeader}>
                    <Text style={styles.alertHeaderTitle}>{Locals.ALERT_TITLE.toUpperCase()}</Text>
                </View> */}
                    <Animated.View
                        style={[styles.animatedContainer, actionStyle]}
                        ref={SBAlert => this._SBAlert = SBAlert}
                    >

                        <KeyboardAwareScrollView
                            // resetScrollToCoords={{ x: 0, y: 0 }}
                            style={{ width: '100%' }}
                            contentContainerStyle={{ flexGrow: 1 }}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='always'>

                            <View style={[styles.mainInnerContainer, { justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>
                                <View style={[styles.mainInnerContainer, { justifyContent: 'flex-start', backgroundColor: 'transparent', marginBottom: 30, marginTop: 30 }]}>

                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_ORDER_WAY_BILL}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.waybill}
                                        onChangeText={waybill => {
                                            this.setState({ waybill: waybill });
                                        }} />

                                    <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, }}>
                                        <TouchableOpacity activeOpacity={this.state.statuses.length > 0 ? 0.5 : 1} style={[styles.pickerAndDatePickerStyle, { flex: 1, backgroundColor: this.state.statuses.length > 0 ? Colors.SUB_COLOR : '#c4c4c4' }]} onPress={() => {
                                            // must single picker for location types
                                            if (this.state.statuses.length > 0) {
                                                this.preparePickerSelectData(0)
                                            }
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.statuses.length > 0 ? '#ffffff' : '#f0f0f0' }}>{this.state.selectedStatus ? this.state.selectedStatus.value : 'Choose Status'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={this.state.orderTypes.length > 0 ? 0.5 : 1} style={[styles.pickerAndDatePickerStyle, { flex: 1, marginRight: 0, backgroundColor: this.state.orderTypes.length > 0 ? Colors.SUB_COLOR : '#c4c4c4' }]} onPress={() => {
                                            // must single picker for areas
                                            if (this.state.orderTypes.length > 0) {
                                                this.preparePickerSelectData(1)
                                            }
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.orderTypes.length > 0 ? '#ffffff' : '#f0f0f0' }}>{this.state.selectedOrderType ? this.state.selectedOrderType.value : 'Choose Order Type'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity activeOpacity={0.5} style={[styles.pickerAndDatePickerStyle, { width: Dimensions.get('screen').width - 90, height: 40, marginRight: 0, backgroundColor: Colors.SUB_COLOR }]} onPress={() => {
                                        this.props.onRecipientPress()
                                    }}>
                                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#ffffff' }}>{this.state.selectedRecipient ? this.state.selectedRecipient.name : 'Choose Recipient'}</Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, }}>
                                        <TouchableOpacity style={[styles.pickerAndDatePickerStyle, { flex: 1, backgroundColor: '#ffffff' },]} onPress={() => {
                                            this.setState({ isFromCreatedDatePickerVisible: true })
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#a1a1a1', textAlign: 'center' }}>{this.state.fromCreatedDate ? moment(this.state.fromCreatedDate).format('YYYY-MM-DD') : 'Created On'}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.pickerAndDatePickerStyle, { flex: 1, backgroundColor: '#ffffff', marginRight: 0 },]} onPress={() => {
                                            this.setState({ isToCreatedDatePickerVisible: true })
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#a1a1a1', textAlign: 'center' }}>{this.state.toCreatedDate ? moment(this.state.toCreatedDate).format('YYYY-MM-DD') : 'Created Till'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, }}>
                                        <TouchableOpacity style={[styles.pickerAndDatePickerStyle, { flex: 1, backgroundColor: '#ffffff' },]} onPress={() => {
                                            this.setState({ isFromCompletedDatePickerVisible: true })
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#a1a1a1', textAlign: 'center' }}>{this.state.fromCompletedDate ? moment(this.state.fromCompletedDate).format('YYYY-MM-DD') : 'Completed On'}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.pickerAndDatePickerStyle, { flex: 1, backgroundColor: '#ffffff', marginRight: 0 },]} onPress={() => {
                                            this.setState({ isToCompletedDatePickerVisible: true })
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#a1a1a1', textAlign: 'center' }}>{this.state.toCompletedDate ? moment(this.state.toCompletedDate).format('YYYY-MM-DD') : 'Completed Till'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* buttons here */}
                                <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                                    <Buttons.RoundCornerButton
                                        buttonStyle={[styles.button, { width: null, flex: 1, shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]}
                                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                        label={Locals.CREATE_ORDER_CANCEL_BUTTON}
                                        sectionPressed={() => {
                                            // must cancel and dismiss alert
                                            // this.dimissAlert()
                                            this.setState({ mustShow: false })
                                        }}
                                    />

                                    <Buttons.RoundCornerButton
                                        buttonStyle={[styles.button, { width: null, flex: 1, borderWidth: 0, backgroundColor: '#f3be0c', marginLeft: 8 }]}
                                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                        label={Locals.ALERT_OK}
                                        sectionPressed={() => {
                                            this.confirmPressed()
                                        }}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </Animated.View>

                    <Pickers.SinglePicker
                        style={{ backgroundColor: 'white' }}
                        lang="en-US"
                        ref={ref => this.singlePicker = ref}
                        // defaultSelectedValue={}
                        onConfirm={this.handlePickerSelect}
                        onSelect={(value) => {
                            // console.log(value)
                            // this.setState({ selected: option.value })
                        }}
                        options={this.state.pickerData}
                    // buttonCancelStyle={{ paddingLeft: 10, fontFamily: Fonts.MAIN_FONT }}
                    // buttonAcceptStyle={{ paddingRight: 10, fontFamily: Fonts.MAIN_FONT }}
                    >
                    </Pickers.SinglePicker>

                    {/* date pickers */}
                    <DateTimePicker
                        date={this.state.fromCreatedDate ? this.state.fromCreatedDate : new Date()}
                        titleIOS={'Choose From Created Date'}
                        neverDisableConfirmIOS={true}
                        is24Hour={false}
                        isVisible={this.state.isFromCreatedDatePickerVisible}
                        onConfirm={(date) => {
                            this.setState({ isFromCreatedDatePickerVisible: false, fromCreatedDate: date })
                        }}
                        onCancel={() => {
                            this.setState({ isFromCreatedDatePickerVisible: false })
                        }}
                    />

                    <DateTimePicker
                        date={this.state.toCreatedDate ? this.state.toCreatedDate : new Date()}
                        titleIOS={'Choose To Created Date'}
                        neverDisableConfirmIOS={true}
                        is24Hour={false}
                        isVisible={this.state.isToCreatedDatePickerVisible}
                        onConfirm={(date) => {
                            this.setState({ isToCreatedDatePickerVisible: false, toCreatedDate: date })
                        }}
                        onCancel={() => {
                            this.setState({ isToCreatedDatePickerVisible: false })
                        }}
                    />

                    <DateTimePicker
                        date={this.state.fromCompletedDate ? this.state.fromCompletedDate : new Date()}
                        titleIOS={'Choose From Completed Date'}
                        neverDisableConfirmIOS={true}
                        is24Hour={false}
                        isVisible={this.state.isFromCompletedDatePickerVisible}
                        onConfirm={(date) => {
                            this.setState({ isFromCompletedDatePickerVisible: false, fromCompletedDate: date })
                        }}
                        onCancel={() => {
                            this.setState({ isFromCompletedDatePickerVisible: false })
                        }}
                    />

                    <DateTimePicker
                        date={this.state.toCompletedDate ? this.state.toCompletedDate : new Date()}
                        titleIOS={'Choose To Completed Date'}
                        neverDisableConfirmIOS={true}
                        is24Hour={false}
                        isVisible={this.state.isToCompletedDatePickerVisible}
                        onConfirm={(date) => {
                            this.setState({ isToCompletedDatePickerVisible: false, toCompletedDate: date })
                        }}
                        onCancel={() => {
                            this.setState({ isToCompletedDatePickerVisible: false })
                        }}
                    />

                </View>
            );
        } else {
            return null
        }
    }

    preparePickerSelectData = (id) => {

        let temp = []

        switch (id) {
            case 0://statuses  
                temp = this.state.statuses
                break;
            case 1://order types          
                temp = this.state.orderTypes
                break;
                // case 2://recipients             
                //     temp = this.state.recipients
                break;
            default:
                break;
        }

        this.setState({ pickerData: temp, selectedPickerTypeIndex: id }, () => {
            this.singlePicker.show()
        })
    }

    handlePickerSelect = (option) => {

        switch (this.state.selectedPickerTypeIndex) {
            case 0://statuses  
                this.setState({ selectedStatus: option })
                break;
            case 1://order types          
                this.setState({ selectedOrderType: option })
                break;
                // case 2://recipients             
                //     this.setState({ selectedRecipient: option })
                break;
            default:
                break;
        }
    }

    confirmPressed() {

        let values = {
            waybill: this.state.waybill,
            selectedOrderType: this.state.selectedOrderType,
            selectedStatus: this.state.selectedStatus,
            selectedRecipient: this.state.selectedRecipient,
            fromCreatedDate: this.state.fromCreatedDate,
            toCreatedDate: this.state.toCreatedDate,
            fromCompletedDate: this.state.fromCompletedDate,
            toCompletedDate: this.state.toCompletedDate,
        }

        this.setState({ mustShow: false }, () => { })
        this.props.confirmPressed(values)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1,
    },
    animatedContainer: {
        height: '95%',
        width: '95%',
        backgroundColor: 'white',
    },
    mainInnerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    inputFields: {
        color: '#a1a1a1',
        textAlign: 'center',
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width - 90,
        borderRadius: 5,
        // paddingLeft: 15,
        paddingVertical: 0,
        marginBottom: 15,
        height: 40,
    },
    inputFieldsError: {
        borderColor: Colors.BADGE_COLOR,
        borderWidth: 1
    },
    radioButtonMainView: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    radioButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
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
    pickerAndDatePickerStyle: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 15,
        marginRight: 15,
        borderColor: 'transparent',
        borderWidth: 1
    }
});