import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, TextInput, Text, TouchableOpacity, View, Animated, Easing, ScrollView, PermissionsAndroid } from 'react-native';
import Locals from '../../localization/local';
import { Fonts, Colors } from '../../constants/general';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as validators from '../../utils/validators/userInfoValidators';
import MapView, { Marker } from 'react-native-maps';
import { Pickers, Buttons, RadioButton } from '../../components';

var moment = require('moment')

export default class NewReceiverPopUp extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        selectedCoordinates: null,
        typesList: [],
        areaList: [],
        selectedArea: null,
        selectedType: null,
        radioButtonIndex: 0,

        //text fields
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        secondaryPhoneNumber: '',
        building: '',
        floor: '',
        directions: '',
        selectedDOB: null,
        note: '',
        allowDriverContact: true,

        selectedReceiverIndex: 0,
    }

    dimissAlert = () => {
        this.setState({
            animatedValue: new Animated.Value(0),
        })
    }

    show = (typesList, areaList, index) => {

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
                value: area.name
            })
        })

        this.setState(
            {
                selectedArea: null,
                selectedType: null,
                mustShow: true,
                typesList: tempTypes,
                areaList: tempAreas,
                selectedReceiverIndex: index
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
                            ref={scroll => this.scrollView = scroll}
                            // resetScrollToCoords={{ x: 0, y: 0 }}
                            style={{ width: '100%' }}
                            contentContainerStyle={{ flexGrow: 1 }}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='always'>

                            <View style={[styles.mainInnerContainer, { justifyContent: 'space-between', alignContent: 'center', overflow: 'hidden' }]}>
                                <View style={[styles.mainInnerContainer, { justifyContent: 'flex-start', backgroundColor: 'transparent', marginBottom: 30, marginTop: 30 }]}>

                                    <MapView
                                        style={{ height: 200, width: Dimensions.get('screen').width - 90, marginBottom: 15, paddingTop: this.state.marginBottom }}
                                        initialRegion={{
                                            latitude: 33.8938,
                                            longitude: 35.5018,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        showsUserLocation={true}
                                        showsMyLocationButton={true}
                                        followsUserLocation={true}
                                        onUserLocationChange={(e) => {
                                            this.setState({ selectedCoordinates: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } })
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

                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.firstNameError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_RECEIVER_FIRST_NAME}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.firstName}
                                        onChangeText={firstName => {
                                            this.setState({ firstName: firstName });
                                        }} />
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.lastNameError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_RECEIVER_LAST_NAME}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.lastName}
                                        onChangeText={lastName => {
                                            this.setState({ lastName: lastName });
                                        }} />
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.phoneNumberError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_RECEIVER_PHONE_NUMBER}
                                        keyboardType={'numeric'}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.phoneNumber}
                                        onChangeText={phoneNumber => {
                                            if (phoneNumber.trim().length == 0) {
                                                this.setState({ phoneNumber: '+' });
                                            } else {
                                                if (phoneNumber.includes('+')) {
                                                    this.setState({ phoneNumber: `${phoneNumber}` })
                                                } else {
                                                    this.setState({ phoneNumber: `+${phoneNumber}` })
                                                }
                                            }
                                            // this.setState({ phoneNumber: phoneNumber });
                                        }} />
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.secondaryPhoneNumberError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_RECEIVER_SECONDARY_PHONE_NUMBER}
                                        keyboardType={'numeric'}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.secondaryPhoneNumber}
                                        onChangeText={secondaryPhoneNumber => {
                                            if (secondaryPhoneNumber.trim().length == 0) {
                                                this.setState({ secondaryPhoneNumber: '+' });
                                            } else {
                                                if (secondaryPhoneNumber.includes('+')) {
                                                    this.setState({ secondaryPhoneNumber: `${secondaryPhoneNumber}` })
                                                } else {
                                                    this.setState({ secondaryPhoneNumber: `+${secondaryPhoneNumber}` })
                                                }
                                            }
                                        }} />
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.emailError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_RECEIVER_EMAIL}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.email}
                                        onChangeText={email => {
                                            this.setState({ email: email });
                                        }} />

                                    {/* gender */}
                                    <View style={styles.radioButtonMainView}>
                                        <View style={styles.radioButtonView}>
                                            <RadioButton
                                                textStyle={{ color: '#919191' }}
                                                outerViewStyle={{ borderColor: '#919191' }}
                                                // animation={'bounceIn'}
                                                label={Locals.GENDER_MALE}
                                                language={'en'}
                                                isSelected={this.state.radioButtonIndex == 0}
                                                onPress={() => { this.setState({ radioButtonIndex: 0 }) }}
                                            />
                                        </View>
                                        <View style={styles.radioButtonView}>
                                            <RadioButton
                                                textStyle={{ color: '#919191' }}
                                                outerViewStyle={{ borderColor: '#919191' }}
                                                // animation={'bounceIn'}
                                                label={Locals.GENDER_FEMALE}
                                                language={'en'}
                                                isSelected={this.state.radioButtonIndex == 1}
                                                onPress={() => { this.setState({ radioButtonIndex: 1 }) }}
                                            />
                                        </View>
                                    </View>

                                    <TouchableOpacity style={[{ width: Dimensions.get('screen').width - 90, backgroundColor: '#ffffff', borderRadius: 5, justifyContent: 'center', height: 40, marginBottom: 15 }, this.state.dobError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
                                        this.setState({ isDatePickerVisible: true })
                                    }}>
                                        <Text style={{ fontFamily: Fonts.SUB_FONT, color: '#a1a1a1', textAlign: 'center' }}>{this.state.selectedDOB ? moment(this.state.selectedDOB).format('YYYY-MM-DD') : Locals.CREATE_RECEIVER_DOB}</Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, }}>
                                        <TouchableOpacity activeOpacity={this.state.typesList.length > 0 ? 0.5 : 1} style={[{ backgroundColor: this.state.typesList.length > 0 ? Colors.SUB_COLOR : '#c4c4c4', borderRadius: 5, justifyContent: 'center', alignItems: 'center', height: 40, marginBottom: 15, flex: 2, marginRight: 15 }, this.state.typeError ? { borderColor: Colors.BADGE_COLOR, borderWidth: 1 } : { borderColor: 'transparent', borderWidth: 1 }]} onPress={() => {
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
                                    <TextInput
                                        selectionColor='#919191'
                                        style={[styles.inputFields, this.state.noteError ? styles.inputFieldsError : null]}
                                        underlineColorAndroid={'transparent'}
                                        placeholder={Locals.CREATE_RECEIVER_NOTE}
                                        // placeholder={Locals.EMAIL_PLACEHOLDER}
                                        // placeholderTextColor={Colors.TEXT_COLOR}
                                        // placeholderStyle={styles.inputFieldsPlaceholder}
                                        autoCapitalize='none'
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        value={this.state.note}
                                        onChangeText={note => {
                                            this.setState({ note: note });
                                        }} />

                                    <View style={[styles.radioButtonView, { alignSelf: 'flex-start', width: '100%' }]}>
                                        <RadioButton
                                            textStyle={{ color: '#919191' }}
                                            outerViewStyle={{ borderColor: '#919191' }}
                                            // animation={'bounceIn'}
                                            label={Locals.CREATE_RECEIVER_ALLOW_DRIVER_CONTACT}
                                            language={'en'}
                                            isSelected={this.state.allowDriverContact == true}
                                            onPress={() => { this.setState({ allowDriverContact: !this.state.allowDriverContact }) }}
                                        />
                                    </View>
                                </View>

                                {/* buttons here */}
                                <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width - 90, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

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

                    <DateTimePicker
                        date={this.state.selectedDOB ? this.state.selectedDOB : new Date()}
                        onDateChange={(date) => {
                            this.setState({ selectedDOB: date })
                        }}
                        titleIOS={'Choose Date'}
                        neverDisableConfirmIOS={true}
                        is24Hour={false}
                        isVisible={this.state.isDatePickerVisible}
                        onConfirm={(date) => {
                            this.setState({ isDatePickerVisible: false, selectedDOB: date })
                        }}
                        onCancel={() => {
                            this.setState({ isDatePickerVisible: false })
                        }}
                    />

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
                </View >
            );
        } else {
            return null
        }
    }

    isInputValid() {

        var typeValid = true, areaValid = true, pinValid = true, buildingValid = true, floorValid = true, directionsValid = true, firstNameValid = true, lastNameValid = true, phoneNumberValid = true, secondaryPhoneNumberValid = true, emailValid = true, dobValid = true, noteValid = true, allowDrivercontactValid = true;

        // if (!this.state.selectedCoordinates) {
        //     pinValid = false
        // }

        if (!this.state.selectedType) {
            typeValid = false
        }

        if (!this.state.selectedArea) {
            areaValid = false
        }

        // if (!this.state.selectedDOB) {
        //     dobValid = false
        // }

        if (validators.isEmpty(this.state.firstName)) {
            firstNameValid = false
        }

        // if (!validators.isEmpty(this.state.email)) {
        //     if (!validators.isEmailValid(this.state.email)) {
        //         emailValid = false
        //     }
        // } else {
        //     emailValid = false
        // }

        if (!validators.isEmpty(this.state.phoneNumber)) {

            if (!validators.isPhoneValid(this.state.phoneNumber)) {
                phoneNumberValid = false
            }
        } else {
            phoneNumberValid = false
        }

        if (!validators.isEmpty(this.state.secondaryPhoneNumber)) {
            if (!validators.isPhoneValid(this.state.secondaryPhoneNumber)) {
                secondaryPhoneNumberValid = false
            }
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
            directionsError: !directionsValid,
            firstNameError: !firstNameValid,
            lastNameError: !lastNameValid,
            phoneNumberError: !phoneNumberValid,
            secondaryPhoneNumberError: !secondaryPhoneNumberValid,
            emailError: !emailValid,
            dobError: !dobValid,
            noteError: !noteValid,
            allowDriverContactError: !allowDrivercontactValid
        })

        return (pinValid && typeValid && areaValid && buildingValid && floorValid && directionsValid && firstNameValid && lastNameValid && phoneNumberValid && secondaryPhoneNumberValid && emailValid && dobValid && noteValid && allowDrivercontactValid)

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
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                secondaryPhoneNumber: this.state.secondaryPhoneNumber,
                gender: this.state.radioButtonIndex,
                email: this.state.email,
                dob: this.state.selectedDOB ? moment(this.state.selectedDOB).format('YYYY-MM-DD') : null,
                note: this.state.note,
                allowDriverContact: this.state.allowDriverContact
            }

            this.setState({ mustShow: false }, () => { })
            this.props.onCreatePress(values, this.state.selectedReceiverIndex)
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
        marginBottom: 64,
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
    radioButtonMainView: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    radioButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
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