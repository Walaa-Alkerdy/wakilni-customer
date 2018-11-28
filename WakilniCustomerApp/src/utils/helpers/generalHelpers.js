
var moment = require('moment');
import { AsyncStorage } from 'react-native'

/**
 * Group array by order Id
 */
export function groupByOrderId(nonGroupedArray) {
    let groupedArray = [];
    nonGroupedArray.forEach(function (item) {

        var element = groupedArray.find((x) => {
            return x.key == item.order.id
        })
        if (element) {
            element.value.push(item)
        } else {
            groupedArray.push({ key: item.order.id, value: [item] });
        }
    });

    groupedArray.forEach((item) => {
        item.value.sort((a, b) => {
            return b.overallSequence < a.overallSequence
        });
    })

    return groupedArray;
}

/**
 * Group array by from date
 */
export function groupByFromDate(nonGroupedArray) {
    let groupedArray = [];
    nonGroupedArray.forEach(function (item) {

        var element = groupedArray.find((x) => {
            return x.key == moment(item.from).format('YYYY-MM-DD')
        })
        if (element) {
            element.value.push(item)
        } else {
            groupedArray.push({ key: moment(item.from).format('YYYY-MM-DD'), value: [item] });
        }
    });

    return groupedArray;
}

/**
 * Convert Minutes to hours format
 */
export function getTimeFromMins(mins, format) {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    // if (mins >= 24 * 60 || mins < 0) {
    //     throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    // }
    var h = mins / 60 | 0,
        m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format(format);
}

/**
 * Check if a string is a number or not
 */
export function isNumeric(givenText) {
    return !isNaN(givenText)
}
/**
 * takes a number and converts it to 00:00 format
 */
export function fixRecordFormat(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}

/**
 * convert to device time zone
 */
export function convertDateToCurrentTimeZone(date, timeZone, format) {

    if (timeZone) {
        return moment.utc(date).local().format(format)
    } else {
        return moment.utc(date).local().format(format)
    }
}

/**
 * remove element from an array
 */
export function removeElementFromArray(array, element) {
    return array.filter(e => e !== element);
}

/**
 * remove element from an dictionary
 */
export function removeElementFromDictionary(dictionary, element) {
    return dictionary.filter(e => e.key !== element);
}

/**
 * Check if string is big
 */
export function isStringToBig(receivedString) {

    if (receivedString.length > 40) {
        return true
    } else {
        return false
    }
}

/**
 * Clear Cache
 */
export function clearCache() {
    AsyncStorage.removeItem('CachedUser')
    AsyncStorage.removeItem('SavedLanguage')
    AsyncStorage.removeItem('UnAuthenticated')
    AsyncStorage.removeItem('NavHelperStatus')
}