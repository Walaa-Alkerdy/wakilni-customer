import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, PermissionsAndroid } from 'react-native';
import Locals from '../../localization/local';
import { Fonts } from '../../constants/general';
import * as helpers from '../../utils/helpers/generalHelpers';
// import Sound from 'react-native-sound';
// import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { ProgressBar } from '../../components'

export default class VoiceNote extends Component {

    constructor(props) {
        super(props);

        // console.log(props);
        this.state = {
            // currentTime: 0,
            // totalTime: 0,
            // recordingExists: (props.recordingExists != null) ? props.recordingExists : false,
            // recording: false,
            // paused: false,
            // stoppedRecording: false,
            // pausedPlaying: false,
            // playing: false,
            // finished: false,
            // audioPath: (props.audioPath != null) ? props.audioPath : AudioUtils.DocumentDirectoryPath + '/voiceNote.aac',
            // soundPlayer: null,
            // hasPermission: undefined,
            // canDeleteRecord: (props.canDeleteRecord != null) ? props.canDeleteRecord : true
        }
    }

    // prepareRecordingPath(audioPath) {
    //     AudioRecorder.prepareRecordingAtPath(audioPath, {
    //         SampleRate: 22050,
    //         Channels: 1,
    //         AudioQuality: "Low",
    //         AudioEncoding: "aac",
    //         AudioEncodingBitRate: 32000
    //     });
    // }

    componentDidMount() {
        // this._checkPermission().then((hasPermission) => {
        //     this.setState({ hasPermission });

        //     if (!hasPermission) return;

        //     this.prepareRecordingPath(this.state.audioPath);

        //     AudioRecorder.onProgress = (data) => {
        //         this.setState({ currentTime: Math.floor(data.currentTime) });
        //     };

        //     AudioRecorder.onFinished = (data) => {
        //         // Android callback comes in the form of a promise instead.
        //         if (Platform.OS === 'ios') {
        //             this._finishRecording(data.status === "OK", data.audioFileURL);
        //         }
        //     };
        // });
    }

    // _checkPermission() {
    //     if (Platform.OS !== 'android') {
    //         return Promise.resolve(true);
    //     }

    //     const rationale = {
    //         'title': 'Microphone Permission',
    //         'message': 'This app requires access to your microphone to be able to send voice notes from one user to another.'
    //     };

    //     return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
    //         .then((result) => {
    //             console.log('Permission result:', result);
    //             return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
    //         });
    // }

    // async _pause() {
    //     if (!this.state.recording) {
    //         console.warn('Can\'t pause, not recording!');
    //         return;
    //     }

    //     try {
    //         const filePath = await AudioRecorder.pauseRecording();
    //         this.setState({ paused: true });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async _resume() {
    //     if (!this.state.paused) {
    //         console.warn('Can\'t resume, not paused!');
    //         return;
    //     }

    //     try {
    //         await AudioRecorder.resumeRecording();
    //         this.setState({ paused: false });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async _stop() {
    //     if (!this.state.recording) {
    //         console.warn('Can\'t stop, not recording!');
    //         return;
    //     }

    //     this.setState({ stoppedRecording: true, recording: false, paused: false });

    //     try {
    //         const filePath = await AudioRecorder.stopRecording();

    //         if (Platform.OS === 'android') {
    //             this._finishRecording(true, filePath);
    //         }
    //         return filePath;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async _pausePlay() {
    //     if (!this.state.playing) {
    //         console.warn('Not playing can\'t pause');
    //         return;
    //     }

    //     setTimeout(() => {
    //         var sound = this.state.soundPlayer;

    //         setTimeout(() => {
    //             sound.pause(() => this.setState({ playing: false }));
    //         }, 100);
    //     }, 100);
    // }

    // async _play() {

    //     if (this.state.recording) {
    //         await this._stop();
    //     }

    //     // These timeouts are a hacky workaround for some issues with react-native-sound.
    //     // See https://github.com/zmxv/react-native-sound/issues/89.
    //     setTimeout(() => {

    //         var counter = 0;
    //         var sound = null;
    //         if (this.state.soundPlayer) {
    //             sound = this.state.soundPlayer;
    //             this.setState({ totalTime: Math.floor(sound.getDuration()), playing: true })
    //         } else {
    //             sound = new Sound(this.state.audioPath, '', (error) => {
    //                 if (error) {
    //                     console.log('failed to load the sound', error);
    //                 } else {
    //                     console.log('i am here')
    //                     console.log(Math.floor(sound.getDuration()))
    //                     this.setState({ soundPlayer: sound })
    //                     this.setState({ totalTime: Math.floor(sound.getDuration()), playing: true })
    //                 }
    //             });
    //         }

    //         this.tickInterval = setInterval(() => {
    //             sound.getCurrentTime((seconds) => {
    //                 if (this.tickInterval) {
    //                     this.setState({
    //                         currentTime: Math.floor(seconds),
    //                     });
    //                 }
    //             });
    //         }, 250);

