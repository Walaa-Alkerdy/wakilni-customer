import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Buttons } from '../../components';
import Locals from '../../localization/local';
import moment from 'moment';
import { Fonts } from '../../constants/general';
import * as Helpers from '../../utils/helpers/generalHelpers';
import * as ServerStatus from '../../constants/server_states'

class ListRow extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.request);
    }

    renderStatusSection = () => {
        if (this.props.request.item.status == ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key) {
            return (<View style={{ marginBottom: 10 }}></View>)
            // return <Buttons.RoundCornerButton label="DELETE" textStyle={{ color: '#f3be0c', fontFamily: Fonts.MAIN_FONT }}
            //     buttonStyle={{ borderColor: '#f3be0c', width: '35%', height: 33, marginTop: 10, marginBottom: 10, alignSelf: 'center' }} sectionPressed={() => {
            //         this.props.onDeletePressed(this.props.request.item)
            //     }} />
        } else if (this.props.request.item.status === ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_REJECTED.key) {
            return <View style={{
                width: 130, backgroundColor: '#ff8a8a',
                borderRadius: 10, alignContent: 'center', alignItems: 'center',
                height: 40, marginTop: 10, alignSelf: 'center', justifyContent: 'center',
                marginBottom: -14
            }}>
                <Text style={{ color: 'white', marginBottom: 10, fontFamily: Fonts.MAIN_FONT }}>{ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_REJECTED.label}</Text>
            </View>
        } else {
            return <View style={{
                width: 130, backgroundColor: '#00e0c8',
                borderRadius: 10, alignContent: 'center', alignItems: 'center',
                height: 40, marginTop: 10, alignSelf: 'center', justifyContent: 'center',
                marginBottom: -14
            }}>
                <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10, fontFamily: Fonts.MAIN_FONT }}>{ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_ACCEPTED.label}</Text>
            </View>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.lang == 'en' ?
                        <View style={styles.subContainer}>
                            <View style={[styles.row, { padding: 10 }]}>
                                <Text style={styles.label}>{Locals.DATE + ": "}</Text>
                                <Text style={styles.fontSmall}>{Helpers.convertDateToCurrentTimeZone(this.props.request.item.createdAt.date, this.props.request.item.createdAt.timeZone ? this.props.request.item.createdAt.timeZone : null, 'DD/MM/YYYY')}</Text>

                                {/* <View style={{ flex: 1 }}></View>
                    <Text style={styles.label}>{Locals.DATE + ": "}</Text>
                    <Text style={styles.fontSmall}>{moment(this.props.request.item.type.created_at).format("hh:mm a")}</Text> */}
                                {/* <Text style={[styles.fontSmall, { marginRight: 5, marginLeft: 5 }]}>{Locals.to.toLowerCase()}</Text>
                    <Text style={[styles.fontSmall, { marginRight: 20 }]}>{moment(this.props.request.item.type.created_at).format("hh:mm")}</Text> */}
                            </View>
                            <View style={[styles.row, { padding: 10 }]}>
                                <Text style={styles.label}>{Locals.REQUEST_A_LEAVE_AT + ": "}</Text>
                                <Text style={styles.fontSmall}>{Helpers.convertDateToCurrentTimeZone(this.props.request.item.createdAt.date, this.props.request.item.createdAt.timeZone ? this.props.request.item.createdAt.timeZone : null, 'hh:mm a')}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.subContainer}>
                            <View style={[styles.row, { padding: 10 }]}>
                                <Text style={[styles.fontSmall, { textAlign: 'right' }]}>{Helpers.convertDateToCurrentTimeZone(this.props.request.item.createdAt.date, this.props.request.item.createdAt.timeZone ? this.props.request.item.createdAt.timeZone : null, 'hh:mm a')}</Text>
                                <Text style={[styles.label, { textAlign: 'right' }]}>{Locals.REQUEST_A_LEAVE_AT + ": "}</Text>
                            </View>
                            <View style={[styles.row, { padding: 10 }]}>
                                <Text style={[styles.fontSmall, { textAlign: 'right' }]}>{Helpers.convertDateToCurrentTimeZone(this.props.request.item.createdAt.date, this.props.request.item.createdAt.timeZone ? this.props.request.item.createdAt.timeZone : null, 'DD/MM/YYYY')}</Text>
                                <Text style={[styles.label, { textAlign: 'right' }]}>{Locals.DATE + ": "}</Text>

                                {/* <View style={{ flex: 1 }}></View>
                                    <Text style={styles.label}>{Locals.DATE + ": "}</Text>
                                    <Text style={styles.fontSmall}>{moment(this.props.request.item.type.created_at).format("hh:mm a")}</Text> */}
                                {/* <Text style={[styles.fontSmall, { marginRight: 5, marginLeft: 5 }]}>{Locals.to.toLowerCase()}</Text>
                                    <Text style={[styles.fontSmall, { marginRight: 20 }]}>{moment(this.props.request.item.type.created_at).format("hh:mm")}</Text> */}
                            </View>

                        </View>
                }

                {
                    this.props.request.item.message ?
                        this.props.lang == 'en' ?
                            <View style={[styles.row, { paddingLeft: 10, paddingRight: 10, flexDirection: 'column', alignItems: 'flex-start' }]}>
                                <Text style={styles.label}>{Locals.REQUEST_A_LEAVE_MESSAGE + ": "}</Text>
                                <Text style={styles.fontSmall}>{this.props.request.item.message}</Text>
                            </View>
                            :
                            <View style={[styles.row, { paddingLeft: 10, paddingRight: 10, flexDirection: 'column', alignItems: 'flex-end' }]}>
                                <Text style={[styles.label, { textAlign: 'right' }]}>{Locals.REQUEST_A_LEAVE_MESSAGE + ": "}</Text>
                                <Text style={[styles.fontSmall, { textAlign: 'right' }]}>{this.props.request.item.message}</Text>
                            </View>
                        :
                        null
                }
                {
                    this.renderStatusSection()
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 14,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        overflow: 'hidden',
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    label: {
        fontFamily: Fonts.MAIN_FONT,
        // fontWeight: 'bold',
        color: '#919191',
        fontSize: 14,
    },
    fontSmall: {
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        color: '#acacac'
    }
})

export default ListRow;