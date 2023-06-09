import { STATE } from './states'

/**
 * Application default state
 */
export const defaultState = {
    lang: 'en',
    user: null,
    errorMessage: '',
    state: STATE.INTITAL,
    isUserCheckIn: false,
    historyList: [],
    tasksList: [],
    packagesList: [],
    badgeCount: 0,
    signatureId: null,
    imageId: null,
    notificationsList: [],
    alertsList: [],
    canLoadMoreAlerts: true, //paging helper
    submittedTasksList: [],
    notSubmittedTasksList: [],
    contactRecipientsList: [],
    myRequestsList: [],
    currencies: [],
    currentLat: 0.0,
    currentLong: 0.0,
    constantsList: null,
    // new
    areas: [],
    pickUpLocations: [],
    receiverLocations: [],
    customerOrders: [],
    canLoadMoreOrders: true, //paging helper
    customerRecipients: [],
    canLoadMoreCustomerRecipients: true,
    currentCustomerRecipientPages: 0,
    totalCustomerRecipientPages: 100,
}