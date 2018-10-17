import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Fonts, Colors } from '../../constants/general';
import Locals from '../../localization/local';
import * as ServerStatus from '../../constants/server_states';
import * as ObjectTypes from '../../constants/object_types';
import moment from 'moment';

export default class PackagesPageTemp extends Component {

    constructor(props) {

        super(props);

        this.state = {
            buttonDisabled: false,
            packagesData: [],
        }

        this.preparePackagesData = this.preparePackagesData.bind(this);
    }

    componentDidMount() {

        this.preparePackagesData(this.props.task)
    }

    preparePackagesData(task) {

        let tempPackagesJSON = JSON.parse(task.deliverPackageJSON)

        let finalArrayToDisplay = []
        if (this.props.constantsList) {
            tempPackagesJSON.forEach((item) => {
                this.props.constantsList.packageTypes.forEach((item2) => {

                    if (item2.id == item[0]) {

                        finalArrayToDisplay.push({
                            id: item2.id,
                            name: item2.label,
                            count: item[1]
                        })
                    }
                })
            })
        }

        this.setState({ packagesData: finalArrayToDisplay })
    }

    render() {

        return (
            <TouchableOpacity
                style={[styles.mainContainer, { borderBottomWidth: this.props.totalCount > 1 ? this.props.isLast ? 0 : 1 : 0 }]}
                disabled={this.state.buttonDisabled} onPress={() => {
                    this.setState({ buttonDisabled: true }, () => {
                        this.props.sectionPressed()
                    })
                    // enable after 2 second
                    setTimeout(() => {
                        this.setState({ buttonDisabled: false });
                    }, 2000)
                }}>
                {
                    this.props.language == 'en' ?
                        <View style={styles.topSection}>

                            <View style={styles.imageTopSection}>
                                <Image style={[styles.imageCSS, { marginRight: 8 }]} source={require('../../images/task/taskOrderNumber.png')} />
                                <Text style={styles.imageTopSectionTextCSS}>{this.props.task.order.id}</Text>
                            </View>
                            <View style={styles.listingSection}>
                                <FlatList
                                    style={{ width: '100%' }}
                                    numColumns={2}
                                    bounces={false}
                                    data={this.state.packagesData}
                                    keyExtractor={item => JSON.stringify(item.id)}//key for each cell most probably will use the id
                                    renderItem={({ item }) =>
                                        <View style={{ flexDirection: 'row', width: '50%', height: 30, alignItems: 'center' }}>
                                            <Text style={{ fontFamily: Fonts.MAIN_FONT, color: '#919191', fontSize: 12, marginRight: 3 }}>{item.name + ":"}</Text>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#acacac', fontSize: 12 }}>{item.count}</Text>
                                        </View>
                                    }
                                />
                            </View>
                            <View style={styles.arrowSection}>
                                <Image style={styles.imageCSS} source={require('../../images/common/dropDownArrowClosedGray.png')} />
                            </View>
                        </View>
                        :
                        <View style={styles.topSection}>

                            <View style={[styles.arrowSection, { alignItems: 'flex-start' }]}>
                                <Image style={styles.imageCSS} source={require('../../images/common/dropDownArrowClosedGrayAR.png')} />
                            </View>
                            <View style={styles.listingSection}>
                                <FlatList
                                    style={{ width: '100%' }}
                                    numColumns={2}
                                    bounces={false}
                                    data={this.state.packagesData}
                                    keyExtractor={item => JSON.stringify(item.id)}//key for each cell most probably will use the id
                                    renderItem={({ item }) =>
                                        <View style={{ flexDirection: 'row', width: '50%', height: 30, alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#919191', fontSize: 12, textAlign: 'right' }}>{item.count}</Text>
                                            <Text style={{ fontFamily: Fonts.MAIN_FONT, color: '#919191', fontSize: 12, marginRight: 3, textAlign: 'right' }}>{':' + item.name}</Text>
                                        </View>
                                    }
                                />
                            </View>
                            <View style={[styles.imageTopSection, { justifyContent: 'flex-end' }]}>
                                <Text style={[styles.imageTopSectionTextCSS, { textAlign: 'right' }]}>{this.props.task.order.id}</Text>
                                <Image style={[styles.imageCSS, { marginLeft: 8 }]} source={require('../../images/task/taskOrderNumber.png')} />
                            </View>
                        </View>
                }
                {/* <View style={{ backgroundColor: '#dbdbdb', height: 1, width: '100%', overflow: 'hidden', marginBottom: 10 }}>
                </View> */}

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#acacac',
    },
    topSection: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        padding: 10,
    },
    imageTopSection: {
        flexDirection: 'row',
        width: '15%',
        marginTop: 7
    },
    imageCSS: {
        resizeMode: 'contain',
        height: 16.5,
        width: 16.5,
    },
    imageTopSectionTextCSS: {
        fontFamily: Fonts.SUB_FONT,
        color: '#acacac',
        fontSize: 12,
        width: '95%'
    },
    listingSection: {
        width: '80%',
        justifyContent: 'center'
    },
    arrowSection: {
        width: '5%',
        alignItems: 'flex-end',
        marginTop: 8
    }
})