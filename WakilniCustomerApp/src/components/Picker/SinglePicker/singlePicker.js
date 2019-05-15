import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    PickerIOS,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Modal,
    Dimensions
} from "react-native";

import PickerAndroid, { PickerItemAndroid } from './androidPicker';
import langs from './lang';
import { Fonts, Colors } from "../../../constants/general";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let _Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let _PickerItem = Platform.OS === 'ios' ? _Picker.Item : PickerItemAndroid;

export default class SinglePicker extends Component {
    constructor(props) {
        super(props);
        this.lang = langs[this.props.lang];

        this.state = {
            options: this.props.options,
            modalVisible: false,
            selectedOption: this.props.options.filter((op) => op.key === this.props.defaultSelectedValue)[0] || {},
            areaText: ''
        }
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            options: newProps.options,
            modalVisible: false,
            selectedOption: newProps.options.filter((op) => op.key === newProps.defaultSelectedValue)[0] || {},
            areaText: ''
        })
    }

    static propTypes = {
        options: PropTypes.array.isRequired,
        defaultSelectedValue: PropTypes.any,
        onConfirm: PropTypes.func,
        onSelect: PropTypes.func,
        onCancel: PropTypes.func,
        lang: PropTypes.string,
        style: PropTypes.any,
        buttonCancelStyle: PropTypes.any,
        buttonAcceptStyle: PropTypes.any,
        headerStyle: PropTypes.any,
    }

    static defaultProps = {
        lang: "zh-CN",
        style: { backgroundColor: "white" },
        onConfirm: () => {
        },
        onSelect: () => {
        },
        onCancel: () => {
        },
        setOption: () => {
        },
    }

    show() {
        this.setState(Object.assign({}, this.state, { modalVisible: true }));
    }

    hide() {
        this.setState({ modalVisible: false });
    }

    setOption(options, defaultSelectedValue) {
        this.setState(Object.assign({}, this.state, {
            options: options,
            selectedOption: options.filter((op) => op.key === defaultSelectedValue)[0] || {}
        }))
    }

    render() {

        // console.log(this.state.options)
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => { }}
                visible={this.state.modalVisible}>
                <View style={styles.basicContainer}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0.3)', flex: 1, width: SCREEN_WIDTH }}
                        onPress={() => {
                            this.props.onCancel && this.props.onCancel();
                            this.setState({ modalVisible: false });
                        }}
                    >
                    </TouchableOpacity>
                    <View style={[styles.modalContainer, this.props.style]}>
                        <View style={{ backgroundColor: '#CACACA', height: 0.5, width: SCREEN_WIDTH }} />
                        <View style={[styles.buttonView, this.props.headerStyle]}>
                            <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={() => {
                                this.props.onCancel && this.props.onCancel();
                                this.setState({ modalVisible: false });
                            }}>
                                <Text style={[styles.buttonLeft, this.props.buttonCancelStyle]}>{this.lang.BTN_CANCEL}</Text>
                            </TouchableOpacity>
                            {
                                this.props.canFilter ?
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, Platform.OS == 'ios' ? {} : { paddingBottom: 2 }]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={'enter area'}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.areaText}
                                        onChangeText={areaText => {
                                            this.setState({ areaText: areaText });
                                        }} />
                                    :
                                    null
                            }

                            <TouchableOpacity style={[styles.button, styles.buttonRight]} onPress={() => {
                                if (this.props.onConfirm) {
                                    if (!this.state.selectedOption.key && this.state.selectedOption.key !== 0) {
                                        let submitData = this.state.options[0] || {};
                                        if (!submitData && this.state.defaultSelectedValue) {
                                            submitData = this.state.options.filter((op) => op.key === this.state.defaultSelectedValue)[0];
                                        }
                                        this.props.onConfirm(submitData);
                                    } else {
                                        this.props.onConfirm(this.state.selectedOption);
                                    }
                                }
                                this.setState({ modalVisible: false });
                            }}>
                                <Text style={[styles.buttonRight, this.props.buttonAcceptStyle]}>{this.lang.BTN_CONFIRM}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#CACACA', height: 0.5, width: SCREEN_WIDTH }} />
                        <View style={[styles.mainBox, this.props.canFilter ? { height: 200 } : {}]}>
                            {
                                this.props.canFilter ?
                                    this.state.areaText != '' && this.state.areaText.length > 2 ?
                                        <_Picker
                                            ref={'picker'}
                                            style={styles.bottomPicker}
                                            selectedValue={(this.state.selectedOption.key || this.state.selectedOption === 0) ? this.state.selectedOption.key : this.state.defaultSelectedValue}
                                            onValueChange={val => {
                                                let curOption = this.state.options.filter((op) => op.key === val)[0];
                                                this.props.onSelect(curOption);
                                                this.setState(
                                                    Object.assign({}, this.state, { selectedOption: curOption }));
                                            }}>
                                            {
                                                this.state.options.filter((option) => { return option.value.toLowerCase().includes(this.state.areaText.toLowerCase()) }).length > 0 ?
                                                    this.state.options.filter((option) => { return option.value.toLowerCase().includes(this.state.areaText.toLowerCase()) }).map((option, i) => {
                                                        return (
                                                            <_PickerItem
                                                                key={i}
                                                                value={option.key}
                                                                label={option.value}
                                                            />
                                                        )
                                                    })
                                                    :
                                                    this.state.options.filter((option) => { return option.value.toLowerCase().includes('other') }).map((option, i) => {
                                                        return (
                                                            <_PickerItem
                                                                key={i}
                                                                value={option.key}
                                                                label={option.value}
                                                            />
                                                        )
                                                    })
                                            }
                                        </_Picker>
                                        :
                                        null
                                    :
                                    <_Picker
                                        ref={'picker'}
                                        style={styles.bottomPicker}
                                        selectedValue={(this.state.selectedOption.key || this.state.selectedOption === 0) ? this.state.selectedOption.key : this.state.defaultSelectedValue}
                                        onValueChange={val => {
                                            let curOption = this.state.options.filter((op) => op.key === val)[0];
                                            this.props.onSelect(curOption);
                                            this.setState(
                                                Object.assign({}, this.state, { selectedOption: curOption }));
                                        }}>
                                        {this.state.options.map((option, i) => {
                                            return (
                                                <_PickerItem
                                                    key={i}
                                                    value={option.key}
                                                    label={option.value}
                                                />
                                            )
                                        })}
                                    </_Picker>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    basicContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalContainer: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    buttonView: {
        height: 50,
        width: SCREEN_WIDTH,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomPicker: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 3 * 1,
        backgroundColor: '#ffffff'
    },
    mainBox: {},
    button: {
        flex: 0.5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLeft: {
        justifyContent: 'flex-start',
        paddingTop: 2,
        paddingLeft: 10,
        fontFamily: Fonts.MAIN_FONT,
        color: Colors.MAIN_COLOR
    },
    buttonRight: {
        justifyContent: 'flex-end',
        paddingTop: 2,
        paddingRight: 10,
        fontFamily: Fonts.MAIN_FONT,
        color: Colors.SUB_COLOR
    },
    inputFields: {
        color: '#a1a1a1',
        textAlign: 'center',
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        backgroundColor: '#ffffff',
        flex: 1,
        height: 28,
        marginHorizontal: 3,
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#a1a1a1',
    },
})
