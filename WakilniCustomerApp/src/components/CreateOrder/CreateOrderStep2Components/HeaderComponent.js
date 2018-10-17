import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Fonts } from '../../../constants/general';
import { OrderStatus } from '../../../constants/server_states';
import * as ObjectTypes from '../../../constants/object_types';
import Locals from '../../../localization/local';

export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        let arrowImage = this.props.isOpened ? require('../../../images/common/dropDownArrowOpened.png') : this.props.lang == 'en' ? require('../../../images/common/dropDownArrowClosed.png') : require('../../../images/common/dropDownArrowClosedAR.png')

        return (
            <View style={[styles.mainContainerView, this.props.isOpened ? this.props.isFirst ? { marginBottom: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 0 } : { marginBottom: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, marginTop: 20 } : this.props.isFirst ? { marginBottom: 0, marginTop: 0 } : { marginBottom: 0, marginTop: 20 }]}>
                {
                    this.props.lang == 'en' ?
                        <View style={[styles.headerSection, { backgroundColor: this.props.isOpened ? '#00e1c8' : '#ffaf7c' }, this.props.isOpened ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                            <Text numberOfLines={1} style={styles.headerSectionText}>{this.props.item.headerLabel}</Text>
                            {/* <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={arrowImage} /> */}
                        </View>
                        :
                        <View style={[styles.headerSection, { backgroundColor: this.props.isOpened ? '#00e1c8' : '#ffaf7c' }, this.props.isOpened ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                            {/* <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={arrowImage} /> */}
                            <Text numberOfLines={1} style={[styles.headerSectionText, { textAlign: 'right' }]}>{this.props.item.headerLabel}</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainerView: {
        width: '100%',
        justifyContent: 'flex-start',
        borderRadius: 10,
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20
    },
    headerSection: {
        flexDirection: 'row',
        backgroundColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 40,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerSectionText: {
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff',
        fontSize: 15,
        flex: 1,
    }
})