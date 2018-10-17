import React, { Component } from "react";
import { Platform, StatusBar, AppRegistry, Modal, Animated, Easing, StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native";
import { Fonts, Colors } from "../../constants/general";

export default class NotificationPopUp extends Component {

    state = {
        // value: "",
        isError: false,
        messageToShow: '',
        mustShow: false,
        opacity: new Animated.Value(0),
        offset: new Animated.Value(0),
    };

    showNotification = (message, isError) => {
        this.setState(
            {
                // value: "",
                // notification: this.state.value,
                isError: isError,
                messageToShow: message,
                mustShow: true,
            },
            () => {
                this._notification.getNode().measure((x, y, width, height, pageX, pageY) => {
                    this.state.offset.setValue(height * -1);

                    Animated.sequence([

                        Animated.parallel([
                            Animated.timing(this.state.opacity, {
                                toValue: 1,
                                duration: 300,
                            }),
                            Animated.timing(this.state.offset, {
                                toValue: 0,
                                duration: 300,
                            }),
                        ]),

                        Animated.delay(5000),

                        Animated.parallel([
                            Animated.timing(this.state.opacity, {
                                toValue: 0,
                                duration: 300,
                            }),
                            Animated.timing(this.state.offset, {
                                toValue: height * -1,
                                duration: 300,
                            }),
                        ]),

                    ]).start(this.props.onClose ? () => {
                        this.props.onClose
                        this.setState({ mustShow: false })
                    } : () => {
                        this.setState({ mustShow: false })
                    });
                });
            }
        );
    };

    render() {

        if (this.state.mustShow) {

            const notificationStyle = {
                opacity: this.state.opacity,
                transform: [
                    {
                        translateY: this.state.offset,
                    },
                ],
            };

            return (
                <Modal style={{ height: 90 }} animationType='fade' transparent={true} visible={this.state.mustShow} onRequestClose={() => { }}>

                    <TouchableOpacity activeOpacity={1} style={{ flex: 1, width: '100%' }} onPress={() => {

                        if (this.props.onClose) {
                            this.props.onClose()
                            this.setState({ mustShow: false })
                        } else {
                            this.setState({ mustShow: false })
                        }
                    }}>
                        <Animated.View
                            style={[styles.notification, notificationStyle]}
                            ref={notification => this._notification = notification}
                        >
                            <Text style={this.state.isError ? styles.notificationErrorText : styles.notificationSuccessText}>
                                {this.state.messageToShow}
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                </Modal>
            );

        } else {

            return (
                null
            )
        }

    }
}

const styles = StyleSheet.create({
    notification: {
        // flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        height: (Platform.OS === "ios") ? 90 : (50 + StatusBar.currentHeight)
    },
    notificationErrorText: {
        textAlign: 'center',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 15,
        padding: 5,
        color: Colors.BADGE_COLOR,
    },
    notificationSuccessText: {
        textAlign: 'center',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 15,
        padding: 5,
        color: Colors.SUB_COLOR,
    },
});