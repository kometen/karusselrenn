Clubs = new Meteor.Collection('clubs');

Clubs.allow({
	update: ownsClub,
	remove: ownsClub
});

Clubs.deny({
	update: function (ownerId, doc, fields) {
		// Only edit specified fields
		return (_.without(fields, 'name', 'description', 'city').length > 0);
	}
});

Meteor.methods({
	postClub: function (postAttributes) {
		var user = Meteor.user();

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, 'You need to log in to add new clubs');
		}

		if (!postAttributes.name) {
			throw new Meteor.Error(422, 'Please fill in the club name');
		}
		if (!postAttributes.description) {
			throw new Meteor.Error(422, 'Please fill in the complete club name');
		}
		if (!postAttributes.city) {
			throw new Meteor.Error(422, 'Please fill in the name of the city');
		}

		// whitelisted keys
		var club = _.extend(_.pick(postAttributes, 'name', 'description', 'city'), {
			ownerId: user._id,
			owner: user.username,
			submitted: new Date().getTime()
		});

		var clubId = Clubs.insert(club);

		return clubId;
	}
});