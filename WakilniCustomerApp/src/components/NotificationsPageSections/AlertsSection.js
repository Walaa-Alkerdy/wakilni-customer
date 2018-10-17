import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as Helpers from '../../utils/helpers/generalHelpers';

import moment from 'moment';

export default class AlertsSection extends Component {

    constructor(props) {
        super(props);

        this.getDateFormat = this.getDateFormat.bind(this);
    }

    getDateFormat(createdAt) {

        let currentDateDay = moment(new Date()).format('DD')
        let receivedDateDay = moment(createdAt.date).format('DD')
        let currentDateMonth = moment(new Date()).format('MM')
        let receivedDateMonth = moment(createdAt.date).format('MM')
        let currentDateYear = moment(new Date()).format('YYYY')
        let receivedDateYear = moment(createdAt.date).format('YYYY')

        if (currentDateDay == receivedDateDay && currentDateMonth == receivedDateMonth && currentDateYear == receivedDateYear) {
            //must show hours format
            return Helpers.convertDateToCurrentTimeZone(createdAt.date, createdAt.timeZone ? createdAt.timeZone : null, 'hh:mm a')
            // return moment(date).format('hh:mm a')
        } else if (currentDateYear == receivedDateYear) {
            //must show day month format
            return Helpers.convertDateToCurrentTimeZone(createdAt.date, createdAt.timeZone ? createdAt.timeZone : null, 'DD MMM')
            // return moment(date).format('DD MMM')
        } else {
            //must show month and year
            return Helpers.convertDateToCurrentTimeZone(createdAt.date, createdAt.timeZone ? createdAt.timeZone : null, 'MMM YYYY')
            // return moment(date).format('MMM YYYY')
        }
    }

    render() {

        return (
            <TouchableOpacity
                style={styles.cellStyle}
                // activeOpacity={this.props.alertData.objectId != null ? 0.5 : 1}
                activeOpacity={1}
                onPress={() => {
                    this.props.cellPressed()
                }}
            >
                {
                    this.props.lang == 'en' ?
                        <View style={styles.dataContainerView}>
                            <View style={styles.dataSubContainerView}>
                                <Text style={styles.nameStyle}>
                                    {/* {this.props.alertData.senderName + ' '} */}
                                    <Text style={styles.messageStyle}>
                                        {this.props.alertData.data}
                                    </Text>
                                </Text>
                            </View>
                            <Text style={styles.dateStyle}>
                                {this.getDateFormat(this.props.alertData.createdAt)}
                            </Text>
                        </View>
                        :
                        <View style={styles.dataContainerView}>
                            <Text style={[styles.dateStyle, { textAlign: 'left' }]}>
                                {this.getDateFormat(this.props.alertData.createdAt)}
                            </Text>
                            <View style={[styles.dataSubContainerView, { alignSelf: 'flex-end' }]}>
                                <Text style={[styles.nameStyle, { textAlign: 'right' }]}>
                                    {/* {this.props.alertData.senderName + ' '} */}
                                    <Text style={[styles.messageStyle, { textAlign: 'right' }]}>
                                        {this.props.alertData.data}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                }

                <View style={styles.lineView}></View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cellStyle: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        minHeight: 50,
        justifyContent: 'center',
    },
    dataContainerView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dataSubContainerView: {
        // flex: 1,
        width: '76%',
    },
    nameStyle: {
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
    },
    messageStyle: {
        fontFamily: Fonts.SUB_FONT,
        color: '#919191',
        marginLeft: 5,
    },
    dateStyle: {
        textAlign: 'right',
        fontFamily: Fonts.MAIN_FONT,
        color: Colors.SUB_COLOR,
        fontSize: 13,
        width: '20%',
    },
    lineView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#dbdbdb',
        height: 1,
    }
})