import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as ServerStatus from '../../constants/server_states';
import * as ObjectTypes from '../../constants/object_types';
import moment from 'moment';

export default class PackagesPageSections2 extends Component {

    constructor(props) {

        super(props);

        this.state = {
            buttonDisabled: false,
        }
    }

    render() {

        return (
            <TouchableOpacity
                style={{ width: (Dimensions.get('screen').width / 100) * 95, flex: 1, flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}
                disabled={this.state.buttonDisabled} onPress={() => {
                    this.setState({ buttonDisabled: true }, () => {
                        this.props.sectionPressed()
                    })
                    // enable after 2 second
                    setTimeout(() => {
                        this.setState({ buttonDisabled: false });
                    }, 2000)
                }}>
                <Text>Child</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
})