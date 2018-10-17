import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Fonts } from '../../constants/general';

export default class RoundCornerButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={this.props.isDisabled ? 1 : 0.5} style={[styles.button, this.props.buttonStyle]} onPress={() => {

                this.setState({ buttonDisabled: true }, () => {

                    this.props.sectionPressed()
                })
                // enable after 2 second
                setTimeout(() => {
                    this.setState({ buttonDisabled: false });
                }, 2000)
            }}>
                <View style={[styles.buttonView, this.props.isDisabled ? { opacity: 0.5 } : {}]}>
                    <Text style={[styles.textView, this.props.textStyle]}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: '45%',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 10
    },
    buttonView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView: {
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        color: 'white',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 11.5
    }
})