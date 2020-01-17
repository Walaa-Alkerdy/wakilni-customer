// World radius for EPSG:3857 WGS 84/Pseudo-Mercator
const WORLD_RADIUS = 6378137;
const DEG_TO_RAD_FACTOR = Math.PI / 180;
const RAD_TO_DEG_FACTOR = 180 / Math.PI;

/**
 * @param {Number} longitude in degrees
 */
var _getMercatorLongitude = function (long) {
	return WORLD_RADIUS * long * DEG_TO_RAD_FACTOR;
}

/**
 * @param {Number} latitude in degrees
 */
var _getMercatorLatitude = function (lat) {
	return WORLD_RADIUS * Math.log(Math.tan(Math.PI / 4 + lat * DEG_TO_RAD_FACTOR / 2));
}

/**
 * @param {Array} p1 coordinate [x, y]
 * @param {Array} p2 coordinate [x, y]
 */
var _getDistance = function (p1, p2) {
	return Math.sqrt(Math.pow((p2[0] - p1[0]), 2) + Math.pow((p2[1] - p1[1]), 2));
}

/**
 * Computes coordinates of given region's visual center
 * by using (inverse) Mercator projection.
 *
 * @param {Object} region {longitude, latitude, longitudeDelta, latitudeDelta}
 * @param {Object} mapDimensions {x, y}
 */
export function getRegionsVisualCenterCoordinates(region, mapDimensions) {
	// Step 1: get coordinates of corner points (diagonal) of region

	if (!region) {
		return {
			longitude: 0.0,
			latitude: 0.0
		}
	}

	var lowerLeftLong = region.longitude - (region.longitudeDelta / 2);
	var lowerLeftLat = region.latitude - (region.latitudeDelta / 2);
	var upperRightLong = region.longitude + (region.longitudeDelta / 2);
	var upperRightLat = region.latitude + (region.latitudeDelta / 2);

	// Step 2: project these coordinates on virtual, linear plane using Mercator projection
	var mercatorX1 = _getMercatorLongitude(lowerLeftLong);
	var mercatorY1 = _getMercatorLatitude(lowerLeftLat);
	var mercatorX2 = _getMercatorLongitude(upperRightLong);
	var mercatorY2 = _getMercatorLatitude(upperRightLat);

	// console.log('mercatorX1, mercatorY1', mercatorX1, mercatorY1);
	// console.log('mercatorX2, mercatorY2', mercatorX2, mercatorY2);

	// Step 3: calculate coordinate's distance
	var distanceOnMercator = _getDistance([mercatorX1, mercatorY1], [mercatorX2, mercatorY2]);

	// Step 4: calculate distance of corresponding map (pixel) coordinates
	var distanceOnMap = _getDistance([0, mapDimensions.y], [mapDimensions.x, 0]);

	// console.log('distanceOnMercator', distanceOnMercator);
	// console.log('distanceOnMap', distanceOnMap);

	// Step 5: calculate scaling factor the the two latter
	var scaleFactor = distanceOnMercator / distanceOnMap;
	// console.log('scaleFactor', scaleFactor);

	// Step 6: calculate coordinates of map's center (width|height / 2) by using inverse Mercator projection
	var visualCenterLong = ((scaleFactor * mapDimensions.x / 2) + mercatorX1) * RAD_TO_DEG_FACTOR / WORLD_RADIUS;
	var visualCenterLat = (2 * Math.atan(Math.exp((mercatorY1 + (scaleFactor * mapDimensions.y / 2)) / WORLD_RADIUS)) - Math.PI / 2) * RAD_TO_DEG_FACTOR;

	return {
		longitude: visualCenterLong,
		latitude: visualCenterLat
	}
}
