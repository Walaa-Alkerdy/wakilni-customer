import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, TextInput, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import Locals from '../../localization/local';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as validators from '../../utils/validators/userInfoValidators';
import MapView, { Marker } from 'react-native-maps';
import { Pickers, Buttons } from '../../components';

export const SelectionType = {
    Personal: 0,
    Other: 1
}

export default class LocationPrompt extends Component {

    state = {
        mustShow: false,
        marginBottom: 1,
        animatedValue: new Animated.Value(0),
        personName: this.props.personName,
        selectionCallback: this.props.onCreatePress
    }

    dimissAlert = () => {
        this.setState({
            animatedValue: new Animated.Value(0),
            mustShow: false
        })
    }

    show = () => {
        this.setState({ mustShow: true }, () => {
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
        })
    };

    renderSelectionButton = (label, type) => {
        return (
            <TouchableOpacity style={[{ backgroundColor: Colors.SUB_COLOR, borderRadius: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 40, marginBottom: 15, width: Dimensions.get('screen').width - 90, borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                this.dimissAlert()
                this.state.selectionCallback(type)
            }}>
                <Text style={{
                    fontFamily: Fonts.SUB_FONT,
                    color: '#ffffff'
                }}>{label}</Text>
            </TouchableOpacity>
        )
    }

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
                    <Animated.View
                        style={[styles.animatedContainer, actionStyle]}
                        ref={SBAlert => this._SBAlert = SBAlert}
                    >
                        <Text style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 16
                        }}>{Locals.MESSAGE_ADD_ADDRESS}</Text>
                        {
                            this.renderSelectionButton(Locals.CREATE_NEW_PERSONAL_ADDRESS.replace("%NAME%", this.state.personName), SelectionType.Personal)
                        }
                        <View style={{ width: 1, height: 1, marginTop: 8 }}></View>
                        {
                            this.renderSelectionButton(Locals.CREATE_NEW_RECEIVER_ADDRESS, SelectionType.Other)
                        }
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
        alignItems: 'center',
        alignContent: 'center',
    },
    animatedContainer: {
        borderRadius: 10,
        padding: 16,
        width: '95%',
        marginBottom: 100,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: Colors.SUB_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        // width: Dimensions.get('screen').width - 90,
        height: 45,
        marginVertical: 5,
        borderRadius: 11,
        shadowColor: Colors.SUB_COLOR,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 1,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff',
        textAlign: 'center',
        marginHorizontal: 10,
    },
});