Meteor.publish('participants', function () {
	return Participants.find();
})