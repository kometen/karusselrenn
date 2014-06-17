Meteor.publish('participants', function () {
	return Participants.find();
});

Meteor.publish('clubs', function () {
	return Clubs.find();
});

Meteor.publish('races', function () {
	return Races.find();
});