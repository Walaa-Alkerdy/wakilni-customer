import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image } from 'react-native';

const badgePaddingPosition = Platform.OS === 'ios' ? -2 : 0

export default class BadgeButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false
        }
    }
    render() {
        return (
            <TouchableOpacity disabled={this.state.buttonDisabled} onPress={() => {

                this.setState({ buttonDisabled: true }, () => {

                    this.props.buttonPressed()
                })
                // enable after 2 second
                setTimeout(() => {
                    this.setState({ buttonDisabled: false });
                }, 2000)
            }}>
                <View style={styles.shadowButtonView}>
                    <Image style={{ width: '60%', height: '63%', resizeMode: 'stretch' }} source={this.props.url} />

                    {
                        this.props.badgeCount > 0 && (

                            <View style={[styles.subView, this.checkPosition(this.props.position)]}>
                                <Text style={styles.textStyle}>{this.props.badgeCount}</Text>
                            </View>
                        )
                    }
                </View>
            </TouchableOpacity>
        )
    }

    checkPosition(position) {

        switch (position) {
            case 'topLeft':
                return { left: 1, top: badgePaddingPosition }
            case 'topRight':
                return { right: 1, top: badgePaddingPosition }
            case 'bottomLeft':
                return { left: 1, bottom: badgePaddingPosition }
            case 'bottomRight':
                return { right: 1, bottom: badgePaddingPosition }
            default:
                return { left: 1, top: badgePaddingPosition }
        }
    }
}

const styles = StyleSheet.create({
    shadowButtonView: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subView: {
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#ff5050',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: '#ffffff',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'openSansBold',
        fontSize: 11
    }
})