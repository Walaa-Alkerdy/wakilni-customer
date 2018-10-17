import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts } from '../../constants/general';

export default class MyStatusBar extends Component {

    render() {
        return (
            <StatusBar translucent backgroundColor={Colors.STATUS_BAR_COLOR} barStyle='light-content' />
        )
    }
}

const styles = StyleSheet.create({
})