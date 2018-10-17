import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../constants/general';

export default class RadioButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }
    render() {
        
        return (
            <TouchableOpacity disabled={this.state.buttonDisabled} onPress={() => {
                // this.setState({ buttonDisabled: true }, () => {
                    this.props.onPress()
                // })
                // // enable after 2 second
                // setTimeout(() => {
                //     this.setState({ buttonDisabled: false });
                // }, 2000)
            }}>
                {
                    this.props.language == 'ar' ?
                        <View style={[{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, this.props.containerStyle]}>
                            <Text style={[styles.radioButtonText, this.props.textStyle]}>{this.props.label}</Text>
                            <View style={[styles.outerView, this.props.outerViewStyle]}>
                                <View style={this.props.isSelected == false ? styles.innerView : [styles.innerView, { backgroundColor: Colors.SUB_COLOR }]}>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={[{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, this.props.containerStyle]}>

                            <View style={[styles.outerView, this.props.outerViewStyle]}>
                                <View style={this.props.isSelected == false ? styles.innerView : [styles.innerView, { backgroundColor: Colors.SUB_COLOR }]}>
                                </View>
                            </View>
                            <Text style={[styles.radioButtonText, this.props.textStyle]}>{this.props.label}</Text>
                        </View>
                }

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    outerView: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView: {
        height: 10,
        width: 10,
        backgroundColor: 'transparent'
    },
    radioButtonText: {
        margin: 5,
        fontFamily: Fonts.MAIN_FONT,
        color: Colors.TEXT_COLOR
    }
})