    //         setTimeout(() => {

    //             sound.play((success) => {

    //                 if (success) {
    //                     console.log('successfully finished playing');
    //                     if (this.tickInterval) {
    //                         clearInterval(this.tickInterval);
    //                         this.tickInterval = null;
    //                     }
    //                     this.setState({ playing: false })
    //                 } else {
    //                     console.log('playback failed due to audio decoding errors');
    //                     if (this.tickInterval) {
    //                         clearInterval(this.tickInterval);
    //                         this.tickInterval = null;
    //                     }
    //                     this.setState({ playing: false })
    //                     sound.reset();
    //                     if (counter == 0) {

    //                         //retry reading sound
    //                         this._play()
    //                         counter = counter + 1
    //                     }
    //                 }
    //             });
    //         }, 100);
    //     }, 100);
    // }

    // async _record() {
    //     if (this.state.recording) {
    //         console.warn('Already recording!');
    //         return;
    //     }

    //     if (!this.state.hasPermission) {
    //         console.warn('Can\'t record, no permission granted!');
    //         return;
    //     }

    //     if (this.state.stoppedRecording) {
    //         this.prepareRecordingPath(this.state.audioPath);
    //     }

    //     this.setState({ recording: true, paused: false });

    //     try {
    //         const filePath = await AudioRecorder.startRecording();
    //         this.setState({ recordingExists: true })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // _finishRecording(didSucceed, filePath) {
    //     this.setState({ finished: didSucceed, totalTime: this.state.currentTime });

    //     this.props.getRecordFilePath(filePath);
    //     console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    // }

    render() {

        if (this.state.recordingExists && !this.state.recording) {

            return (
                <View style={styles.mainContainerCSS}>
                    {/* <TouchableHighlight style={styles.viewForImage} onPress={() => { this.state.playing ? this._pausePlay() : this._play() }}>
                        <Image style={{ marginLeft: this.state.playing ? 0 : 2, height: this.state.playing ? 14 : 15, width: this.state.playing ? 23 : 15, resizeMode: 'contain' }} source={this.state.playing ? require('../../images/voiceNote/pauseRecord.png') : require('../../images/voiceNote/playRecord.png')} />
                    </TouchableHighlight>
                    <View style={[styles.viewForText, { paddingRight: 0 }]}>
                        <ProgressBar currentTime={this.state.totalTime - this.state.currentTime} totalTime={this.state.totalTime} />
                        <Text style={[styles.textStyle, { marginRight: this.state.canDeleteRecord == true ? 0 : 15 }]}>{helpers.fixRecordFormat(this.state.currentTime)}</Text>
                        {
                            this.state.canDeleteRecord ?
                                <TouchableHighlight style={[styles.viewForImage, { marginRight: 2 }]} onPress={() => {

                                    if (this.state.soundPlayer) {
                                        this.state.soundPlayer.reset()
                                    }
                                    if (this.tickInterval) {
                                        clearInterval(this.tickInterval);
                                        this.tickInterval = null;
                                    }
                                    this.setState({
                                        currentTime: 0,
                                        totalTime: 0,
                                        recordingExists: false,
                                        recording: false,
                                        paused: false,
                                        stoppedRecording: false,
                                        pausedPlaying: false,
                                        playing: false,
                                        finished: false,
                                        audioPath: AudioUtils.DocumentDirectoryPath + '/voiceNote.aac',
                                        soundPlayer: null
                                    })

                                    this.props.getRecordFilePath(null);
                                }}>
                                    <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={require('../../images/voiceNote/removeRecord.png')} />
                                </TouchableHighlight>
                                :
                                null
                        }
                    </View> */}
                </View>
            )
        } else {

            return (
                <View style={styles.mainContainerCSS}>
                    {/* <TouchableHighlight style={styles.viewForImage} onLongPress={() => { this._record() }} onPressOut={() => this._stop()}>
                        <Image style={{ height: 18, width: 15, resizeMode: 'contain' }} source={require('../../images/voiceNote/noVoice.png')} />
                    </TouchableHighlight>
                    <View style={styles.viewForText}>
                        <Text style={styles.textStyle}>{this.state.recording ? Locals.NOTIFICATION_DETAILS_REPLY_PAGE_VOICE_RECORDING : Locals.NOTIFICATION_DETAILS_REPLY_PAGE_VOICE_START_RECORDING}</Text>
                        <Text style={styles.textStyle}>{helpers.fixRecordFormat(this.state.currentTime)}</Text>
                    </View> */}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainContainerCSS: {
        flex: 1,
        width: '100%',
        borderRadius: 22.5,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    viewForImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#919191',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
        marginLeft: 3,
        marginRight: 20
    },
    viewForText: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20
    },
    textStyle: {
        height: '100%',
        fontFamily: Fonts.MAIN_FONT,
        color: '#919191',
        fontSize: 13,
        textAlign: 'center',
    }
})