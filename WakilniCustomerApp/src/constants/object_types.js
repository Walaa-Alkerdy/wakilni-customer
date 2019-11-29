export const CASH_COLLECTION = {
    PAID_BY_CARD: { id: 56, type: 'CASH_COLLECTION', label: 'Paid by card' },
    PAID_BY_CASH: { id: 55, type: 'CASH_COLLECTION', label: 'Paid by cash' },
    PAID: { id: 54, type: 'CASH_COLLECTION', label: 'Paid' },
    COLLECT_ON_PICKUP: { id: 53, type: 'CASH_COLLECTION', label: 'Collect on pickup' },
    COLLECT_ON_DELIVERY: { id: 52, type: 'CASH_COLLECTION', label: 'Collect on delivery' },
}

export const PAYMENT_METHOD = {
    CREDIT_CARD: { id: 51, type: 'PAYMENT_METHOD', label: 'Credit Card' },
    CREDIT_CARD2: { id: 50, type: 'PAYMENT_METHOD', label: 'Credit Card' },
    CREDIT_CARD3: { id: 23, type: 'PAYMENT_METHOD', label: 'Credit Card' },
    CASH_ON_PICKUP: { id: 22, type: 'PAYMENT_METHOD', label: 'Cash On Pickup' },
    CASH_ON_DELIVERY: { id: 21, type: 'PAYMENT_METHOD', label: 'Cash On Delivery' },
    ON_ACCOUNT: { id: 20, type: 'PAYMENT_METHOD', label: 'On Account' },
}

export const MESSAGE = {
    LOCATION_NOT_IN_ZONE: { id: 48, type: 'MESSAGE', label: 'Location Not In Zone' },
    REQUIRE_TIME_SHEET_CONFIRMATION: { id: 47, type: 'MESSAGE', label: 'Require Time sheet confirmation' },
    LOCATION_LOG_CREATED: { id: 46, type: 'MESSAGE', label: 'location log created' },
    DRIVER_HELP: { id: 45, type: 'MESSAGE', label: 'Driver Help' },
    REPLY_TO_DRIVER_HELP: { id: 53, type: 'MESSAGE', label: 'Reply To Driver Help' },
    NUDGE: { id: 28, type: 'MESSAGE', label: 'Nudge' },
    REQUEST_AN_ORDER: { id: 27, type: 'MESSAGE', label: 'Request an order' },
    REQUEST_A_LEAVE: { id: 26, type: 'MESSAGE', label: 'Request a Leave' },
}

export const LOCATION_LOG = {
    VOICE_MESSAGE: { id: 44, type: 'LOCATION_LOG', label: 'Voice Message' },
    TEXT: { id: 43, type: 'LOCATION_LOG', label: 'Text' },
    IMAGE: { id: 42, type: 'LOCATION_LOG', label: 'Image' },
}

export const STOCK = {
    CAPS: { id: 41, type: 'STOCK', label: 'Caps' },
    JACKET: { id: 40, type: 'STOCK', label: 'Jacket' },
    VEST: { id: 39, type: 'STOCK', label: 'Vest' },
    SWEATSHIRT: { id: 38, type: 'STOCK', label: 'Sweatshirt' },
    T_SHIRT: { id: 37, type: 'STOCK', label: 'T Shirt' },
}

export const MONEY = {
    CHECK: { id: 36, type: 'MONEY', label: 'Check' },
    CASH: { id: 35, type: 'MONEY', label: 'Cash' },
    CARD: { id: 65, type: 'MONEY', label: 'CARD' },
}

export const CURRENCY = {
    USD: { id: 1, type: 'USD', label: '$' },
    LBP: { id: 2, type: 'LBP', label: 'LL' },
}

export const LOCATION = {
    OFFICE_2: { id: 34, type: 'LOCATION', label: 'Office 2' },
    OFFICE: { id: 33, type: 'LOCATION', label: 'Office' },
    HOME_2: { id: 32, type: 'LOCATION', label: 'Home 2' },
    HOME: { id: 31, type: 'LOCATION', label: 'Home' },
}

export const ADDITIONAL_CHARGES = {
    WAIT_TIME: { id: 30, type: 'ADDITIONAL_CHARGES', label: 'Wait Time' },
    PHONE_CALL: { id: 29, type: 'ADDITIONAL_CHARGES', label: 'Phone Call' },
}

