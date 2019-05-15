import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Fonts } from '../../constants/general';

export default class HomeButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }

        // console.log(this.props)
    }
    render() {
        return (
            <TouchableOpacity
                style={[{ marginRight: 10, height: 50, width: 50, justifyContent: 'center' }]}
                onPress={() => {
                    this.props.buttonPressed()
                }}
            >
                <Image source={require('../../images/common/home.png')} style={{ resizeMode: 'contain', height: 22, width: 22 }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
})