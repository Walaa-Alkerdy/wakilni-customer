import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';

export default class DriversPageSections extends Component {


    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }

        this.getImage = this.getImage.bind(this);
    }

    getImage() {

        // let imageURL = this.props.driver.image ? this.props.driver.image : 
        return require('../../images/drivers/driversPlaceholder.png');
    }

    render() {
        return (
            <View style={styles.cellStyle}>
                {
                    this.props.lang == 'en' ?
                        <View style={styles.containerView}>
                            {/* <View style={styles.imageViewStyle}>
                        <Image style={styles.imageStyle} source={this.getImage()} />
                    </View> */}
                            <Text style={styles.textStyle}>{this.props.driver.name}</Text>
                            <TouchableOpacity style={[styles.buttonStyle, { right: 8 }]} onPress={() => {

                                this.setState({ buttonDisabled: true }, () => {

                                    this.props.sectionPressed()
                                })
                                // enable after 2 second
                                setTimeout(() => {
                                    this.setState({ buttonDisabled: false });
                                }, 2000)
                            }}>
                                <Text style={styles.buttonTextStyle}>{Locals.DRIVER_PAGE_SECTIONS_ASK_BUTTON}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={[styles.containerView, { justifyContent: 'flex-end' }]}>
                            {/* <View style={styles.imageViewStyle}>
                                <Image style={styles.imageStyle} source={this.getImage()} />
                            </View> */}
                            <TouchableOpacity style={[styles.buttonStyle, { left: 8 }]} onPress={() => {

                                this.setState({ buttonDisabled: true }, () => {

                                    this.props.sectionPressed()
                                })
                                // enable after 2 second
                                setTimeout(() => {
                                    this.setState({ buttonDisabled: false });
                                }, 2000)
                            }}>
                                <Text style={styles.buttonTextStyle}>{Locals.DRIVER_PAGE_SECTIONS_ASK_BUTTON}</Text>
                            </TouchableOpacity>
                            <Text style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.driver.name}</Text>
                        </View>
                }

                <View style={[styles.lineViewStyle, { bottom: 0 }]}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cellStyle: {
        flex: 1,
        width: Dimensions.get('screen').width - 50,
        backgroundColor: 'transparent',
        marginBottom: 0,
        borderRadius: 5,
        minHeight: 80,//60
        justifyContent: 'center'
    },
    containerView: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageViewStyle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#b7b7b7',
        shadowColor: '#b7b7b7',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 48,
        width: 48,
        backgroundColor: 'transparent',
        borderRadius: 25,
    },
    textStyle: {
        textAlign: 'center',
        marginLeft: 0,//put 15 when the image is added
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191'
    },
    buttonStyle: {
        backgroundColor: Colors.SUB_COLOR,
        height: 32.5,
        width: 90,
        borderRadius: 8.5,
        shadowColor: Colors.SUB_COLOR,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // alignContent: 'flex-end',
    },
    buttonTextStyle: {
        fontFamily: Fonts.MAIN_FONT,
        textAlign: 'center',
        color: 'white'
    },
    lineViewStyle: {
        height: 1,
        position: 'absolute',
        width: '100%',
        backgroundColor: '#dbdbdb'
    }
})