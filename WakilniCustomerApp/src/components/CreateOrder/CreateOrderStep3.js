import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Pickers, Alerts, Buttons } from '../../components';
import Locals from '../../localization/local';
import * as objectTypes from '../../constants/object_types';

var moment = require('moment')

export default class CreateOrderStep3 extends Component {

    constructor(props) {
        super(props);

        this.state = {

            isPictureRequired: false,
            isSignatureRequired: false
        }
    }

    componentWillMount() {
        this.prepareData(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.prepareData(newProps)
    }

    prepareData(data) {

        if (data.step3Data) {
            this.setState({ isPictureRequired: data.step3Data.isPictureRequired, isSignatureRequired: data.step3Data.isSignatureRequired })
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
                            <Text style={styles.headerStyle}>{Locals.CREATE_ORDER_STEP3_SUBTITLE}</Text>

                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                <TouchableOpacity
                                    style={[{
                                        marginTop: 20,
                                        flex: 1,
                                        height: 80,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: this.state.isSignatureRequired ? Colors.SUB_COLOR : '#ffffff',
                                        shadowColor: '#919191',
                                        shadowOffset: { width: 2, height: 2 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 2,
                                        elevation: 1
                                    }]}
                                    onPress={() => {
                                        this.setState({ isSignatureRequired: !this.state.isSignatureRequired }, () => { })
                                    }}
                                >
                                    <Image source={this.state.isSignatureRequired ? require('../../images/createOrder/createOrderSignature.png') : require('../../images/createOrder/createOrderSignature2.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginBottom: 5 }} />
                                    <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.isSignatureRequired ? '#ffffff' : '#929292', textAlign: 'center', fontSize: 16 }}>{Locals.CREATE_ORDER_SIGNATURE_REQUIRED}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{
                                        marginTop: 20,
                                        flex: 1,
                                        height: 80,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: this.state.isPictureRequired ? Colors.SUB_COLOR : '#ffffff',
                                        shadowColor: '#919191',
                                        shadowOffset: { width: 2, height: 2 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 2,
                                        elevation: 1
                                    }]}
                                    onPress={() => {
                                        this.setState({ isPictureRequired: !this.state.isPictureRequired }, () => { })
                                    }}
                                >
                                    <Image source={this.state.isPictureRequired ? require('../../images/createOrder/createOrderPicture.png') : require('../../images/createOrder/createOrderPicture2.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginBottom: 5 }} />
                                    <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.isPictureRequired ? '#ffffff' : '#929292', textAlign: 'center', fontSize: 16 }}>{Locals.CREATE_ORDER_PICTURE_REQUIRED}</Text>
                                </TouchableOpacity>
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
                                label={Locals.CREATE_ORDER_NEXT_BUTTON}
                                sectionPressed={() => {
                                    this.nextPressed()
                                }}
                            />
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        )
    }

    isInputValid() {
        var signatureValid = true, pictureValid = true

        return (signatureValid && pictureValid)
    }

    nextPressed() {


        if (this.isInputValid()) {

            let values = {
                isPictureRequired: this.state.isPictureRequired,
                isSignatureRequired: this.state.isSignatureRequired
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
    }
})