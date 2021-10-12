/* Magic Mirror
 * Node Helper: MMM-DailyUnreachedPeopleGroup
 *
 * By Michael Stoltzfus
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fetch = require("node-fetch"); //Would you look at that! No more 'request'!!!

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function () {
		console.log("Started node_helper.js for MMM-DailyUnreachedPeopleGroup.");
	},

	socketNotificationReceived: function (notification, payload) {
		console.log(this.name + " node helper received a socket notification: " + notification + ' and the apiKey payload');

		this.joshuaProjectFetch(payload);
	},

	//Make a GET request to the Joshua Project Daily Unreached API endpoint.
	joshuaProjectFetch: function (apiKey) {

		let url = 'https://api.joshuaproject.net/v1/people_groups/daily_unreached.json?api_key=' + apiKey

		fetch(url)
			.then(res => res.json())
			.then(data => res = data)
			.then(() => this.sendSocketNotification('JOSHUA_PROJECT_RESULT', res))
			.catch(err => {
				console.error(err)
			})
	}
});