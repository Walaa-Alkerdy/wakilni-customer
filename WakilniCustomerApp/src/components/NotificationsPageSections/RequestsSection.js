import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import { Loaders } from '../../components'
import Locals from '../../localization/local';
import * as ServerStatus from '../../constants/server_states';

export default class RequestsSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }
        this.isMyMessage = this.isMyMessage.bind(this);
        this.getStatusText = this.getStatusText.bind(this);
        this.getStatusColor = this.getStatusColor.bind(this);
    }

    isMyMessage() {

        if (this.props.user.userInfo.contactId == this.props.notificationRequest.sender.id) {//i am the sender

            return true;
        } else {
            return false;
        }
    }

    getStatusText(statusId) {
        switch (statusId) {
            case ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_ACCEPTED.key:
                return ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_ACCEPTED.label
            case ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key:
                return ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.label
            case ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_REJECTED.key:
                return ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_REJECTED.label
        }
    }

    getStatusColor(statusId) {

        let value = '#000000'

        switch (statusId) {
            case ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_ACCEPTED.key:
                value = '#00e0c8'
                break;
            case ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key:
                value = '#ffae7e'
                break;
            case ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_REJECTED.key:
                value = '#ff8a8a'
                break;
        }

        return value;
    }

    render() {

        if (this.isMyMessage()) {
            return (
                <TouchableOpacity style={styles.cellStyle} disabled={this.state.buttonDisabled} onPress={() => {
                    this.setState({ buttonDisabled: true }, () => {
                        this.props.sectionPressed()
                    })
                    // enable after 2 second
                    setTimeout(() => {
                        this.setState({ buttonDisabled: false });
                    }, 2000)
                }}>

                    {
                        this.props.lang == 'en' ?
                            <View style={styles.cellSection}>
                                <View style={[styles.cellSubSection, { marginRight: 5 }]}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageArrow.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.receiver.name}</Text>
                                </View>
                                <View style={styles.cellSubSection}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageMessage.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.title}</Text>
                                </View>
                                {/* <View style={styles.cellSubSection}>
                            <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageAvatar.png')} />
                            <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.sender.name}</Text>
                        </View> */}
                            </View>
                            :
                            <View style={styles.cellSection}>
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-end' }]}>
                                    <Text numberOfLines={2} style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.notificationRequest.title}</Text>
                                    <Image style={[styles.imageStyle, { marginRight: 0, marginLeft: 8 }]} source={require('../../images/notification/notificationPageMessage.png')} />
                                </View>
                                <View style={[styles.cellSubSection, { marginRight: 5 }]}>
                                    <Text numberOfLines={2} style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.notificationRequest.receiver.name}</Text>
                                    <Image style={[styles.imageStyle, { marginRight: 0, marginLeft: 8 }]} source={require('../../images/notification/notificationPageArrowAR.png')} />
                                </View>
                                {/* <View style={styles.cellSubSection}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageAvatar.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.sender.name}</Text>
                                </View> */}
                            </View>
                    }

                    {
                        this.props.lang == 'en' ?
                            <View style={styles.cellSection}>
                                <View style={[styles.cellSubSection]}>
                                    <Image style={styles.imageStyle} source={require('../../images/task/taskLocation.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.location.personable.name != '' ? this.props.notificationRequest.location.personable.name + ', ' + this.props.notificationRequest.location.areaData.name + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions : this.props.notificationRequest.location.areaData.name + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions}</Text>
                                </View>
                                {/* <View style={styles.cellSubSection}>
                            <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageMessage.png')} />
                            <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.title}</Text>
                        </View> */}
                            </View>
                            :
                            <View style={styles.cellSection}>
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-end' }]}>
                                    <Text numberOfLines={2} style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.notificationRequest.location.personable.name != '' ? this.props.notificationRequest.location.personable.name + ', ' + this.props.notificationRequest.location.areaData.name + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions : this.props.notificationRequest.location.areaData.name + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions}</Text>
                                    <Image style={[styles.imageStyle, { marginRight: 0, marginLeft: 8 }]} source={require('../../images/task/taskLocation.png')} />
                                </View>
                                {/* <View style={styles.cellSubSection}>
                            <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageMessage.png')} />
                            <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.title}</Text>
                        </View> */}
                            </View>
                    }

                    <View style={[styles.cellSection, { justifyContent: 'center', alignItems: 'center', marginBottom: -10 }]}>{/*status view*/}
                        <View style={{ height: 30, paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: this.getStatusColor(this.props.notificationRequest.status), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Text style={{ fontFamily: Fonts.MAIN_FONT, color: 'white', textAlign: 'center', fontSize: 15 }}>{this.getStatusText(this.props.notificationRequest.status)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={[styles.cellStyle, { paddingBottom: 10 }]} disabled={this.state.buttonDisabled} onPress={() => {
                    this.setState({ buttonDisabled: true }, () => {
                        this.props.sectionPressed()
                    })
                    // enable after 2 second
                    setTimeout(() => {
                        this.setState({ buttonDisabled: false });
                    }, 2000)
                }}>

                    {
                        this.props.lang == 'en' ?
                            <View style={styles.cellSection}>
                                {/* <View style={[styles.cellSubSection, { marginRight: 5 }]}>
                            <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageArrow.png')} />
                            <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.receiver.name}</Text>
                        </View> */}
                                <View style={styles.cellSubSection}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageAvatar.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.sender.name}</Text>
                                </View>

                                <View style={styles.cellSubSection}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageMessage.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.title}</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.cellSection}>
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-end' }]}>
                                    <Text numberOfLines={2} style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.notificationRequest.title}</Text>
                                    <Image style={[styles.imageStyle, { marginRight: 0, marginLeft: 8 }]} source={require('../../images/notification/notificationPageMessage.png')} />
                                </View>
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-end' }]}>
                                    <Text numberOfLines={2} style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.notificationRequest.sender.name}</Text>
                                    <Image style={[styles.imageStyle, { marginRight: 0, marginLeft: 8 }]} source={require('../../images/notification/notificationPageAvatar.png')} />
                                </View>
                                {/* <View style={[styles.cellSubSection, { marginRight: 5 }]}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageArrow.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.receiver.name}</Text>
                                </View> */}
                            </View>
                    }

                    {
                        this.props.lang == 'en' ?
                            <View style={styles.cellSection}>
                                <View style={[styles.cellSubSection]}>
                                    <Image style={styles.imageStyle} source={require('../../images/task/taskLocation.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.location.personable.name != '' ? this.props.notificationRequest.location.personable.name + ', ' + this.props.notificationRequest.location.areaData.name + ', ' + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions : this.props.notificationRequest.location.areaData.name + ', ' + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions}</Text>
                                </View>
                                {/* <View style={styles.cellSubSection}>
                            <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageMessage.png')} />
                            <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.title}</Text>
                        </View> */}
                            </View>
                            :
                            <View style={styles.cellSection}>
                                {/* <View style={styles.cellSubSection}>
                                    <Image style={styles.imageStyle} source={require('../../images/notification/notificationPageMessage.png')} />
                                    <Text numberOfLines={2} style={styles.textStyle}>{this.props.notificationRequest.title}</Text>
                                </View> */}
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-end' }]}>
                                    <Text numberOfLines={2} style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.notificationRequest.location.personable.name != '' ? this.props.notificationRequest.location.personable.name + ', ' + this.props.notificationRequest.location.areaData.name + ', ' + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions : this.props.notificationRequest.location.areaData.name + ', ' + this.props.notificationRequest.location.building + this.props.notificationRequest.location.directions}</Text>
                                    <Image style={[styles.imageStyle, { marginRight: 0, marginLeft: 8 }]} source={require('../../images/task/taskLocation.png')} />
                                </View>
                            </View>
                    }

                    {
                        this.props.lang == 'en' ?
                            <View style={[styles.cellSection, { height: null, marginBottom: 5, marginTop: 10 }]}>
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-start', alignItems: 'flex-start', height: null }]}>
                                    {
                                        this.props.notificationRequest.image != null ?
                                            <View style={{ flex: 1, aspectRatio: 1, marginRight: 5 }}>
                                                <Image
                                                    style={{ aspectRatio: 1, borderRadius: 10, borderWidth: 2, borderColor: '#919191', width: '100%' }}
                                                    source={{ uri: this.props.notificationRequest.image }}
                                                    onLoadStart={() => this.setState({ imageIsLoading: true })}
                                                    onLoadEnd={() => this.setState({ imageIsLoading: false })}
                                                />
                                                {
                                                    this.state.imageIsLoading ? <Loaders.Loader /> : null
                                                }
                                            </View>
                                            :
                                            null
                                    }

                                    {
                                        this.props.notificationRequest.message != null ?
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>{this.props.notificationRequest.message}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                </View>
                            </View>
                            :
                            <View style={[styles.cellSection, { height: null, marginBottom: 5, marginTop: 10 }]}>
                                <View style={[styles.cellSubSection, { justifyContent: 'flex-end', alignItems: 'flex-start', height: null }]}>
                                    {
                                        this.props.notificationRequest.message != null ?
                                            <View style={{ flex: 1, justifyContent: 'flex-end', marginRight: 5 }}>
                                                <Text style={[styles.textStyle, { textAlign: 'right', width: '100%' }]}>{this.props.notificationRequest.message}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                    {
                                        this.props.notificationRequest.image != null ?
                                            <View style={{ flex: 1, aspectRatio: 1 }}>
                                                <Image
                                                    style={{ aspectRatio: 1, borderRadius: 10, borderWidth: 2, borderColor: '#919191', width: '100%' }}
                                                    source={{ uri: this.props.notificationRequest.image }}
                                                    onLoadStart={() => this.setState({ imageIsLoading: true })}
                                                    onLoadEnd={() => this.setState({ imageIsLoading: false })}
                                                />
                                                {
                                                    this.state.imageIsLoading ? <Loaders.Loader isImageLoader={true} /> : null
                                                }
                                            </View>
                                            :
                                            null
                                    }


                                </View>
                            </View>
                    }

                    {
                        this.props.notificationRequest.status == ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key ?
                            this.renderButtons()
                            :
                            <View style={[styles.cellSection, { justifyContent: 'center', alignItems: 'center', marginBottom: -20 }]}>{/*status view*/}
                                <View style={{ height: 30, paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: this.getStatusColor(this.props.notificationRequest.status), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <Text style={{ fontFamily: Fonts.MAIN_FONT, color: 'white', textAlign: 'center', fontSize: 15 }}>{this.getStatusText(this.props.notificationRequest.status)}</Text>
                                </View>
                            </View>
                    }

                </TouchableOpacity>
            )
        }
    }

    renderButtons() {

        return (
            <View style={{ width: '100%', height: 50 }}>
                {
                    // message type driver help 45
                    // message type reply to driver 53
                    this.props.notificationRequest.type.id == 45 ?
                        (
                            <View style={styles.buttonsInnerSection}>
                                <TouchableOpacity style={styles.innerButtons} disabled={this.state.buttonDisabled} onPress={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.props.discardPressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }}>
                                    <Text style={styles.buttonText}>{Locals.NOTIFICATION_DETAILS_PAGE_CANNOT_HELP_BUTTON}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.innerButtons} disabled={this.state.buttonDisabled} onPress={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.props.sendPressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }}>
                                    <Text style={styles.buttonText}>{Locals.NOTIFICATION_DETAILS_PAGE_SUBMIT_BUTTON}</Text>
                                </TouchableOpacity>
                            </View>
                        ) :
                        (
                            <View style={styles.buttonsInnerSection}>
                                <TouchableOpacity style={styles.innerButtons} disabled={this.state.buttonDisabled} onPress={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.props.notUseFulPressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }}>
                                    <Text style={styles.buttonText}>{Locals.NOTIFICATION_DETAILS_PAGE_WAS_NOT_USEFUL_BUTTON}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.innerButtons} disabled={this.state.buttonDisabled} onPress={() => {
                                    this.setState({ buttonDisabled: true }, () => {
                                        this.props.useFulPressed()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }}>
                                    <Text style={styles.buttonText}>{Locals.NOTIFICATION_DETAILS_PAGE_WAS_USEFUL_BUTTON}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cellStyle: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        minHeight: 40,
        justifyContent: 'center',
        marginBottom: 15
    },
    cellSection: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    cellSubSection: {
        margin: 0,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'green',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textStyle: {
        width: '90%',
        fontFamily: Fonts.SUB_FONT,
        color: '#919191',
        fontSize: 12,
        fontWeight: 'normal'
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 16.5,
        width: 16.5,
        marginRight: 8,
    },
    buttonsInnerSection: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerButtons: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.SUB_COLOR
    },
    buttonText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 12,
        color: Colors.SUB_COLOR
    },
})