export const SUBSCRIPTION = {
    WEEKLY: { id: 25, type: 'SUBSCRIPTION', label: 'Weekly' },
    MONTHLY: { id: 24, type: 'SUBSCRIPTION', label: 'Monthly' },
}

export const CUSTOMER = {
    CUSTOMER: { id: 19, type: 'CUSTOMER', label: 'Customer' },
    ONLINE_BUSINESS: { id: 18, type: 'CUSTOMER', label: 'Online Business' },
    OFFLINE_BUSINESS: { id: 17, type: 'CUSTOMER', label: 'Offline Business' },
}

export const TASK = {
    RETURN_TASK: { id: 16, type: 'TASK', label: 'Return Task' },
    DELIVER_TASK: { id: 15, type: 'TASK', label: 'Deliver Task' },
    PICKUP_TASK: { id: 14, type: 'TASK', label: 'Pickup Task' },
}

export const ORDER = {
    PIGGY_BANK_TRIP: { id: 13, type: 'ORDER', label: 'Piggy Bank Trip' },
    RETURN_TRIP: { id: 12, type: 'ORDER', label: 'Return' },
    BULK_TRIP: { id: 11, type: 'ORDER', label: 'Bulk' },
    ONE_WAY_TRIP: { id: 10, type: 'ORDER', label: 'One Way' },
}

export const VEHICLE = {
    VEHICLE: { id: 9, type: 'VEHICLE', label: 'Bicycle' },
    TRUCK: { id: 8, type: 'VEHICLE', label: 'Truck' },
    MOTORCYCLE: { id: 7, type: 'VEHICLE', label: 'Motorcycle' },
    CAR: { id: 6, type: 'VEHICLE', label: 'Car' },
}

export const LANGUAGE = {
    ARABIC: { id: 5, type: 'LANGUAGE', label: 'Arabic' },
    ENGLISH: { id: 4, type: 'LANGUAGE', label: 'English' },
}

export const DRIVER = {
    ON_CALL: { id: 3, type: 'DRIVER', label: 'On Call' },
    PART_TIME: { id: 2, type: 'DRIVER', label: 'Part Time' },
    FULL_TIME: { id: 1, type: 'DRIVER', label: 'Full Time' },
}

export const NOTES = [
    { id: 1, type: 'Call_before_delivery', label: 'Call before delivery' },
    { id: 2, type: 'Call_to_schedule', label: 'Call to schedule' },
    { id: 3, type: 'Leave_with_concierge', label: 'Leave with concierge' },
    { id: 4, type: 'Leave_at_the_door', label: 'Leave at the door' },
    { id: 5, type: 'Always_someone_available', label: 'Someone’s always available' },
    { id: 6, type: 'Meet_at_the_car', label: 'Meet at the car' },
    { id: 7, type: 'Leave_with_neighbor', label: 'Leave with neighbor' },
    { id: 8, type: 'Other', label: 'Other: please specify' }
];

export const PACKAGES = {
    PAPER: { id: 57, type: 'Paper', label: 'Paper', labelAbbreviation: 'P' },
    REGULAR_BOX: { id: 58, type: 'Regular Box', label: 'Regular', labelAbbreviation: 'R' },
    SMALL_BAG_OR_BOX: { id: 59, type: 'Small Bag or Box', label: 'Small', labelAbbreviation: 'S' },
    LARGE_BOX: { id: 60, type: 'Large Box', label: 'Large', labelAbbreviation: 'L' },
    VERY_LARGE_BOX: { id: 61, type: 'Very Large Box', label: 'X Large', labelAbbreviation: 'XL' }
}

export const PUSH_NOTIFICATIONS = {
    NOTIFICATION_TYPES: {
        WILL_PRESENT_NOTIFICATION: 1,//app is in foreground
        NOTIFICATION_RESPONSE: 2,//background or terminated
    },
    SERVER_NOTIFICATION_TYPES: {
        FOR_TASKS: '1',//for tasks
        FOR_NOTIFICATION_MESSAGE: '2',//for message received and reply
        FOR_TIMESHEET: '3',//for timesheet
    }
}