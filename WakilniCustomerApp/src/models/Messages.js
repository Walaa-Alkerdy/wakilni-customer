import * as LocationUtils from './location';
import * as Object_TYPES from '../constants/object_types';
import * as UserUtils from './user';
/**
 * Create a new message object
 */
export function Message(data) {

    let imagePath = null
    let voicePath = null
    //for image and voice
    if (data.files && data.files.length > 0) {
        data.files.forEach((item) => {
            if (item.mime.includes('image')) {
                imagePath = item.url
            }
            if (item.mime.includes('audio') || item.mime.includes('video')) {
                voicePath = item.url
            }

        })
    }

    return {
        id: data.id,
        image: imagePath,
        voice: voicePath,
        createdAt: data.created_at ? {
            date: data.created_at.date,
            timeZone: data.created_at.timezone,
            timeZoneType: data.created_at.timezone_type,
        } : null,
        contentType: {
            createdAt: data.content_type.created_at,
            deletedAt: data.content_type.deleted_at,
            id: data.content_type.id,
            label: data.content_type.label,
            type: data.content_type.type,
            updatedAt: data.content_type.updated_at
        },
        location: data.location ? {
            areaId: data.location.area.id,
            building: data.location.building ? data.location.building + ', ' : '',
            createdAt: data.location.created_at,
            deletedAt: data.location.deleted_at,
            directions: data.location.directions ? data.location.directions : '',
            floor: data.location.floor,
            id: data.location.id,
            latitude: parseFloat(data.location.latitude),
            longitude: parseFloat(data.location.longitude),
            typeId: data.location.type.id,
            personable: data.location.personable ? {
                name: data.location.personable.name,
                phoneNumber: data.location.personable.phone_number
            } : {
                    name: '',
                    phoneNumber: ''
                },
            areaData: data.location.area ? {
                id: data.location.area.id,
                name: data.location.area.name,
                zone: data.location.area.zone ? {
                    id: data.location.area.zone.id,
                    label: data.location.area.zone.label
                } : null,
            } : null,
        } : null,
        message: data.message,
        receiver: UserUtils.ReceiverForTask(data.receiver),
        sender: UserUtils.ReceiverForTask(data.sender),
        status: data.status,
        title: data.title,
        type: {
            createdAt: data.type.created_at,
            deletedAt: data.type.deleted_at,
            id: data.type.id,
            label: data.type.label,
            type: data.type.type,
            updatedAt: data.type.updated_at
        }
    }
}

export function MessageAlert(data) {

    var objectType = -1
    if (data.object_type) {
        switch (data.object_type) {
            case 'App\\Models\\Message':
                objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_NOTIFICATION_MESSAGE
                break;
            case 'App\\Models\\TimeSheet':
                objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TIMESHEET
                break;
            case 'App\\Models\\Task':
                objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TASKS
                break;
            default:
                objectType = data.object_type
                break;
        }
    }

    return {
        id: data.id,
        data: data.data,
        objectId: data.object_id ? data.object_id : null,
        objectType: objectType,
        createdAt: data.created_at ? {
            date: data.created_at.date,
            timeZone: data.created_at.timezone,
            timeZoneType: data.created_at.timezone_type,
        } : null,
        readAt: data.read_at
    }
}