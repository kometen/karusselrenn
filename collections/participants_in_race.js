ParticipantsInRace = new Meteor.Collection('participantsInRace');

ParticipantsInRace.allow({
	update: ownsParticipantsInRace,
	remove: ownsParticipantsInRace
});

/*
ParticipantsInRace.deny({
	update: function (userId, doc, fields) {
		// Only edit specified fields
		return (_.without(fields, 'name', 'year', 'club').length > 0);
	}
});
*/

Meteor.methods({
	addParticipantToRace: function (postAttributes) {
		var user = Meteor.user();

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, 'You need to log in to add participants to a race');
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
			userId: user._id,
			owner: user.username,
			submitted: new Date().getTime()
		});

		var participantId = ParticipantsInRace.insert(participant);

		return participantId;
	}
});