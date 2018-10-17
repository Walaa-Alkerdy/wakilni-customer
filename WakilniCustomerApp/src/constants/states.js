/**
 * States of application
 */
export const STATE = {
    INTITAL: 'INITIAL',
    LOADING: 'LOADING',
    FAILED: 'FAILED',
    SUCCESS: 'SUCCESS'
}

/**
 * Database actions
 */
export const ACTION_DATABASE = {
    LOADING: 'DATABASE_LOADING',
    SUCCESS: 'DATABASE_SUCCESS',
    FAILED: 'DATABASE_FAILED'
}

/**
 * Authentication related actions
 */
export const ACTION_AUTH = {
    LOGIN: "ACTION_LOGIN",
    LOGOUT: "ACTION_LOGOUT",
    REGISTER: "ACTION_REGISTER",
    IS_TOKEN_VALID: "IS_TOKEN_VALID",
}

/**
 * User related action
 */
export const ACTION_USER = {
    GET_USER_INFO: "GET_USER_INFO",
    UPDATE_USER_INFO: "UPDATE_USER_INFO",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    UPDATE_CHECK_IN_OUT_STATUS: "UPDATE_CHECK_IN_OUT_STATUS"
}

/**
 * Customer related actions
 */
export const ACTION_CUSTOMER = {
    CREATE_CUSTOMER: "CREATE_CUSTOMER",
    CREATE_NEW_RECEIVER: "CREATE_NEW_RECEIVER"
}

/**
 * Vehicle related action
 */
export const ACTION_VEHICLES = {
    FETCH_VEHICLES: "FETCH_VEHICLES",
}

/**
 * Driver related action
 */
export const ACTION_DRIVER = {
    FETCH: "FETCH_DRIVER_INFO",
    UPDATE_DRIVER_INFO: "UPDATE_DRIVER_INFO",
    REQUEST_AN_ORDER: "REQUEST_AN_ORDER",
    REQUEST_A_LEAVE: "REQUEST_A_LEAVE",
    BACK_TO_OFFICE: "BACK_TO_OFFICE",
    SEND_HELP_MESSAGE: "SEND_HELP_MESSAGE",
    REPLY_TO_REQUEST_NOTIFICATION_PAGE: "REPLY_TO_REQUEST_NOTIFICATION_PAGE",//notification page
    REPLY_TO_REQUEST: "REPLY_TO_REQUEST",//notification details page
    REPLY_TO_REQUEST_CAN_HELP: "REPLY_TO_REQUEST_CAN_HELP",//notification details reply page
    TRACK_LOCATION: "TRACK_LOCATION",
    GET_PACKAGES: "GET_PACKAGES"
}

/**
 * Task related action
 */
export const ACTION_TASKS = {
    SHOW_DRIVER_TASKS: "SHOW_DRIVER_TASKS",
    SHOW_DRIVER_TASKS_HISTORY: "SHOW_DRIVER_TASKS_HISTORY",
    START_TASK: "START_TASK",
    MARK_AS_COMPLETE: "MARK_TASK_AS_COMPLETE",
    MARK_TASK_AS_COMPLETE_CAMERA_PAGE: "MARK_TASK_AS_COMPLETE_CAMERA_PAGE",
    MARK_AS_FAILED: "MARK_TASK_AS_FAILED",
    REOPEN_TASK: "REOPEN_TASK",
    SHOW_DRIVER_TASKS_SUBMITTED: "SHOW_DRIVER_TASKS_SUBMITTED",
    SHOW_DRIVER_TASKS_NOT_SUBMITTED: "SHOW_DRIVER_TASKS_NOT_SUBMITTED"
}

/**
 * Staff related action
 */
export const ACTION_STAFF = {
    CHECK_IN: "CHECK_IN",
    CHECK_OUT: "CHECK_OUT",
    GET_TIME_SHEET: 'GET_TIME_SHEET'
}

/**
 * Message related action
 */
export const ACTION_MESSAGES = {
    SHOW_MESSAGES: "SHOW_MESSAGES",
    SHOW_MESSAGES_MAIN_PAGE: "SHOW_MESSAGES_MAIN_PAGE",
    SHOW_MY_REQUESTS: "SHOW_MY_REQUESTS",
    SHOW_ALERTS: "SHOW_ALERTS",
    SHOW_ALERTS_MAIN_PAGE: "SHOW_ALERTS_MAIN_PAGE",
    UPDATE_ALERTS: "UPDATE_ALERTS",
    SHOW_MESSAGE_DETAILS: "SHOW_MESSAGE_DETAILS",
}


/**
 * Location related actions
 */
export const ACTION_LOCATION = {
    LIST_DRIVERS: "LIST_DRIVERS_FOR_LOCATION",
    UPDATE_CURRENT_LAT_LONG: "UPDATE_CURRENT_LAT_LONG",
    GET_LOCATIONS: "GET_LOCATIONS",
    CREATE_LOCATION: "CREATE_LOCATION"
}

/**
 * Submission related action
 */
export const ACTION_SUBMISSIONS = {
    CASH_ACCOUNT_SUBMIT: "CASH_ACCOUNT_SUBMIT",
}

/**
 * Recipient Related action
 */
export const ACTION_RECIPIENTS = {
    GET_CONTACT_RECIPIENTS: "GET_CONTACT_RECIPIENTS"
}

/**
 * Reseting the state related actions
 */
export const ACTION_RESET = {
    RESET: "ACTION_RESET",
}

export const ACTION_UI = {
    HIDE_ALERT: "HIDE_ALERT",
    SHOW_ALERT: "SHOW_ALERT"
}

export const ACTION_UPLOAD_FILE = {
    SIGNATURE_FILE_UPLOAD: 'SIGNATURE_FILE_UPLOAD',
    IMAGE_FILE_UPLOAD: 'IMAGE_FILE_UPLOAD',
}

export const ACTION_CURRENCIES = {
    GET_CURRENCIES: "GET_CURRENCIES",
}

export const ACTION_CONSTANTS = {
    GET_CONSTANTS: "GET_CONSTANTS",
    GET_AREAS: "GET_AREAS"
}

export const ACTION_ORDER = {
    GET_ORDERS: "GET_ORDERS",
    CREATE_ORDERS: "CREATE_ORDERS"
}