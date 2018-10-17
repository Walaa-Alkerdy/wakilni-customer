import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as ObjectTypes from '../../constants/object_types';

export default class CashAccountHeaderSection extends Component {

    constructor(props) {
        super(props);

        this.getTotalPriceInUSD = this.getTotalPriceInUSD.bind(this);
        this.getTotalPriceInLL = this.getTotalPriceInLL.bind(this);
        this.getTotalFinal = this.getTotalFinal.bind(this);
    }

    getTotalFinal(collections) {

        let final = '';
        let USDResult = this.getTotalPriceInUSD(collections).trim()
        let LLResult = this.getTotalPriceInLL(collections).trim()
        if (USDResult != '') {

            final = USDResult
        }

        if (LLResult != '') {

            if (USDResult != '') {

                final = final + ' / ' + LLResult
            } else {
                final = LLResult
            }
        }

        return final.trim()
    }

    getTotalPriceInUSD(taskCollection) {

        let total = 0

        taskCollection.forEach((item) => {

            if (ObjectTypes.CURRENCY.USD.id == item.currencyId) {

                total += parseFloat(item.amount)
            }
        })

        if (total > 0) {
            return ' ' + total.toFixed(2) + ' ' + ObjectTypes.CURRENCY.USD.label + ' '
        } else {
            return ''
        }
    }

    getTotalPriceInLL(taskCollection) {
        let total = 0

        taskCollection.forEach((item) => {
            if (ObjectTypes.CURRENCY.LBP.id == item.currencyId) {

                total += parseInt(item.amount)
            }
        })

        if (total > 0) {
            return ' ' + total + ' ' + ObjectTypes.CURRENCY.LBP.label + ' '
        } else {
            return ''
        }
    }

    render() {

        let arrowImage = this.props.isOpened ? require('../../images/common/dropDownArrowOpenedGray.png') : this.props.lang == 'en' ? require('../../images/common/dropDownArrowClosedGray.png') : require('../../images/common/dropDownArrowClosedGrayAR.png')

        if (this.props.lang == 'en') {
            return (
                <View style={[styles.mainContainer, this.props.isOpened ? this.props.isFirst ? { marginBottom: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 0 } : { marginBottom: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 20 } : this.props.isFirst ? { marginBottom: 0, marginTop: 0 } : { marginBottom: 0, marginTop: (this.props.openedIndex == this.props.currentIndex - 1) ? 0 : 20 }]}>

                    <View style={[styles.textContainer]}>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.MAIN_FONT, color: '#919191', marginLeft: 15 }}>{this.getTotalFinal(this.props.task.collections)}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.SUB_FONT, color: '#acacac', marginLeft: 5 }}>{Locals.CASH_ACCOUNT_PAGE_FROM}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1, fontFamily: Fonts.MAIN_FONT, color: '#919191', marginLeft: 5, marginRight: 0 }}>{this.props.task.receiver.name}</Text>
                    </View>

                    <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={arrowImage} />

                    {
                        this.props.isOpened ?
                            <View style={{ height: 1, backgroundColor: Colors.SUB_COLOR, position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                            </View>
                            : null
                    }
                </View>
            )
        } else {
            return (
                <View style={[styles.mainContainer, { justifyContent: 'space-between' }, this.props.isOpened ? this.props.isFirst ? { marginBottom: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 0 } : { marginBottom: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 20 } : this.props.isFirst ? { marginBottom: 0, marginTop: 0 } : { marginBottom: 0, marginTop: (this.props.openedIndex == this.props.currentIndex - 1) ? 0 : 20 }]}>

                    <Image style={{ marginLeft: 5, height: 15, width: 15, resizeMode: 'contain' }} source={arrowImage} />

                    <View style={[styles.textContainer, { justifyContent: 'flex-end', marginRight: 0, marginLeft: 15, overflow: 'hidden' }]}>
                        <Text numberOfLines={1} ellipsizeMode='head' style={{ flex: 1, fontFamily: Fonts.MAIN_FONT, color: '#919191', marginRight: 5, textAlign: 'right' }}>{this.props.task.receiver.name}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.SUB_FONT, color: '#acacac', marginRight: 5, textAlign: 'right', marginTop: 2 }}>{Locals.CASH_ACCOUNT_PAGE_FROM}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.MAIN_FONT, color: '#919191', marginRight: 5, textAlign: 'right' }}>{this.getTotalFinal(this.props.task.collections)}</Text>
                    </View>
                    {
                        this.props.isOpened ?
                            <View style={{ height: 1, backgroundColor: Colors.SUB_COLOR, position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                            </View>
                            : null
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        flex: 1,
        height: 40,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        // shadowColor: '#919191',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
        paddingRight: 15
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 15,
    }
})