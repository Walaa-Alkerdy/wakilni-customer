import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Fonts } from '../../constants/general';
import { OrderStatus } from '../../constants/server_states';
import * as ObjectTypes from '../../constants/object_types';
import Locals from '../../localization/local';

var moment = require('moment')

export default class OrdersPageSection extends Component {

    constructor(props) {
        super(props);

        this.getOrderStatusColor = this.getOrderStatusColor.bind(this);
        this.getOrderStatusText = this.getOrderStatusText.bind(this);
        this.getTruckImage = this.getTruckImage.bind(this);
        this.getTruckText = this.getTruckText.bind(this);
    }

    getOrderStatusColor(statusId) {

        switch (statusId) {
            case OrderStatus.ORDER_STATUS_CANCELED.key:
            case OrderStatus.ORDER_STATUS_CLOSED_FAILED.key:
            case OrderStatus.ORDER_STATUS_DECLINED.key:
            case OrderStatus.ORDER_STATUS_FAILED.key:

                return '#fe8e8e';
            case OrderStatus.ORDER_STATUS_CONFIRMED.key:
            case OrderStatus.ORDER_STATUS_PENDING.key:
            case OrderStatus.ORDER_STATUS_PROCESSING.key:

                // if(this.props.task.isSecured){

                //     return '#ffae7e';
                // }else{

                return '#00cee0';
            // }
            case OrderStatus.ORDER_STATUS_SUCCESS.key:
                return '#000000';
            default:
                return '#000000';
        }
    }

    getOrderStatusText(statusId) {
        switch (statusId) {
            case OrderStatus.ORDER_STATUS_CANCELED.key:
                return OrderStatus.ORDER_STATUS_CANCELED.label
            case OrderStatus.ORDER_STATUS_CLOSED_FAILED.key:
                return OrderStatus.ORDER_STATUS_CLOSED_FAILED.label
            case OrderStatus.ORDER_STATUS_DECLINED.key:
                return OrderStatus.ORDER_STATUS_DECLINED.label
            case OrderStatus.ORDER_STATUS_FAILED.key:
                return OrderStatus.ORDER_STATUS_FAILED.label
            case OrderStatus.ORDER_STATUS_CONFIRMED.key:
                return OrderStatus.ORDER_STATUS_CONFIRMED.label
            case OrderStatus.ORDER_STATUS_PENDING.key:
                return OrderStatus.ORDER_STATUS_PENDING.label
            case OrderStatus.ORDER_STATUS_PROCESSING.key:
                return OrderStatus.ORDER_STATUS_PROCESSING.label
            case OrderStatus.ORDER_STATUS_SUCCESS.key:
                return OrderStatus.ORDER_STATUS_SUCCESS.label
        }
    }

    getTruckImage(typeId) {

        switch (typeId) {
            case ObjectTypes.ORDER.ONE_WAY_TRIP.id:// one way
                return require('../../images/common/truck3.png');
            case ObjectTypes.ORDER.BULK_TRIP.id:// bulk
                return require('../../images/common/truck1.png');
            case ObjectTypes.ORDER.RETURN_TRIP.id:// return
                return require('../../images/common/truck2.png');
            case ObjectTypes.ORDER.PIGGY_BANK_TRIP.id:// piggy bank
                return require('../../images/common/truck4.png');
            default:
                return require('../../images/common/truck1.png');
        }
    }

    getTruckText(typeId) {

        switch (typeId) {
            case ObjectTypes.ORDER.ONE_WAY_TRIP.id:// one way
                return ObjectTypes.ORDER.ONE_WAY_TRIP.label;
            case ObjectTypes.ORDER.BULK_TRIP.id:// bulk
                return ObjectTypes.ORDER.BULK_TRIP.label;
            case ObjectTypes.ORDER.RETURN_TRIP.id:// return
                return ObjectTypes.ORDER.RETURN_TRIP.label;
            case ObjectTypes.ORDER.PIGGY_BANK_TRIP.id:// piggy bank
                return ObjectTypes.ORDER.PIGGY_BANK_TRIP.label;
            default:
                return '';
        }
    }

    getCollectionAmountText() {

        let final = '0'
        if (this.props.order.orderDetails.collectionAmount) {
            if (this.props.order.orderDetails.collectionAmount != '') {
                final = this.props.order.orderDetails.collectionAmount
            }
        }

        if (this.props.order.orderDetails.collectionCurrency) {
            switch (this.props.order.orderDetails.collectionCurrency.id) {
                case ObjectTypes.CURRENCY.USD.id:
                    final = ObjectTypes.CURRENCY.USD.label + ' ' + final
                    break;
                case ObjectTypes.CURRENCY.LBP.id:
                    final = final + ' ' + ObjectTypes.CURRENCY.LBP.label
                    break;
                default:
                    break;
            }
        }

        return final
    }

