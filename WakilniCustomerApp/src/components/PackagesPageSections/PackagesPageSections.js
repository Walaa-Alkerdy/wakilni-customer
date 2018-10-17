import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as ServerStatus from '../../constants/server_states';
import * as ObjectTypes from '../../constants/object_types';
import moment from 'moment';

export default class PackagesPageSections extends Component {

    constructor(props) {

        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.topSection}>
                    <View style={styles.imageTopSection}>
                        <Image style={[styles.imageCSS, { marginRight: 8 }]} source={require('../../images/task/taskOrderNumber.png')} />
                        <Text style={styles.imageTopSectionTextCSS}>{this.props.task.order.id}</Text>
                    </View>
                    <View style={styles.listingSection}>
                    </View>
                    <View style={styles.arrowSection}>
                        <Image style={styles.imageCSS} source={require('../../images/common/dropDownArrowClosedGray.png')} />
                    </View>
                </View>
                <View style={{ backgroundColor: '#dbdbdb', height: 1, width: '100%' }}>
                </View>
                <View style={styles.bottomSection}>
                    <Text style={styles.bottomSectionLabel1}>Number of pending tasks:</Text>
                    <Text style={styles.bottomSectionLabel2}>2</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#acacac'
    },
    topSection: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        padding: 10,
    },
    imageTopSection: {
        flexDirection: 'row',
        width: '15%',
    },
    imageCSS: {
        resizeMode: 'contain',
        height: 16.5,
        width: 16.5,
    },
    imageTopSectionTextCSS: {
        fontFamily: Fonts.SUB_FONT,
        color: '#919191',
        fontSize: 12,
        width: '95%'
    },
    listingSection: {
        width: '70%',
    },
    arrowSection: {
        width: '15%',
        alignItems: 'flex-end'
    },
    bottomSection: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 30
    },
    bottomSectionLabel1: {
        color: '#ffad7d',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 12,
        marginRight: 5,
        marginLeft: 10
    },
    bottomSectionLabel2: {
        color: '#a8a8a8',
        fontFamily: Fonts.SUB_FONT,
        fontSize: 12,
    }
})