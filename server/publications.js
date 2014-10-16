Meteor.publish('participants', function () {
	return Participants.find();
});

Meteor.publish('clubs', function () {
	return Clubs.find();
});

Meteor.publish('races', function () {
	return Races.find();
});

Meteor.publish('participantsInRace', function (raceId) {
	return ParticipantsInRace.find({raceId: raceId}, {sort: {submitted: 1}});
});

// kadira.io/academy/getting-started-with-kadira/
//Kadira.connect('hQFM3Y2j4foZ7zvpy', '96082248-ce44-4ecc-b07f-90d6eff8b432')
