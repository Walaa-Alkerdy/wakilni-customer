import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View, Text, TextInput, Image } from 'react-native';
import Locals from '../../localization/local';
import { Fonts } from '../../constants/general';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {

            searchValue: ''
        }
    }

    render() {

        if (this.props.lang == 'ar') {

            return (
                <View style={styles.mainContainerCSS}>
                    <Image source={require('../../images/common/searchIcon.png')} style={[styles.imageCSS, { left: 20 }]} />
                    <TextInput
                        selectionColor='#b7b7b7'
                        style={Platform.OS === 'ios' ? [styles.textInputCSS, { paddingLeft: 25, paddingRight: 10, textAlign: 'right' }] : [styles.textInputCSS, { paddingVertical: 0, paddingLeft: 25, paddingRight: 10, textAlign: 'right' }]}
                        placeholder={Locals.SEARCH_PLACEHOLDER}
                        placeholderTextColor="#919191"
                        autoCorrect={false}
                        returnKeyType='search'
                        underlineColorAndroid={'transparent'}
                        onSubmitEditing={() => this.props.searchPressed(this.state.searchValue)}
                        value={this.state.searchValue}
                        onChangeText={searchValue => {
                            this.setState({ searchValue: searchValue });
                            this.props.searchPressed(searchValue);
                        }} />
                </View>
            )

        } else {
            return (
                <View style={styles.mainContainerCSS}>
                    <TextInput
                        selectionColor='#b7b7b7'
                        style={Platform.OS === 'ios' ? [styles.textInputCSS, { paddingLeft: 10, paddingRight: 25, textAlign: 'left' }] : [styles.textInputCSS, { paddingVertical: 0, paddingLeft: 10, paddingRight: 25, textAlign: 'left' }]}
                        placeholder={Locals.SEARCH_PLACEHOLDER}
                        placeholderTextColor="#919191"
                        autoCorrect={false}
                        returnKeyType='search'
                        underlineColorAndroid={'transparent'}
                        onSubmitEditing={() => this.props.searchPressed(this.state.searchValue)}
                        value={this.state.searchValue}
                        onChangeText={searchValue => {
                            this.setState({ searchValue: searchValue });
                            this.props.searchPressed(searchValue);
                        }} />
                    <Image source={require('../../images/common/searchIcon.png')} style={[styles.imageCSS, { right: 20 }]} />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainContainerCSS: {
        width: '100%',
        flexDirection: 'row',
        height: 45,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    textInputCSS: {
        color: '#919191',
        fontFamily: Fonts.MAIN_FONT,
        fontSize: 15,
        borderWidth: 2,
        borderColor: '#b7b7b7',
        backgroundColor: 'transparent',
        borderRadius: 8,
        height: '100%',
        width: '95%'
    },
    imageCSS: {
        resizeMode: 'contain',
        height: 18,
        width: 18,
        position: 'absolute',
    }
})