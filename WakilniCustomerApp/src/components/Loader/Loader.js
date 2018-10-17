import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import Locals from '../../localization/local';
import { Colors } from '../../constants/general';

export default class Loader extends Component {


    getStyle(props) {

        if (props.isRefreshControl) {
            return styles.refreshControlStyle
        } else if (props.isImageLoader) {
            return styles.imageLoaderStyle
        } else {
            return styles.pageLoaderStyle
        }
    }

    render() {

        let style = this.getStyle(this.props)

        return (
            <View style={style}>
                <SkypeIndicator color={Colors.SUB_COLOR} />
                {/* <ActivityIndicator animating={true} style={{ position: 'absolute' }} color={Colors.SUB_COLOR} size='small'></ActivityIndicator> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageLoaderStyle: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#000000',
        opacity: 0.7,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1
    },
    refreshControlStyle: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#000000',
        opacity: 0.7,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1
    },
    imageLoaderStyle: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 1000,
        elevation: 1
    }
})