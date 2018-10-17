import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../constants/general';

export default class MainPageSections extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }
    render() {

        return (
            <TouchableOpacity style={this.props.isFirst ? [styles.subSubSection, { borderTopWidth: 0.5 }] : this.props.isLast ? [styles.subSubSection, { borderBottomWidth: 0.5 }] : styles.subSubSection} disabled={this.state.buttonDisabled} onPress={() => {
                this.setState({ buttonDisabled: true }, () => {
                    this.props.sectionPressed()
                })
                // enable after 2 second
                setTimeout(() => {
                    this.setState({ buttonDisabled: false });
                }, 2000)
            }}>
                {
                    this.props.language == 'ar' ?
                        <View style={styles.subSubView}>
                            <Text style={[styles.textStyle, { textAlign: 'right' }]}>{this.props.label}</Text>
                            <Image style={styles.imageStyle} source={this.props.url} />
                        </View>
                        :
                        <View style={styles.subSubView}>
                            <Image style={styles.imageStyle} source={this.props.url} />
                            <Text style={[styles.textStyle, { textAlign: 'left' }]}>{this.props.label}</Text>
                        </View>
                }

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    subSubSection: {//image and text
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '50%',
        height: (Platform.OS === "ios" ? (Dimensions.get('screen').height / 4 - 45) : (Dimensions.get('screen').height / 4 - 55)),
        // aspectRation: 1.5,
        borderTopWidth: 0.25,
        borderLeftWidth: 0.25,
        borderRightWidth: 0.25,
        borderBottomWidth: 0.25,
        borderColor: '#626262',
    },
    subSubView: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: '30%',
        height: '30%',
        resizeMode: 'contain'
    },
    textStyle: {
        marginLeft: 5,
        marginRight: 5,
        width: '40%',
        color: Colors.TEXT_COLOR,
        fontFamily: Fonts.MAIN_FONT,
        fontSize: Dimensions.get('screen').width / 30
    }
})