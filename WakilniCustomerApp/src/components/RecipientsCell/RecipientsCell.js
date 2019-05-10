import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../constants/general';
import Locals from '../../localization/local';

export default class RecipientsCell extends Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.dataContainer}>
                    <Text numberOfLines={2} style={styles.titleText}>{Locals.RECIPIENT_NAME}</Text>
                    <Text numberOfLines={2} style={styles.normalText}>{this.props.recipient.name}</Text>
                    {
                        this.props.recipient.address ?
                            [
                                <Text numberOfLines={2} style={styles.titleText}>{Locals.RECIPIENT_ADDRESS}</Text>,
                                <Text numberOfLines={2} style={styles.normalText}>{this.props.recipient.address}</Text>
                            ] :
                            null
                    }
                    {
                        this.props.recipient.phoneNumber ?
                            [
                                <Text numberOfLines={2} style={[styles.titleText]}>{Locals.RECIPIENT_PHONENUMBER}</Text>,
                                <Text numberOfLines={2} style={[styles.normalText, { color: Colors.SUB_COLOR }]}>{this.props.recipient.secondaryNumber ? `${this.props.recipient.phoneNumber} - ${this.props.recipient.secondaryNumber}` : this.props.recipient.phoneNumber}</Text>
                            ] :
                            null
                    }
                    <Text numberOfLines={2} style={[styles.titleText]}>{Locals.RECIPIENT_ALLOW_DRIVER_CONTACT}</Text>
                    <Text numberOfLines={2} style={[styles.normalText, { color: this.props.recipient.allowDriverContact ? 'green' : Colors.BADGE_COLOR }]}>{this.props.recipient.allowDriverContact ? 'Yes' : 'No'}</Text>

                    {
                        this.props.recipient.note ?
                            [
                                <Text numberOfLines={2} style={styles.titleText}>{Locals.RECIPIENT_NOTE}</Text>,
                                <Text numberOfLines={10} style={styles.normalText}>{this.props.recipient.note}</Text>
                            ] :
                            null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 5,
        // overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#919191',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        marginBottom: 20,
    },
    dataContainer: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    titleText: {
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
        textAlign: 'left',
    },
    normalText: {
        fontFamily: Fonts.SUB_FONT,
        color: '#acacac',
        textAlign: 'left',
        marginBottom: 5,
    }
})