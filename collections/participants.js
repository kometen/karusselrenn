Participants = new Meteor.Collection('participants');

Participants.allow({
	update: ownsParticipant,
	remove: ownsParticipant
});

Participants.deny({
	update: function (userId, doc, fields) {
		// Only edit specified fields
		return (_.without(fields, 'name', 'year', 'club').length > 0);
	}
});

Meteor.methods({
	postParticipant: function (postAttributes) {
		var user = Meteor.user();

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, 'You need to log in to add new participants');
		}

		if (!postAttributes.name) {
			throw new Meteor.Error(422, 'Please fill in the participants name');
		}
		if (!postAttributes.year) {
			throw new Meteor.Error(422, 'Please fill in the year the participant was born');
		}
		if (!postAttributes.club) {
			throw new Meteor.Error(422, 'Please fill in the name of the club');
		}

		// whitelisted keys
		var participant = _.extend(_.pick(postAttributes, 'name', 'year', 'club'), {
			ownerId: user._id,
			owner: user.username,
			submitted: new Date().getTime()
		});

		var participantId = Participants.insert(participant);

		return participantId;
	}
});