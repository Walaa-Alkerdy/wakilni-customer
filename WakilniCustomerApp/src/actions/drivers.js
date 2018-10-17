import * as ApiDriver from '../apis/drivers';
import * as ApiTasks from '../apis/task';
import * as ApiMessages from '../apis/messages'
import * as ApiLocation from '../apis/location'
import {
    ACTION_AUTH, STATE, ACTION_DATABASE, ACTION_RESET, ACTION_DRIVER, ACTION_USER, ACTION_MESSAGES, ACTION_STAFF, ACTION_TASKS, ACTION_LOCATION, ACTION_VEHICLES
} from '../constants/states';

/**
 * Fetch driver tasks
 * @param {object} values Values for request
 */
export const getDriverTasksAPIAction = (values, onlyCompleted, isSubmitted) => (dispatch) => {
    var taskType = "";
    if (onlyCompleted != null) {
        taskType = (onlyCompleted == true) ? ACTION_TASKS.SHOW_DRIVER_TASKS_HISTORY : ACTION_TASKS.SHOW_DRIVER_TASKS;
    } else {
        taskType = (isSubmitted == true) ? ACTION_TASKS.SHOW_DRIVER_TASKS_SUBMITTED : ACTION_TASKS.SHOW_DRIVER_TASKS_NOT_SUBMITTED
    }

    dispatch({
        type: taskType,
        state: STATE.LOADING
    })

    ApiDriver.getDriverTasks(values, onlyCompleted, isSubmitted, (result) => {
        dispatch({
            type: taskType,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: taskType,
            state: STATE.FAILED,
            data: error
        })
    })
}

/**
 * Send a Back to office request to server
 * @param {object} values Values for request
 */
export const backToOfficeAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_DRIVER.BACK_TO_OFFICE,
        state: STATE.LOADING
    })

    ApiDriver.backToOffice(values, (result) => {
        dispatch({
            type: ACTION_DRIVER.BACK_TO_OFFICE,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_DRIVER.BACK_TO_OFFICE,
            state: STATE.FAILED,
            data: error
        })
    })
}


/**
 * Send driver's current location to server
 * @param {object} values Values for request
 */
export const trackDriverLocationAPIAction = (accessToken, values) => (dispatch) => {

    dispatch({
        type: ACTION_DRIVER.TRACK_LOCATION,
        state: STATE.LOADING
    })

    ApiDriver.trackDriverLocation(accessToken, values, (result) => {
        dispatch({
            type: ACTION_DRIVER.TRACK_LOCATION,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_DRIVER.TRACK_LOCATION,
            state: STATE.FAILED,
            data: error
        })
    })
}

/**
 * Fetch driver information
 * @param {int} driverId ID of driver
 * @param {string} accessToken User Access Token
 */
export const fetchDriverInformationAction = (driverId, accessToken) => (dispatch) => {
    dispatch({
        type: ACTION_DRIVER.FETCH,
        state: STATE.LOADING
    });

    ApiDriver.getDriverInformation(driverId, accessToken, (result) => {
        dispatch({
            type: ACTION_DRIVER.FETCH,
            state: STATE.SUCCESS,
            data: result
        });
    }, (error) => {
        dispatch({
            type: ACTION_DRIVER.FETCH,
            state: STATE.FAILED,
            data: error
        })
    })
}

/**
 * Start a pending task
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task to starat
 * @param {int} nowDrivingId ID of what the driver is driving
 * @param {string} accessToken User authorization token
 */
export const startNewTaskAction = (orderId, taskId, nowDrivingId, accessToken) => (dispatch) => {
    dispatch({
        type: ACTION_TASKS.START_TASK,
        state: STATE.LOADING
    });
    ApiTasks.startTask(accessToken, orderId, taskId, nowDrivingId, (result) => {
        dispatch({
            type: ACTION_TASKS.START_TASK,
            state: STATE.SUCCESS,
            data: result
        });
    }, (error) => {
        dispatch({
            type: ACTION_TASKS.START_TASK,
            state: STATE.FAILED,
            data: error
        })
    });
}


/**
 * Mark task as completed
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {string} signature User signature
 * @param {string} accessToken User authorization token
 */
export const markTaskAsCompleted = (orderId, taskId, signature, image, itemsCollected, accessToken, note, failReason, myCoordinates, inCameraPage) => (dispatch) => {

    dispatch({
        type: inCameraPage == true ? ACTION_TASKS.MARK_TASK_AS_COMPLETE_CAMERA_PAGE : ACTION_TASKS.MARK_AS_COMPLETE,
        state: STATE.LOADING
    })

    ApiTasks.completeTask(accessToken, orderId, taskId, signature, image, itemsCollected, note, failReason, myCoordinates, (result) => {
        dispatch({
            type: inCameraPage == true ? ACTION_TASKS.MARK_TASK_AS_COMPLETE_CAMERA_PAGE : ACTION_TASKS.MARK_AS_COMPLETE,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: inCameraPage == true ? ACTION_TASKS.MARK_TASK_AS_COMPLETE_CAMERA_PAGE : ACTION_TASKS.MARK_AS_COMPLETE,
            state: STATE.FAILED,
            data: error
        })
    });
}

