/**
 * Create a new package object
 * @param {object} data Data returned from server
 */
export function Packages(data) {
    return {
        id: data.id,
        quantity: data.quantity,
        tripNumber: data.trip_number,
        type: data.type ? {
            id: data.type.id,
            createdAt: data.type.created_at,
            deletedAt: data.type.deleted_at,
            updatedAt: data.type.updated_at,
            label: data.type.label,
            type: data.type.type            
        } : null,
    }
}