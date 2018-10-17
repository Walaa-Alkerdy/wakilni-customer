import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Buttons } from '../../components';
import Locals from '../../localization/local';
import moment from 'moment';
import { Colors, Fonts } from '../../constants/general';
import * as helpers from '../../utils/helpers/generalHelpers';

class ListRow extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTimes = (items) => {
        if (items && Array.isArray(items)) {
            return items.map((_item, index) => {
                return (
                    <React.Fragment key={_item.id} >
                        {
                            this.props.lang == 'en' ?
                                this.props.isFound ?
                                    <View style={[styles.rowContainer, { paddingLeft: 40, paddingRight: 40 }]}>
                                        <Text style={[styles.fontSmall]}>{helpers.convertDateToCurrentTimeZone(_item.from, null, 'hh:mm A')}</Text>
                                        <Text style={styles.label}>{Locals.to.toLowerCase()}</Text>
                                        <Text style={[styles.fontSmall, { marginRight: 5, marginLeft: 5 }]}>{_item.to ? helpers.convertDateToCurrentTimeZone(_item.to, null, 'hh:mm A') : Locals.TIME_SHEET_PENDING}</Text>
                                    </View>
                                    :
                                    <View style={[styles.rowContainer, { justifyContent: 'center', paddingLeft: 40, paddingRight: 40 }]}>
                                        <Text style={styles.fontSmall}>{Locals.NO_ENTRIES_FOUND}</Text>
                                    </View>
                                :
                                this.props.isFound ?
                                    <View style={[styles.rowContainer, { paddingLeft: 40, paddingRight: 40 }]}>
                                        <Text style={[styles.fontSmall, { marginRight: 5, marginLeft: 5 }]}>{_item.to ? helpers.convertDateToCurrentTimeZone(_item.to, null, 'hh:mm A') : Locals.TIME_SHEET_PENDING}</Text>
                                        <Text style={[styles.label, { marginTop: 3 }]}>{Locals.to.toLowerCase()}</Text>
                                        <Text style={[styles.fontSmall]}>{helpers.convertDateToCurrentTimeZone(_item.from, null, 'hh:mm A')}</Text>
                                    </View>
                                    :
                                    <View style={[styles.rowContainer, { justifyContent: 'center', paddingLeft: 40, paddingRight: 40 }]}>
                                        <Text style={styles.fontSmall}>{Locals.NO_ENTRIES_FOUND}</Text>
                                    </View>
                        }
                        {
                            index == (items.length - 1) ? null : <View style={{ width: '95%', height: 1, backgroundColor: '#eeeeee', marginLeft: 10, marginRight: 10 }}></View>
                        }
                    </React.Fragment>
                )
            })
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.shadow]}>
                <View style={[styles.row, { alignContent: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingTop: 10 }]}>
                    <Text style={[styles.label, { textAlign: 'center', justifyContent: 'center', color: Colors.SUB_COLOR, fontWeight: 'bold', fontFamily: Fonts.MAIN_FONT, fontSize: 17 }]}>{moment(this.props.timeSheetItem.key, 'YYYY-MM-DD').format("DD MMM YYYY")}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                {
                    this.renderTimes(this.props.timeSheetItem.value)
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 7,
        marginBottom: 5,
        marginTop: 5,
        padding: 1,
        alignContent: 'center',

    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    label: {
        fontFamily: Fonts.SUB_FONT,
        fontWeight: 'normal',
        color: '#acacac',
        fontSize: 14,
        textAlign: 'center'
    },
    fontSmall: {
        fontFamily: Fonts.SUB_FONT,
        fontWeight: 'normal',
        fontSize: 14,
        color: '#acacac'
    },
    rowContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 0,
        marginTop: 5
    },
    shadow: {
        shadowColor: '#cccccc',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 1,
        backgroundColor: 'white',

    }
})

export default ListRow;