/**
 * Mark task as failed on the server
 * @param {string} accessToken User authorization token
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {string} failReason Reason of failure
 */
export const markTaskAsFailed = (accessToken, orderId, taskId, failReason, isDamaged) => (dispatch) => {
    dispatch({
        type: ACTION_TASKS.MARK_AS_FAILED,
        state: STATE.LOADING
    })

    ApiTasks.markTaskAsFailed(accessToken, orderId, taskId, failReason, isDamaged, (result) => {
        dispatch({
            type: ACTION_TASKS.MARK_AS_FAILED,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_TASKS.MARK_AS_FAILED,
            state: STATE.FAILED,
            data: error
        })
    });
}

/**
 * reopen task on the server
 * @param {string} accessToken User authorization token
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {string} failReason Reason of failure
 */
export const reOpenTask = (accessToken, orderId, taskId) => (dispatch) => {
    dispatch({
        type: ACTION_TASKS.REOPEN_TASK,
        state: STATE.LOADING
    })

    ApiTasks.reOpenTask(accessToken, orderId, taskId, (result) => {
        dispatch({
            type: ACTION_TASKS.REOPEN_TASK,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_TASKS.REOPEN_TASK,
            state: STATE.FAILED,
            data: error
        })
    });
}

/**
 * Send "Request Help" message to other drivers
 * @param {string} accessToken User authorization token
 * @param {string} title Message title
 * @param {string} message Message content
 * @param {int} typeId Type of the message sent (help = 45)
 * @param {int} contentTypeId ID of content
 * @param {int} driverId ID of destination driver
 * @param {int} locationId ID of current locaiton
 */
export const requestHelp = (accessToken, values, contentTypeId, driverId, location) => (dispatch) => {
    dispatch({
        type: ACTION_DRIVER.SEND_HELP_MESSAGE,
        state: STATE.LOADING
    })
    ApiMessages.requestHelpFromOtherDrivers(values.label, values.label, values.id, contentTypeId, driverId, location, accessToken, (result) => {
        dispatch({
            type: ACTION_DRIVER.SEND_HELP_MESSAGE,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_DRIVER.SEND_HELP_MESSAGE,
            state: STATE.FAILED,
            data: error
        })
    })
}

/**
 * List drivers for given location
 * @param {string} accessToken User authorization token
 * @param {int} locationId Location ID
 */
export const fetchDriversForLocation = (accessToken, locationId) => (dispatch) => {
    dispatch({
        type: ACTION_LOCATION.LIST_DRIVERS,
        state: STATE.LOADING
    });
    ApiLocation.fetchDriversOfLocation(locationId, accessToken, (result) => {
        dispatch({
            type: ACTION_LOCATION.LIST_DRIVERS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_LOCATION.LIST_DRIVERS,
            state: STATE.FAILED,
            data: error
        })
    });
}

/**
 * List vehicles used by driver
 * @param {string} accessToken User authorization token
 */
export const fetchVehicles = (accessToken) => (dispatch) => {
    dispatch({
        type: ACTION_VEHICLES.FETCH_VEHICLES,
        state: STATE.LOADING
    });
    ApiDriver.getVehicleTypes(accessToken, (result) => {
        dispatch({
            type: ACTION_VEHICLES.FETCH_VEHICLES,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_VEHICLES.FETCH_VEHICLES,
            state: STATE.FAILED
        })
    });
}

/**
 * Update driver info
 * @param {string} action api's action which is in this case update
 * @param {string} updated must be sent as true
 * @param {int} driverId driver's id
 * @param {string} email driver's email
 * @param {string} password driver's password
 * @param {string} pattern driver's pattern
 * @param {string} firstName driver's first name
 * @param {string} lastName driver's last name
 * @param {string} dob driver's date of birth
 * @param {string} phoneNumber driver's phone number
 * @param {string} languageType 5 for english 4 for arabic
 */
export const updateDriverInfo = (accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType) => (dispatch) => {
    dispatch({
        type: ACTION_DRIVER.UPDATE_DRIVER_INFO,
        state: STATE.LOADING
    });
    ApiDriver.updateDriverInfo(accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, (result) => {
        dispatch({
            type: ACTION_DRIVER.UPDATE_DRIVER_INFO,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_DRIVER.UPDATE_DRIVER_INFO,
            state: STATE.FAILED,
            data: error
        })
    });
}

/**
 * Fetch packages
 * @param {string} accessToken 
 * @param {string} driverId
 */
export const getPackagesAPIAction = (accessToken, driverId) => (dispatch) => {

    dispatch({
        type: ACTION_DRIVER.GET_PACKAGES,
        state: STATE.LOADING
    })

    ApiDriver.getPackages(accessToken, driverId, (result) => {
        dispatch({
            type: ACTION_DRIVER.GET_PACKAGES,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_DRIVER.GET_PACKAGES,
            state: STATE.FAILED,
            data: error
        })
    })
}