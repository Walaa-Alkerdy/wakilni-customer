import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Locals from '../../localization/local';
import { Colors, Fonts } from '../../constants/general';

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.getPercentage = this.getPercentage.bind(this);
    }

    getPercentage(currentTime, totalTime) {

        if (currentTime == 0) {

            return '0%'
        } else {

            if (Number.isFinite(Math.floor(100 - ((currentTime / totalTime) * 100)))) {

                return `${Math.floor(100 - ((currentTime / totalTime) * 100))}%`

            } else {

                return '0%'
            }
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={[styles.fillContainer, { width: this.getPercentage(this.props.currentTime, this.props.totalTime) }]}>
                    <View style={styles.circularView}>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#acacac',
        height: 2.5,
        width: '65%',
        // marginRight: 10,
        flexDirection: 'row',
        marginLeft: 10
    },
    fillContainer: {
        backgroundColor: Colors.SUB_COLOR,
        height: 2.5,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    circularView: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: Colors.SUB_COLOR,
        shadowColor: Colors.SUB_COLOR,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
    }
})