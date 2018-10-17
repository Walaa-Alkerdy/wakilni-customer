import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as ServerStatus from '../../constants/server_states';
import * as ObjectTypes from '../../constants/object_types';
import moment from 'moment';

export default class TasksPageSections2 extends Component {

    constructor(props) {

        super(props);

        this.state = {
            buttonDisabled: false,
        }

        this.prepareHeaderColor = this.prepareHeaderColor.bind(this);
        this.getOrderStatusColor = this.getOrderStatusColor.bind(this);
        this.checkDirectionsSize = this.checkDirectionsSize.bind(this);
        this.getDirectionsSize = this.getDirectionsSize.bind(this);
    }

    getOrderStatusColor(task) {

        switch (task.order.status) {
            case ServerStatus.OrderStatus.ORDER_STATUS_CANCELED.key:
            case ServerStatus.OrderStatus.ORDER_STATUS_CLOSED_FAILED.key:
            case ServerStatus.OrderStatus.ORDER_STATUS_DECLINED.key:
            case ServerStatus.OrderStatus.ORDER_STATUS_FAILED.key:

                return '#fe8e8e';
            case ServerStatus.OrderStatus.ORDER_STATUS_CONFIRMED.key:
            case ServerStatus.OrderStatus.ORDER_STATUS_PENDING.key:
            case ServerStatus.OrderStatus.ORDER_STATUS_PROCESSING.key:
                if (task.isSecured) {

                    return '#ffae7e';
                } else {

                    return '#00cee0';
                }
            case ServerStatus.OrderStatus.ORDER_STATUS_SUCCESS.key:
                return '#000000';
            default:
                return '#000000';
        }
    }

    prepareHeaderColor() {

        let values = {
            color: '#00e0c8',
            text: 'STARTED'
        }

        switch (this.props.task.status.key) {
            case ServerStatus.TaskStatus.TASK_STATUS_SECURED.key://secured
                values = { color: this.getOrderStatusColor(this.props.task), text: ServerStatus.TaskStatus.TASK_STATUS_SECURED.label };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_PENDING.key://pending
                values = { color: this.getOrderStatusColor(this.props.task), text: ServerStatus.TaskStatus.TASK_STATUS_PENDING.label };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_ASSIGNED.key://assigned
                values = { color: this.getOrderStatusColor(this.props.task), text: ServerStatus.TaskStatus.TASK_STATUS_PENDING.label };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_ON_THE_WAY.key://on the way
                values = { color: this.getOrderStatusColor(this.props.task), text: values.text };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_COMPLETE.key://complete
                values = { color: this.getOrderStatusColor(this.props.task), text: ServerStatus.TaskStatus.TASK_STATUS_COMPLETE.label };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_FAILED.key://failed
                values = { color: this.getOrderStatusColor(this.props.task), text: ServerStatus.TaskStatus.TASK_STATUS_FAILED.label };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_CANCELED.key://canceled
                values = { color: this.getOrderStatusColor(this.props.task), text: ServerStatus.TaskStatus.TASK_STATUS_CANCELED.label };
                break;
            case ServerStatus.TaskStatus.TASK_STATUS_RE_SCHEDULED.key://re-scheduled
                values = { color: values.color, text: ServerStatus.TaskStatus.TASK_STATUS_RE_SCHEDULED.label };
                break;
            default:
                values = values
                break;
        }

        if (this.props.task.isSecured) {
            values = {
                color: '#A9CCE3',
                text: ServerStatus.TaskStatus.TASK_STATUS_SECURED.label
            }
        }

        return values;
    }

