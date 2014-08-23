Races = new Meteor.Collection('races');

Races.allow({
	update: ownsRace,
	remove: ownsRace
});

Races.deny({
	update: function (userId, doc, fields) {
		// Only edit specified fields
		return (_.without(fields, 'name', 'location', 'date', 'time', 'interval', 'locked').length > 0);
	}
});

Meteor.methods({
	postRace: function (postAttributes) {
		var user = Meteor.user();

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, 'You need to log in to add new races');
		}

		if (!postAttributes.name) {
			throw new Meteor.Error(422, 'Please fill in the race name');
		}
		if (!postAttributes.location) {
			throw new Meteor.Error(422, 'Please fill in the location');
		}
		if (!postAttributes.date) {
			throw new Meteor.Error(422, 'Please fill in the date');
		}
		if (!postAttributes.time) {
			throw new Meteor.Error(422, 'Please fill in the time');
		}
		if (!postAttributes.interval) {
			throw new Meteor.Error(422, 'Please fill in the interval');
		}

		// whitelisted keys
		var race = _.extend(_.pick(postAttributes, 'name', 'location', 'date', 'time', 'interval'), {
			ownerId: user._id,
			owner: user.username,
			submitted: new Date().getTime()
		});

		var raceId = Races.insert(race);

		return raceId;
	}
});