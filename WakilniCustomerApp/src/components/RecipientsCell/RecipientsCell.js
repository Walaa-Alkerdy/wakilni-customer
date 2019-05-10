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
                    <View style={styles.dataContainerSub}>
                        <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start' }]}>
                            <Text numberOfLines={2} style={styles.titleText}>{Locals.CASH_ACCOUNT_PAGE_ORDER_NUMBER}</Text>
                            {/* <Text numberOfLines={2} style={styles.normalText}>{this.props.task.order.id}</Text> */}
                        </View>
                        <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start', width: '45%' }]}>
                            <Text numberOfLines={2} style={[styles.titleText, { width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_TYPE}</Text>
                            {/* <Text numberOfLines={2} style={[styles.normalText, { width: '45%' }]}>{this.getStatusText(this.props.task.collections[0].typeID)}</Text> */}
                        </View>
                    </View>
                    <View style={styles.dataContainerSub}>
                        <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start' }]}>
                            <Text numberOfLines={2} style={styles.titleText}>{Locals.CASH_ACCOUNT_PAGE_CLIENT}</Text>
                            {/* <Text numberOfLines={2} style={styles.normalText}>{this.props.task.customer.name}</Text> */}
                            {/* <Text numberOfLines={2} style={styles.normalText}>{this.props.task.customer.name}</Text> */}
                        </View>
                        <View style={[styles.dataContainerSubSub, { justifyContent: 'flex-start', width: '45%' }]}>
                            <Text numberOfLines={2} style={[styles.titleText, { width: '55%' }]}>{Locals.CASH_ACCOUNT_PAGE_SEQUENCE}</Text>
                            {/* <Text numberOfLines={2} style={[styles.normalText, { width: '45%' }]}>{this.props.task.sequence}</Text> */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        overflow: 'hidden',
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
    dataContainerSub: {
        height: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dataContainerSubSub: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '50%',
        flexDirection: 'row'
    },
    titleText: {
        width: '40%',
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
        textAlign: 'left'
    },
    normalText: {
        width: '55%',
        fontFamily: Fonts.SUB_FONT,
        color: '#acacac',
        textAlign: 'right'
    }
})