    render() {

        let truckImage = this.getTruckImage(this.props.order.orderDetails.type.id)

        return (
            <View style={[styles.mainContainerView]}>

                {
                    this.props.lang == 'en' ?
                        <View style={[styles.headerSection, { backgroundColor: this.getOrderStatusColor(this.props.order.status) }]}>
                            <Text style={styles.headerSectionText}>{this.getOrderStatusText(this.props.order.status)}</Text>
                            {/* <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={arrowImage} /> */}
                        </View>
                        :
                        <View style={[styles.headerSection, { backgroundColor: this.getOrderStatusColor(this.props.order.status) }]}>
                            {/* <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={arrowImage} /> */}
                            <Text style={[styles.headerSectionText, { textAlign: 'right' }]}>{this.getOrderStatusText(this.props.order.status)}</Text>
                        </View>
                }

                {
                    this.props.lang == 'en' ?
                        <View style={styles.bodySection}>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '25%' }]}>
                                <Image style={styles.imageCSS} source={require('../../images/task/taskOrderNumber.png')} />
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{this.props.order.id}</Text>
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '25%' }]}>
                                <Image style={[styles.imageCSS, { marginLeft: 5 }]} source={require('../../images/task/tasksOrderImage2.png')} />
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{this.props.order.tasks.length}</Text>
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '40%' }]}>
                                <Image style={[styles.imageCSS, { marginLeft: 5 }]} source={truckImage} />
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{this.getTruckText(this.props.order.orderDetails.type.id)}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.bodySection}>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '40%' }]}>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { textAlign: 'right' }]}>{this.getTruckText(this.props.order.orderDetails.type.id)}</Text>
                                <Image style={[styles.imageCSS, { marginLeft: 8 }]} source={truckImage} />
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '25%' }]}>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { textAlign: 'right' }]}>{this.props.order.tasks.length}</Text>
                                <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 5 }]} source={require('../../images/task/tasksOrderImage2.png')} />
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '25%' }]}>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { textAlign: 'right' }]}>{this.props.order.id}</Text>
                                <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 5 }]} source={require('../../images/task/taskOrderNumber.png')} />
                            </View>
                        </View>
                }

                {
                    this.props.lang == 'en' ?
                        <View style={styles.bodySection}>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: null, justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Schedule Date'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.preferredReceiverDate ? moment(this.props.order.orderDetails.preferredReceiverDate).format('DD-MM-YYYY') : 'None'}
                                </Text>
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: null, justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Collection Amount'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.getCollectionAmountText()}
                                </Text>
                            </View>
                        </View>
                        :
                        <View style={styles.bodySection}>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Collection Amount'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.collectionAmount ? this.props.order.orderDetails.collectionAmount != '' ? this.props.order.orderDetails.collectionAmount : '0' : '0'}
                                </Text>
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Schedule Date'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.preferredReceiverDate ? moment(this.props.order.orderDetails.preferredReceiverDate).format('DD-MM-YYYY') : 'None'}
                                </Text>
                            </View>
                        </View>
                }

                {
                    this.props.lang == 'en' ?
                        <View style={[styles.bodySection]}>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: null, justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Receiver Name'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.receiverable ? this.props.order.orderDetails.receiverable.name : ''}
                                </Text>
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: null, justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Receiver Location'}:</Text>
                                <Text numberOfLines={1} style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.receiverLocation ? this.props.order.orderDetails.receiverLocation.fullLocation : ''}
                                </Text>
                            </View>
                        </View>
                        :
                        <View style={[styles.bodySection]}>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Receiver Location'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.receiverLocation ? this.props.order.orderDetails.receiverLocation.fullLocation : ''}
                                </Text>
                            </View>
                            <View style={[styles.bodySubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }]}>
                                <Text style={styles.bodySubContainerSubSubTextCSS}>{'Receiver Name'}:</Text>
                                <Text style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>
                                    {this.props.order.orderDetails.receiverable ? this.props.order.orderDetails.receiverable.name : ''}
                                </Text>
                            </View>
                        </View>
                }

                {
                    this.props.lang == 'en' ?
                        <View style={styles.bodySection}>
                            {
                                this.props.order.orderDetails.description ?
                                    <View style={[styles.bodySubContainerSubSubCSS, { flexDirection: 'column', minHeight: this.props.order.orderDetails.description ? 40 : 0, width: '90%', marginBottom: 5 }]}>
                                        <Text style={[styles.bodySubContainerSubSubTextCSS, { width: '100%' }]}>{Locals.TASKS_VIEW_INFO}</Text>
                                        <Text numberOfLines={3} style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, width: '100%', color: '#a9a9a9' }]}>{this.props.order.orderDetails.description ? this.props.order.orderDetails.description : ''}</Text>
                                    </View>
                                    : null
                            }
                        </View>
                        :
                        <View style={styles.bodySection}>
                            {
                                this.props.order.orderDetails.description ?
                                    <View style={[styles.bodySubContainerSubSubCSS, { flexDirection: 'column', minHeight: this.props.order.orderDetails.description ? 40 : 0, width: '90%', marginBottom: 5 }]}>
                                        <Text style={[styles.bodySubContainerSubSubTextCSS, { textAlign: 'right', width: '100%' }]}>{Locals.TASKS_VIEW_INFO}</Text>
                                        <Text numberOfLines={3} style={[styles.bodySubContainerSubSubTextCSS, { fontSize: 12, textAlign: 'right', fontFamily: Fonts.SUB_FONT, width: '100%', color: '#a9a9a9' }]}>{this.props.order.orderDetails.description ? this.props.order.orderDetails.description : ''}</Text>
                                    </View>
                                    : null
                            }
                        </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mainContainerView: {
        width: '100%',
        justifyContent: 'flex-start',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        paddingBottom: 10
    },
    headerSection: {
        flexDirection: 'row',
        backgroundColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 30,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerSectionText: {
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff',
        fontSize: 15
    },
    bodySection: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bodySubContainerSubSubCSS: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodySubContainerSubSubTextCSS: {
        width: '85%',
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
        fontSize: 12,
    },
    imageCSS: {
        resizeMode: 'contain',
        height: 16.5,
        width: 16.5,
        marginRight: 8,
    }
})