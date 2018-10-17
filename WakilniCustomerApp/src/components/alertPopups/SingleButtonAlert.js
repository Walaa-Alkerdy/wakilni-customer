import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import Locals from '../../localization/local';
import { Fonts } from '../../constants/general';

export default class SingleButtonAlert extends Component {

    state = {
        buttonDisabled: false,
        // value: "",
        isError: false,
        messageToShow: '',
        mustShow: false,
        animatedValue: new Animated.Value(0),
    }

    dimissAlert = () => {
        this.setState({
            buttonDisabled: false,
            // value: "",
            isError: false,
            messageToShow: '',
            mustShow: false,
            animatedValue: new Animated.Value(0),
        })
    }

    showAlert = (message, isError) => {
        this.setState(
            {
                // value: "",
                // notification: this.state.value,
                isError: isError,
                messageToShow: message,
                mustShow: true,
            },
            () => {

                Animated.sequence([

                    Animated.parallel([
                        Animated.spring(this.state.animatedValue, {
                            toValue: 0.5,
                        }),
                        Animated.spring(this.state.animatedValue, {
                            toValue: 1,
                            friction: 3,
                            tension: 40
                        }),

                    ]),

                ]).start();
            }
        );
    };

    render() {
        if (this.state.mustShow) {
            const actionStyle = {
                transform: [
                    {
                        scale: this.state.animatedValue,
                    },
                ],
            };

            return (
                <View style={styles.container}>
                    {/* <View style={styles.alertHeader}>
                    <Text style={styles.alertHeaderTitle}>{Locals.ALERT_TITLE.toUpperCase()}</Text>
                </View> */}
                    <Animated.View
                        style={[styles.innerContainer, actionStyle]}
                        ref={SBAlert => this._SBAlert = SBAlert}
                    >

                        {/* <View style={styles.alertMessageView}> */}
                        <Text style={styles.alertMessage} numberOfLines={3}>{this.state.messageToShow}</Text>
                        {/* </View> */}

                        <View style={styles.buttonsView}>
                            <TouchableOpacity style={styles.alertButtonOk} >
                                <Text style={styles.alertButtonText} disabled={this.state.buttonDisabled} onPress={() => {

                                    this.setState({ buttonDisabled: true }, () => {
                                        this.dimissAlert()
                                        this.props.dismissAlert()
                                    })
                                    // enable after 2 second
                                    setTimeout(() => {
                                        this.setState({ buttonDisabled: false });
                                    }, 2000)
                                }}>
                                    {Locals.ALERT_OK}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            );
        } else {
            return null
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertHeader: {
        height: 30,
        backgroundColor: 'transparent',
        margin: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
        // borderRadius:15
    },
    alertHeaderTitle: {
        margin: 5,
        textAlign: 'center',
        color: '#f3be0c',
        fontFamily: Fonts.MAIN_FONT,
        // fontWeight: 'bold',
        fontSize: 17
    },
    innerContainer: {
        width: '92%',
        minHeight: 100,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertMessage: {
        textAlign: 'center',
        color: '#888888',
        fontFamily: Fonts.SUB_FONT,
        overflow: 'hidden',
        marginBottom: 20
    },
    // alertMessageView: {
    //     justifyContent: 'center',
    // },
    alertButtonOk: {
        borderColor: '#f3be0c',
        justifyContent: 'center',
        marginLeft: 10,
        borderWidth: 1,
        height: 40,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 8,
        flex: 1
    },
    alertButtonCancel: {
        borderColor: '#888888',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 8,
        flex: 1
    },
    alertButtonText: {
        color: '#f3be0c',
        textAlign: 'center',
        fontFamily: Fonts.MAIN_FONT,
        fontWeight: 'bold',
        height: '100%',
        paddingTop: 9,
    },
    alertButtonCancelText: {
        color: '#888888',
        fontFamily: Fonts.MAIN_FONT,
        textAlign: 'center',
        height: '100%',
        paddingTop: 9,
    },
    buttonsView: {
        flexDirection: 'row',
        // backgroundColor:'black',
        height: 50,
        width: 200,
        alignSelf: 'center'
    }
});