import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';

export default class ContactRecipientPageSections extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.cellStyle} onPress={() => {

                this.setState({ buttonDisabled: true }, () => {

                    this.props.sectionPressed()
                })
                // enable after 2 second
                setTimeout(() => {
                    this.setState({ buttonDisabled: false });
                }, 2000)
            }}>

                {
                    this.props.lang == 'en' ?
                        <View style={styles.containerView}>
                            <Text style={styles.textStyle}>{this.props.receiverMessage.title}</Text>
                            <View style={[styles.buttonStyle, { right: 8 }]} >
                                <Image style={{ width: 16, height: 16, resizeMode: 'contain' }} source={require('../../images/contactRecipient/contactRecipientIcon.png')} />
                            </View>
                        </View>
                        :
                        <View style={[styles.containerView, { justifyContent: 'flex-end' }]}>
                            <View style={[styles.buttonStyle, { left: 8 }]} >
                                <Image style={{ width: 16, height: 16, resizeMode: 'contain' }} source={require('../../images/contactRecipient/contactRecipientIcon.png')} />
                            </View>
                            <Text style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.receiverMessage.title}</Text>
                        </View>
                }

                <View style={[styles.lineViewStyle, { bottom: 0 }]}>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cellStyle: {
        flex: 1,
        width: Dimensions.get('screen').width - 50,
        backgroundColor: 'transparent',
        marginBottom: 10,
        borderRadius: 5,
        minHeight: 50,
        justifyContent: 'center',
    },
    containerView: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        marginLeft: 0,//put 15 when the image is added
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191'
    },
    buttonStyle: {
        // backgroundColor: Colors.SUB_COLOR,
        backgroundColor: '#7ad06d',
        height: 32.5,
        width: 32.5,
        borderRadius: 16.25,
        // shadowColor: Colors.SUB_COLOR,
        shadowColor: '#7ad06d',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // alignContent: 'flex-end',
    },
    lineViewStyle: {
        height: 1,
        position: 'absolute',
        width: '100%',
        backgroundColor: '#dbdbdb'
    }
})