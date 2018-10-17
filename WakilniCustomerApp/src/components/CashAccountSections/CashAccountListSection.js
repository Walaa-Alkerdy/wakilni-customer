import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as ObjectTypes from '../../constants/object_types';

export default class CashAccountListSection extends Component {

    constructor(props) {
        super(props);

        this.getStatusText = this.getStatusText.bind(this);
    }

    getStatusText(statusId) {

        switch (statusId) {
            case ObjectTypes.MONEY.CASH.id:
                return ObjectTypes.MONEY.CASH.label;
            case ObjectTypes.MONEY.CHECK.id:
                return ObjectTypes.MONEY.CHECK.label;
                case ObjectTypes.MONEY.CARD.id:
                return ObjectTypes.MONEY.CARD.label;
        }
    }

    render() {
        console.log(this.props.task)
        return (
            <View style={[styles.mainContainer, { marginBottom: this.props.isLast ? 0 : 20 }]}>
                {
                    this.props.lang == 'en' ?
                        <View style={styles.dataContainer}>
                            <View style={styles.dataContainerSub}>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start' }]}>
                                    <Text numberOfLines={2} style={styles.titleText}>{Locals.CASH_ACCOUNT_PAGE_ORDER_NUMBER}</Text>
                                    <Text numberOfLines={2} style={styles.normalText}>{this.props.task.order.id}</Text>
                                </View>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start', width: '45%' }]}>
                                    <Text numberOfLines={2} style={[styles.titleText, { width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_TYPE}</Text>
                                    <Text numberOfLines={2} style={[styles.normalText, { width: '45%' }]}>{this.getStatusText(this.props.task.collections[0].typeID)}</Text>
                                </View>
                            </View>
                            <View style={styles.dataContainerSub}>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start' }]}>
                                    <Text numberOfLines={2} style={styles.titleText}>{Locals.CASH_ACCOUNT_PAGE_CLIENT}</Text>
                                    <Text numberOfLines={2} style={styles.normalText}>{this.props.task.customer.name}</Text>
                                    {/* <Text numberOfLines={2} style={styles.normalText}>{this.props.task.customer.name}</Text> */}
                                </View>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start', width: '45%' }]}>
                                    <Text numberOfLines={2} style={[styles.titleText, { width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_SEQUENCE}</Text>
                                    <Text numberOfLines={2} style={[styles.normalText, { width: '45%' }]}>{this.props.task.sequence}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.dataContainer}>
                            <View style={styles.dataContainerSub}>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-end', width: '50%' }]}>
                                    <Text numberOfLines={2} style={[styles.normalText, { textAlign: 'left', width: '40%' }]}>{this.getStatusText(this.props.task.collections[0].typeID)}</Text>
                                    <Text numberOfLines={2} style={[styles.titleText, { textAlign: 'right', width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_TYPE}</Text>
                                </View>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-end' }]}>
                                    <Text numberOfLines={2} style={[styles.normalText, { textAlign: 'left', width: '40%' }]}>{this.props.task.order.id}</Text>
                                    <Text numberOfLines={2} style={[styles.titleText, { textAlign: 'right', width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_ORDER_NUMBER}</Text>
                                </View>
                            </View>
                            <View style={[styles.dataContainerSub, { justifyContent: 'flex-end' }]}>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-end', width: '50%' }]}>
                                    <Text numberOfLines={2} style={[styles.normalText, { textAlign: 'left', width: '40%' }]}>{this.props.task.sequence}</Text>
                                    <Text numberOfLines={2} style={[styles.titleText, { textAlign: 'right', width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_SEQUENCE}</Text>
                                </View>
                                <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-end' }]}>
                                    {/* <Text numberOfLines={2} style={[styles.normalText, { textAlign: 'left', width: '40%' }]}>{this.props.task.customer.name}</Text> */}
                                    <Text numberOfLines={2} style={[styles.normalText, { textAlign: 'left', width: '40%' }]}>{this.props.task.customer.name}</Text>
                                    <Text numberOfLines={2} style={[styles.titleText, { textAlign: 'right', width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_CLIENT}</Text>
                                </View>
                            </View>
                        </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#919191',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1
    },
    dataContainer: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    dataContainerSub: {
        height: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dataContainerSubSub: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '50%',
        flexDirection: 'row'
    },
    titleText: {
        width: '40%',
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
        textAlign: 'left'
    },
    normalText: {
        width: '55%',
        fontFamily: Fonts.SUB_FONT,
        color: '#acacac',
        textAlign: 'right'
    }
})