    prepareTruckImage() {

        let image = require('../../images/common/truck1.png');
        switch (this.props.task.order.orderDetails.typeId) {
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

    checkDirectionsSize(task) {

        if (this.getDirectionsSize(task) > 25) {
            return true
        } else {
            return false
        }
    }

    getDirectionsSize(task) {

        return (task.location.areaData.name + ', ' + task.location.building + task.location.directions).length
    }

    render() {

        let values = this.prepareHeaderColor()
        let truckImage = this.prepareTruckImage()

        return (
            <TouchableOpacity
                style={{ width: (Dimensions.get('screen').width / 100) * 95, flex: 1, flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', marginBottom: this.props.isLast ? 20 : 0 }}
                disabled={this.state.buttonDisabled} onPress={() => {
                    this.setState({ buttonDisabled: true }, () => {
                        this.props.sectionPressed()
                    })
                    // enable after 2 second
                    setTimeout(() => {
                        this.setState({ buttonDisabled: false });
                    }, 2000)
                }}>
                <View style={[styles.taskContainerCSS, this.props.isLast ? { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 } : {}]}>
                    <View style={{ width: '100%', height: 1, backgroundColor: values.color, marginBottom: 5 }}></View>

                    {
                        this.props.lang == 'en' ?
                            <View style={[styles.taskContainerHeaderCSS, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                <Text style={[styles.taskContainerHeaderTextCSS, { color: values.color }]}>{values.text}</Text>
                                {
                                    this.props.task.isSecured ? <Image style={{ height: 12, width: 12, resizeMode: 'contain', marginLeft: 5, marginTop: 2.5 }} source={require('../../images/task/securedIcon.png')} />
                                        :
                                        null
                                }
                            </View>
                            :
                            <View style={[styles.taskContainerHeaderCSS, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                                <Text style={[styles.taskContainerHeaderTextCSS, { color: values.color, textAlign: 'right', marginLeft: 0, marginRight: this.props.task.isSecured ? 5 : 15 }]}>{values.text}</Text>
                                {
                                    this.props.task.isSecured ? <Image style={{ height: 12, width: 12, resizeMode: 'contain', marginRight: 5, marginTop: 2.5 }} source={require('../../images/task/securedIcon.png')} />
                                        :
                                        null
                                }
                            </View>
                    }
                    <View style={styles.taskSubContainerCSS}>

                        {
                            this.props.lang == 'en' ?
                                this.checkDirectionsSize(this.props.task) ?
                                    <View style={[styles.taskSubContainerSubCSS, { flexDirection: 'column', justifyContent: 'flex-start' }]}>
                                        <View style={[styles.taskSubContainerSubSubCSS, { minHeight: 40, width: '85%' }]}>
                                            <Image style={[styles.imageCSS, { marginLeft: 18, alignSelf: this.getDirectionsSize(this.props.task) > 40 ? 'flex-start' : null }]} source={require('../../images/task/taskLocation.png')} />
                                            <Text style={[styles.taskSubContainerSubSubTextCSS, { width: '100%' }]}>{this.props.task.location.areaData.name + ', ' + this.props.task.location.building + this.props.task.location.directions}</Text>
                                        </View>
                                        <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '85%' }]}>
                                            <Image style={[styles.imageCSS, { marginLeft: 20 }]} source={truckImage} />
                                            <Text style={styles.taskSubContainerSubSubTextCSS}>{this.props.task.type.label}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.taskSubContainerSubCSS}>
                                        <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                            <Image style={styles.imageCSS} source={require('../../images/task/taskLocation.png')} />
                                            <Text numberOfLines={2} style={styles.taskSubContainerSubSubTextCSS}>{this.props.task.location.areaData.name + ', ' + this.props.task.location.building + this.props.task.location.directions}</Text>
                                        </View>
                                        <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                            <Image style={[styles.imageCSS, { marginLeft: 5 }]} source={truckImage} />
                                            <Text style={styles.taskSubContainerSubSubTextCSS}>{this.props.task.type.label}</Text>
                                        </View>
                                    </View>
                                :
                                this.checkDirectionsSize(this.props.task) ?
                                    <View style={[styles.taskSubContainerSubCSS, { flexDirection: 'column' }]}>
                                        <View style={[styles.taskSubContainerSubSubCSS, { minHeight: 40, width: '95%' }]}>
                                            <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right', width: null, flex: 1, marginLeft: 15 }]}>{this.props.task.location.areaData.name + ', ' + this.props.task.location.building + this.props.task.location.directions}</Text>
                                            <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 0, alignSelf: this.getDirectionsSize(this.props.task) > 40 ? 'flex-start' : null, marginTop: this.getDirectionsSize(this.props.task) > 40 ? 5 : 0 }]} source={require('../../images/task/taskLocation.png')} />
                                        </View>
                                        <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '88%' }]}>
                                            <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right', width: '100%' }]}>{this.props.task.type.label}</Text>
                                            <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 0 }]} source={truckImage} />
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.taskSubContainerSubCSS}>
                                        <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                            <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right' }]}>{this.props.task.type.label}</Text>
                                            <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 0 }]} source={truckImage} />
                                        </View>
                                        <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                            <Text numberOfLines={2} style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right' }]}>{this.props.task.location.areaData.name + ', ' + this.props.task.location.building + this.props.task.location.directions}</Text>
                                            <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 0 }]} source={require('../../images/task/taskLocation.png')} />
                                        </View>
                                    </View>
                        }

                        {
                            this.props.lang == 'en' ?
                                <View style={[styles.taskSubContainerSubCSS, { justifyContent: (this.props.task.preferredFromTime && this.props.task.preferredToTime) ? 'center' : 'flex-start' }]}>
                                    {
                                        (this.props.task.preferredFromTime && this.props.task.preferredToTime) ?
                                            <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                                <Image style={[styles.imageCSS, { marginLeft: 0 }]} source={require('../../images/task/taskTime.png')} />
                                                <Text style={styles.taskSubContainerSubSubTextCSS}>{moment(this.props.task.preferredFromTime, 'hh:mm').format('hh:mm a') + ' ' + Locals.to + ' ' + moment(this.props.task.preferredToTime, 'hh:mm').format('hh:mm a')}</Text>
                                            </View>
                                            :
                                            <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '0%', marginLeft: 15 }]}>
                                                {/* <Image style={[styles.imageCSS, { marginLeft: 0 }]} source={require('../../images/task/taskTime.png')} />
                                                <Text style={styles.taskSubContainerSubSubTextCSS}>{moment(this.props.task.preferredFromTime, 'hh:mm').format('hh:mm a') + ' to ' + moment(this.props.task.preferredToTime, 'hh:mm').format('hh:mm a')}</Text> */}
                                            </View>
                                    }

                                    <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                        <Image style={[styles.imageCSS, { marginLeft: 5 }]} source={require('../../images/task/taskTaskNumber.png')} />
                                        <Text style={styles.taskSubContainerSubSubTextCSS}>{this.props.task.sequence}</Text>
                                    </View>
                                    {/* <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '25%' }]}>
                                <Image style={[styles.imageCSS, { marginLeft: 5 }]} source={require('../../images/taskTaskNumber.png')} />
                                <Text style={styles.taskSubContainerSubSubTextCSS}>{this.props.task.taskId}</Text>
                            </View> */}
                                </View>
                                :
                                <View style={[styles.taskSubContainerSubCSS, { justifyContent: (this.props.task.preferredFromTime && this.props.task.preferredToTime) ? 'center' : 'flex-end' }]}>
                                    <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                        <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right' }]}>{this.props.task.sequence}</Text>
                                        <Image style={[styles.imageCSS, { marginLeft: 8 }]} source={require('../../images/task/taskTaskNumber.png')} />
                                    </View>
                                    {
                                        (this.props.task.preferredFromTime && this.props.task.preferredToTime) ?
                                            <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%' }]}>
                                                <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right' }]}>{moment(this.props.task.preferredFromTime, 'hh:mm').format('hh:mm a') + ' ' + Locals.to + ' ' + moment(this.props.task.preferredToTime, 'hh:mm').format('hh:mm a')}</Text>
                                                <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 0 }]} source={require('../../images/task/taskTime.png')} />
                                            </View>
                                            :
                                            <View style={[styles.taskSubContainerSubSubCSS, { marginRight: 18, height: 40, width: '0%' }]}>
                                                {/* <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right' }]}>{moment(this.props.task.preferredFromTime, 'hh:mm').format('hh:mm a') + ' to ' + moment(this.props.task.preferredToTime, 'hh:mm').format('hh:mm a')}</Text>
                                                <Image style={[styles.imageCSS, { marginLeft: 8, marginRight: 0 }]} source={require('../../images/task/taskTime.png')} /> */}
                                            </View>
                                    }

                                    {/* <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '25%' }]}>
                                <Image style={[styles.imageCSS, { marginLeft: 5 }]} source={require('../../images/taskTaskNumber.png')} />
                                <Text style={styles.taskSubContainerSubSubTextCSS}>{this.props.task.taskId}</Text>
                            </View> */}
                                </View>
                        }

                        {
                            this.props.lang == 'en' ?
                                <View style={styles.taskSubContainerSubCSS}>
                                    <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: null, justifyContent: 'center' }]}>
                                        <Text style={styles.taskSubContainerSubSubTextCSS}>{Locals.TASKS_VIEW_RECEIVER}:</Text>
                                        <Text style={[styles.taskSubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>{(this.props.task.receiver.name) ? this.props.task.receiver.name : ''}</Text>
                                    </View>
                                    <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: null, justifyContent: 'center' }]}>
                                        {/* <Text style={styles.taskSubContainerSubSubTextCSS}>{Locals.TASKS_VIEW_CLIENT}:</Text>
                                <Text style={[styles.taskSubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>{(this.props.task.customer.name) ? this.props.task.customer.name : ''}</Text> */}
                                    </View>
                                </View>
                                :
                                <View style={styles.taskSubContainerSubCSS}>
                                    <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }]}>
                                        {/* <Text style={styles.taskSubContainerSubSubTextCSS}>{Locals.TASKS_VIEW_CLIENT}:</Text>
                                <Text style={[styles.taskSubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>{(this.props.task.customer.name) ? this.props.task.customer.name : ''}</Text> */}
                                    </View>
                                    <View style={[styles.taskSubContainerSubSubCSS, { height: 40, width: '45%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }]}>
                                        <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right' }]}>{Locals.TASKS_VIEW_RECEIVER}</Text>
                                        <Text style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right', fontSize: 12, fontFamily: Fonts.SUB_FONT, color: '#a9a9a9' }]}>{(this.props.task.receiver.name) ? this.props.task.receiver.name : ''}</Text>
                                    </View>
                                </View>
                        }

                        {
                            this.props.lang == 'en' ?
                                <View style={styles.taskSubContainerSubCSS}>
                                    <View style={[styles.taskSubContainerSubSubCSS, { minHeight: this.props.task.note ? 40 : 0, width: '90%', marginBottom: 5 }]}>
                                        <Text numberOfLines={3} style={[styles.taskSubContainerSubSubTextCSS, { fontSize: 12, fontFamily: Fonts.SUB_FONT, width: '100%', color: '#a9a9a9' }]}>{this.props.task.note ? this.props.task.note : ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.taskSubContainerSubCSS}>
                                    <View style={[styles.taskSubContainerSubSubCSS, { minHeight: this.props.task.note ? 40 : 0, width: '90%', marginBottom: 5 }]}>
                                        <Text numberOfLines={3} style={[styles.taskSubContainerSubSubTextCSS, { textAlign: 'right', fontSize: 12, fontFamily: Fonts.SUB_FONT, width: '100%', color: '#a9a9a9' }]}>{this.props.task.note ? this.props.task.note : ''}</Text>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    taskContainerCSS: {
        width: '100%',
        // borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    taskContainerHeaderCSS: {
        height: 30,
        justifyContent: 'center',
    },
    taskContainerHeaderTextCSS: {
        marginLeft: 15,
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff'
    },
    taskSubContainerCSS: {
        flex: 1,
        overflow: 'hidden'
    },
    taskSubContainerSubCSS: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    taskSubContainerSubSubCSS: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskSubContainerSubSubTextCSS: {
        width: '85%',
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
        fontSize: 12,
        // fontWeight: 'normal'
    },
    imageCSS: {
        resizeMode: 'contain',
        height: 16.5,
        width: 16.5,
        marginRight: 8,
    }
})