import Locals from "../localization/local";

/**
 * Prefered Language of the driver
 */
export const LanguageType = {
    ENGLISH: '5',
    ARABIC: '4',
}

/**
 * User Role
 */
export const UserRoles = {
    Customer: { id: 2, label: 'Customer' },
    Driver: { id: 3, label: 'Driver' },
    Operator: { id: 4, label: 'Operator' }
}

/**
 * Gender
 */
export const Gender = {
    Male: { id: 1, label: 'Male' },
    Female: { id: 2, label: 'Female' }
}

/**
 * Task status returned from server
 */
export const TaskStatus = {
    TASK_STATUS_SECURED: { key: 1, label: Locals.TASK_STATUS_SECURED },
    TASK_STATUS_PENDING: { key: 2, label: Locals.TASK_STATUS_PENDING },
    TASK_STATUS_ASSIGNED: { key: 3, label: Locals.TASK_STATUS_ASSIGNED },
    TASK_STATUS_ON_THE_WAY: { key: 4, label: Locals.TASK_STATUS_ON_THE_WAY },
    TASK_STATUS_COMPLETE: { key: 5, label: Locals.TASK_STATUS_COMPLETE },
    TASK_STATUS_FAILED: { key: 6, label: Locals.TASK_STATUS_FAILED },
    TASK_STATUS_CANCELED: { key: 7, label: Locals.TASK_STATUS_CANCELED },
    TASK_STATUS_RE_SCHEDULED: { key: 8, label: Locals.TASK_STATUS_RE_SCHEDULED }
}

/**
 * Task type returned from server
 */
export const TaskType = {
    TASK_TYPE_PICKUP: { key: 14, label: Locals.TASK_TYPE_PICKUP },
    TASK_TYPE_DELIVER: { key: 15, lebale: Locals.TASK_TYPE_DELIVER },
    TASK_TYPE_RETURN: { key: 16, label: Locals.TASK_TYPE_RETURN }
}

/**
 * Order status returned from server
 */
export const OrderStatus = {
    ORDER_STATUS_PENDING: { key: 1, label: Locals.ORDER_STATUS_PENDING },
    ORDER_STATUS_SECURED: { key: -1, label: Locals.ORDER_STATUS_SECURED },
    ORDER_STATUS_CONFIRMED: { key: 2, label: Locals.ORDER_STATUS_CONFIRMED },
    ORDER_STATUS_DECLINED: { key: 6, label: Locals.ORDER_STATUS_DECLINED },
    ORDER_STATUS_CANCELED: { key: 7, label: Locals.ORDER_STATUS_CANCELED },
    ORDER_STATUS_PROCESSING: { key: 3, label: Locals.ORDER_STATUS_PROCESSING },
    ORDER_STATUS_SUCCESS: { key: 4, label: Locals.ORDER_STATUS_SUCCESS },
    ORDER_STATUS_FAILED: { key: 5, label: Locals.ORDER_STATUS_FAILED },
    ORDER_STATUS_CLOSED_FAILED: { key: 8, label: Locals.ORDER_STATUS_CLOSED_FAILED }
}

/**
 * Package status returned from server
 */
export const PackageStatus = {
    PACKAGE_STATUS_WITH_CUSTOMER: { key: 1, label: Locals.PACKAGE_STATUS_WITH_CUSTOMER },
    PACKAGE_STATUS_WITH_DRIVER: { key: 2, label: Locals.PACKAGE_STATUS_WITH_DRIVER },
    PACKAGE_STATUS_IN_THE_OFFICE: { key: 3, label: Locals.PACKAGE_STATUS_IN_THE_OFFICE },
    PACKAGE_STATUS_WITH_RECIPIENT: { key: 4, label: Locals.PACKAGE_STATUS_WITH_RECIPIENT },
    PACKAGE_STATUS_DAMAGED: { key: 5, label: Locals.PACKAGE_STATUS_DAMAGED }
}

/**
 * Notification Requests type returned from server
 */
export const NotificationRequests = {
    NOTIFICATION_REQUESTS_PENDING: { key: 1, label: Locals.NOTIFICATION_REQUESTS_PENDING },
    NOTIFICATION_REQUESTS_ACCEPTED: { key: 2, label: Locals.NOTIFICATION_REQUESTS_ACCEPTED },
    NOTIFICATION_REQUESTS_REJECTED: { key: 3, label: Locals.NOTIFICATION_REQUESTS_REJECTED },
}