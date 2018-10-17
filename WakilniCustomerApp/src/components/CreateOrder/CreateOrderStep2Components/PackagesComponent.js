import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Locals from '../../../localization/local';
import { Fonts, Colors } from '../../../constants/general'

export default class PackagesComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: props.data ? props.data.quantity : 1,
            quantityError: false,

            key: props.data ? props.data.key : -1,
            packages: props.data ? props.data.packages : [],
        }
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            quantity: newProps.data ? newProps.data.quantity : 1,
            quantityError: false,

            key: newProps.data ? newProps.data.key : -1,
            packages: newProps.data ? newProps.data.packages : [],
        })
    }

    render() {

        return (
            <View style={{ width: Dimensions.get('screen').width - 60 }}>

                {/* Header Section */}
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: this.props.isFirst ? 5 : 20, height: 30 }}>
                    <Text style={[styles.subHeaders, { fontFamily: Fonts.MAIN_FONT, fontSize: 14, marginBottom: 0, marginTop: 0 }]}>{`Package Number ${this.props.packageId}`}</Text>

                    {
                        this.props.total > 1 ?
                            <TouchableOpacity
                                style={[{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', }]}
                                onPress={() => {
                                    this.props.didPressDelete(this.state.key)
                                }}
                            >
                                <View style={[{
                                    width: 30,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 15,
                                    backgroundColor: Colors.BADGE_COLOR,
                                    shadowColor: Colors.BADGE_COLOR,
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 1
                                }]}>
                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 20, color: '#ffffff', textAlign: 'center' }}>-</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            null
                    }

                </View>

                <Text style={[styles.subHeaders, { marginTop: 5 }]}>{Locals.CREATE_ORDER_QUANTITY}</Text>
                <TextInput
                    selectionColor='#919191'
                    style={[styles.inputFields, this.state.quantityError ? styles.inputFieldsError : null]}
                    underlineColorAndroid={'transparent'}
                    placeholder={''}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                    // placeholder={Locals.EMAIL_PLACEHOLDER}
                    // placeholderTextColor={Colors.TEXT_COLOR}
                    // placeholderStyle={styles.inputFieldsPlaceholder}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={this.state.quantity.toString()}
                    onChangeText={(quantity) => {
                        this.setState({ quantity: quantity })
                        this.props.didChangeQTY(quantity, this.state.key)
                    }}
                    onSubmitEditing={(e) => {
                        let quantity = e.nativeEvent.text
                        let qty = quantity.length > 0 ? quantity.trim() == '' ? '1' : quantity : '1'
                        this.setState({ quantity: qty })
                        this.props.didChangeQTY(qty, this.state.key)
                    }}
                />

                {/* collection type */}
                <Text style={styles.subHeaders}>{Locals.CREATE_ORDER_PACKAGE_TYPE}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {
                        this.state.packages.map((packageType, index) => {
                            return (
                                <TouchableOpacity
                                    style={[{
                                        marginTop: 5,
                                        width: (Dimensions.get('screen').width - 40 - 20) / 5,
                                        height: 80,
                                        borderTopRightRadius: index % 4 == 0 && index != 0 ? 5 : 0,
                                        borderBottomRightRadius: index % 4 == 0 && index != 0 ? 5 : 0,
                                        borderTopLeftRadius: index % 5 == 0 || index == 0 ? 5 : 0,
                                        borderBottomLeftRadius: index % 5 == 0 || index == 0 ? 5 : 0,
                                        borderRightColor: '#c4c4c4',
                                        borderRightWidth: index % 4 != 0 || index == 0 ? 0.5 : 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: packageType.isSelected ? Colors.SUB_COLOR : '#ffffff',
                                        shadowColor: '#919191',
                                        shadowOffset: { width: 2, height: 2 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 2,
                                        elevation: 1
                                    }]}
                                    key={index}
                                    onPress={() => {
                                        this.props.didPress(packageType, this.state.key)
                                    }}
                                >
                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 16, color: packageType.isSelected ? '#ffffff' : '#929292', textAlign: 'center' }}>{packageType.labelAbbreviation}</Text>
                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, fontSize: 10, color: packageType.isSelected ? '#ffffff' : '#929292', textAlign: 'center' }}>{packageType.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subHeaders: {
        color: '#929292',
        fontFamily: Fonts.SUB_FONT,
        marginTop: 15,
        marginBottom: 5,
    },
    inputFields: {
        color: '#a1a1a1',
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
})