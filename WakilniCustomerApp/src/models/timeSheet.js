/**
 * Create a new timeSheet object
 * @param {object} data Data returned from server
 */
export function TimeSheet(data) {
    return {
        id: data.id,
        from: data.from,
        to: data.to,
        note: data.note,
        status: data.status,
        statusCode: data.status_code
    }
}

/**
 * Create a new timeSheet object
 * @param {object} data Data returned from local
 */
export function newTimeSheet(id, from, to, note, status, statusCode) {
    return {
        id: id,
        from: from,
        to: to,
        note: note,
        status: status,
        statusCode: statusCode
    }
}