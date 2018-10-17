import * as DriverUtils from './driver';
import * as LocationUtils from './location';
import * as UserUtils from './user';
import * as TypeUtils from './type';
import * as OrderUtils from './order';
import * as CollectionUtils from './Collection';
import * as ServerStatus from '../constants/server_states';
import locals from '../localization/local';

/**
 * Create a new Task object
 * @param {object} data JSON response from server
 */
export function Task(data) {

    if (!data) {
        return {
            taskId: -1,
            order: null,
            note: '',
            sequence: -1,
            isSecured: false,
            overallSequence: -1,
            deliverCash: '',
            receiveCash: '',
            deliverPackage: '',
            deliverPackageJSON: null,
            receivePackage: '',
            failReason: '',
            collectionDate: '',
            collectionNote: '',
            collections: [],
            status: -1,
            location: null,
            driver: null,
            requireSignature: '',
            receiver: null,
            type: null
        }
    }
    var taskStatus = {}
    switch (data.status) {
        case ServerStatus.TaskStatus.TASK_STATUS_SECURED.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_SECURED
            break
        case ServerStatus.TaskStatus.TASK_STATUS_ASSIGNED.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_ASSIGNED
            break
        case ServerStatus.TaskStatus.TASK_STATUS_CANCELED.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_CANCELED
            break
        case ServerStatus.TaskStatus.TASK_STATUS_COMPLETE.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_COMPLETE
            break
        case ServerStatus.TaskStatus.TASK_STATUS_FAILED.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_FAILED
            break
        case ServerStatus.TaskStatus.TASK_STATUS_ON_THE_WAY.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_ON_THE_WAY
            break
        case ServerStatus.TaskStatus.TASK_STATUS_PENDING.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_PENDING
            break
        case ServerStatus.TaskStatus.TASK_STATUS_RE_SCHEDULED.key:
            taskStatus = ServerStatus.TaskStatus.TASK_STATUS_RE_SCHEDULED
            break
        default:
            taskStatus = { key: -1, label: locals.STATUS_UNKNOWN }
            break
    }

    let collections = []
    if (data.collections.length != 0) {
        data.collections.forEach(element => { collections.push(CollectionUtils.Collection(element)) })
    }

    return {
        taskId: data.id,
        // order: OrderUtils.OrderForTask(data.order),
        note: data.note,
        sequence: data.sequence,
        // isSecured: data.secured,
        preferredFromTime: data.preferred_from_time,
        preferredToTime: data.preferred_to_time,
        // overallSequence: data.overall_sequence,
        collectionDate: data.collection_date,
        collectionNote: data.collection_note,
        collections: collections,
        status: taskStatus,
        type: TypeUtils.Type(data.type.id, data.type.type, data.type.label)
    }
}