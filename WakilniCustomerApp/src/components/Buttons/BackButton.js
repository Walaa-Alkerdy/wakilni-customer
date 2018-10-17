import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../../constants/general';

export default class BackButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }
    render() {
        return (
            <TouchableOpacity
                style={[{ marginRight: 10, height: 50, width: 50, justifyContent: 'center' }]}
                onPress={() => {

                    this.setState({ buttonDisabled: true }, () => {

                        this.props.buttonPressed()
                    })
                    // enable after 2 second
                    setTimeout(() => {
                        this.setState({ buttonDisabled: false });
                    }, 2000)
                }}>
                <Image source={this.props.language == 'en' ? require('../../images/common/backButton.png') : require('../../images/common/backButtonAR.png')} style={{ resizeMode: 'contain', height: 22, width: 22, marginTop: 5 }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

})