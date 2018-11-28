import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, TextInput, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import Locals from '../../localization/local';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as validators from '../../utils/validators/userInfoValidators';
import MapView, { Marker } from 'react-native-maps';
import { Pickers, Buttons } from '../../components';

export default class NewLocationPopUp extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        selectedCoordinates: null,
        typesList: [],
        areaList: [],
        selectedArea: null,
        selectedType: null,
    }

    dimissAlert = () => {
        this.setState({
            animatedValue: new Animated.Value(0),
        })
    }

    show = (typesList, areaList) => {

        let tempTypes = []
        let tempAreas = []

        typesList.forEach((type) => {

            tempTypes.push({
                key: type.id,
                value: type.label
            })
        })

        areaList.forEach((area) => {

            tempAreas.push({
                key: area.id,
                value: area.name,
                // text: area.name
            })
        })

        this.setState(
            {
                selectedArea: null,
                selectedType: null,
                mustShow: true,
                typesList: tempTypes,
                areaList: tempAreas
            },
            () => {

                Animated.sequence([

                    Animated.parallel([
                        Animated.spring(this.state.animatedValue, {
                            toValue: 0.5,
                        }),
                        Animated.spring(this.state.animatedValue, {
                            toValue: 1,
                            friction: 3,
                            tension: 40
                        }),

                    ]),

                ]).start();
            }
        );
    };

    componentWillReceiveProps(newProps) {

        let tempTypes = []
        let tempAreas = []

        newProps.typesList.forEach((type) => {

            tempTypes.push({
                key: type.id,
                value: type.label
            })
        })

        newProps.areasList.forEach((area) => {

            tempAreas.push({
                key: area.id,
                value: area.name
            })
        })

        this.setState({
            typesList: tempTypes,
            areaList: tempAreas
        })

    }

    render() {

        if (this.state.mustShow) {
            const actionStyle = {
                transform: [
                    {
                        scale: this.state.animatedValue,
                    },
                ],
            };

            return (
                <View style={styles.container}>
                    {/* <View style={styles.alertHeader}>
                    <Text style={styles.alertHeaderTitle}>{Locals.ALERT_TITLE.toUpperCase()}</Text>
                </View> */}
                    <Animated.View
                        style={[styles.animatedContainer, actionStyle]}
                        ref={SBAlert => this._SBAlert = SBAlert}
                    >

                        <KeyboardAwareScrollView
                            // resetScrollToCoords={{ x: 0, y: 0 }}
                            style={{ width: '100%' }}
                            contentContainerStyle={{ flexGrow: 1 }}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='always'>

                            <View style={[styles.mainInnerContainer, { justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>
                                <View style={[styles.mainInnerContainer, { justifyContent: 'flex-start', backgroundColor: 'transparent', marginBottom: 30, marginTop: 30 }]}>

                                    <MapView
                                        style={{ height: 200, width: Dimensions.get('screen').width - 90, marginBottom: 15 }}
                                        initialRegion={{
                                            latitude: 33.8938,
                                            longitude: 35.5018,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        onPress={(e) => {
                                            this.setState({ selectedCoordinates: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } })
                                        }}
                                    >

                                        {
                                            this.state.selectedCoordinates ?
                                                <Marker
                                                    coordinate={this.state.selectedCoordinates}
                                                    title={'Current Pin'}
                                                    description={''}
                                                />
                                                :
                                                null
                                        }

                                    </MapView>

                                    <TouchableOpacity activeOpacity={this.state.selectedCoordinates ? 0.5 : 1} style={[{ backgroundColor: this.state.selectedCoordinates ? Colors.SUB_COLOR : '#c4c4c4', borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 40, marginBottom: 15, width: Dimensions.get('screen').width - 90 }, this.state.pinError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                        // must clear current coordinates
                                        this.setState({ selectedCoordinates: null })
                                    }}>
                                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.selectedCoordinates ? '#ffffff' : '#f0f0f0' }}>{this.state.selectedCoordinates ? Locals.CREATE_ORDER_PIN_LOCATION_ENABLED : Locals.CREATE_ORDER_PIN_LOCATION_DISABLED}</Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, }}>
                                        <TouchableOpacity activeOpacity={this.state.typesList.length > 0 ? 0.5 : 1} style={[{ backgroundColor: this.state.typesList.length > 0 ? Colors.SUB_COLOR : '#c4c4c4', borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 40, marginBottom: 15, flex: 2, marginRight: 15, }, this.state.typeError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                            // must single picker for location types
                                            if (this.state.typesList.length > 0) {
                                                this.singlePicker1.show()
                                            }
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.typesList.length > 0 ? '#ffffff' : '#f0f0f0' }}>{this.state.selectedType ? this.state.selectedType.value : Locals.CREATE_ORDER_CHOOSE_LOCATION_TYPE}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={this.state.areaList.length > 0 ? 0.5 : 1} style={[{ backgroundColor: this.state.areaList.length > 0 ? Colors.SUB_COLOR : '#c4c4c4', borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 40, marginBottom: 15, flex: 2 }, this.state.areaError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                            // must single picker for areas
                                            if (this.state.areaList.length > 0) {
                                                this.singlePicker2.show()
                                            }
                                        }}>
                                            <Text style={{ fontFamily: Fonts.SUB_FONT, color: this.state.areaList.length > 0 ? '#ffffff' : '#f0f0f0' }}>{this.state.selectedArea ? this.state.selectedArea.value : this.state.areaList.length > 0 ? Locals.CREATE_ORDER_CHOOSE_AREA : 'Please Wait...'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.buildingError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_ORDER_BUILDING}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.building}
                                        onChangeText={building => {
                                            this.setState({ building: building });
                                        }} />
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.floorError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_ORDER_FLOOR}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.floor}
                                        onChangeText={floor => {
                                            this.setState({ floor: floor });
                                        }} />
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.directionsError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_ORDER_DIRECTIONS}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.directions}
                                        onChangeText={directions => {
                                            this.setState({ directions: directions });
                                        }} />
                                </View>

                                {/* buttons here */}
                                <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

                                    <Buttons.RoundCornerButton
                                        buttonStyle={[styles.button, { width: null, flex: 1, shadowColor: '#919191', backgroundColor: '#919191', borderWidth: 0 }]}
                                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                        label={Locals.CREATE_ORDER_CANCEL_BUTTON}
                                        sectionPressed={() => {
                                            // must cancel and dismiss alert
                                            // this.dimissAlert()
                                            this.setState({ mustShow: false })
                                        }}
                                    />

                                    <Buttons.RoundCornerButton
                                        buttonStyle={[styles.button, { width: null, flex: 1, borderWidth: 0, backgroundColor: '#f3be0c', marginLeft: 8 }]}
                                        textStyle={{ color: '#ffffff', fontFamily: Fonts.MAIN_FONT, fontSize: 15 }}
                                        label={Locals.CREATE_ORDER_CREATE_BUTTON}
                                        sectionPressed={() => {
                                            this.createPressed()
                                        }}
                                    />
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </Animated.View>

                    <Pickers.SinglePicker
                        style={{ backgroundColor: 'white' }}
                        lang="en-US"
                        ref={ref => this.singlePicker1 = ref}
                        // defaultSelectedValue={}
                        onConfirm={(option) => {
                            this.setState({ selectedType: option })
                        }}
                        onSelect={(value) => {
                            // console.log(value)
                            // this.setState({ selected: option.value })
                        }}
                        options={this.state.typesList}
                    // buttonCancelStyle={{ paddingLeft: 10, fontFamily: Fonts.MAIN_FONT }}
                    // buttonAcceptStyle={{ paddingRight: 10, fontFamily: Fonts.MAIN_FONT }}
                    >
                    </Pickers.SinglePicker>

                    <Pickers.SinglePicker
                        style={{ backgroundColor: 'white' }}
                        lang="en-US"
                        ref={ref => this.singlePicker2 = ref}
                        canFilter={true}
                        // defaultSelectedValue={}
                        onConfirm={(option) => {
                            this.setState({ selectedArea: option })
                        }}
                        onSelect={(value) => {
                            // console.log(value)
                            // this.setState({ selected: option.value })
                        }}
                        options={this.state.areaList}
                    // buttonCancelStyle={{ paddingLeft: 10, fontFamily: Fonts.MAIN_FONT }}
                    // buttonAcceptStyle={{ paddingRight: 10, fontFamily: Fonts.MAIN_FONT }}
                    >
                    </Pickers.SinglePicker>
                </View>
            );
        } else {
            return null
        }
    }

    isInputValid() {

        var typeValid = true, areaValid = true, pinValid = true, buildingValid = true, floorValid = true, directionsValid = true

        if (!this.state.selectedCoordinates) {
            pinValid = false
        }

        if (!this.state.selectedType) {
            typeValid = false
        }

        if (!this.state.selectedArea) {
            areaValid = false
        }

        // if (validators.isEmpty(this.state.building)) {
        //     buildingValid = false
        // }


        // if (validators.isEmpty(this.state.floor)) {
        //     floorValid = false
        // }


        // if (validators.isEmpty(this.state.directions)) {
        //     directionsValid = false
        // }


        this.setState({
            pinError: !pinValid,
            typeError: !typeValid,
            areaError: !areaValid,
            buildingError: !buildingValid,
            floorError: !floorValid,
            directionsError: !directionsValid
        })

        return (pinValid && typeValid && areaValid && buildingValid && floorValid && directionsValid)

    }

    createPressed() {

        if (this.isInputValid()) {

            let values = {
                selectedCoordinates: this.state.selectedCoordinates,
                selectedType: this.state.selectedType,
                selectedArea: this.state.selectedArea,
                building: this.state.building,
                floor: this.state.floor,
                directions: this.state.directions,
            }

            this.setState({ mustShow: false }, () => { })
            this.props.onCreatePress(values)
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedContainer: {
        height: '95%',
        width: '95%',
        backgroundColor: 'white',
    },
    mainInnerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    inputFields: {
        color: '#a1a1a1',
        textAlign: 'center',
        fontFamily: Fonts.SUB_FONT,
        fontSize: 13,
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width - 90,
        borderRadius: 5,
        // paddingLeft: 15,
        paddingVertical: 0,
        marginBottom: 15,
        height: 40,
    },
    inputFieldsError: {
        borderColor: Colors.BADGE_COLOR,
        borderWidth: 1
    },
    button: {
        backgroundColor: Colors.SUB_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        // width: Dimensions.get('screen').width - 90,
        height: 45,
        marginVertical: 5,
        borderRadius: 11,
        shadowColor: Colors.SUB_COLOR,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 1,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: Fonts.MAIN_FONT,
        color: '#ffffff',
        textAlign: 'center',
        marginHorizontal: 10,
    },
});