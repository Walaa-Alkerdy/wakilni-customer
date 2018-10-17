import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Fonts, Colors } from '../../constants/general';

export default class NoResultsPage extends Component {

    render() {
        return (
            <View style={this.props.customStyle ? this.props.customStyle : styles.mainContainerCSS}>
                <Text style={styles.messageCSS}>{this.props.messageToShow}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainerCSS: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
    },
    messageCSS: {
        textAlign: 'center',
        fontFamily: Fonts.MAIN_FONT,
        color: Colors.MAIN_COLOR
    }
})