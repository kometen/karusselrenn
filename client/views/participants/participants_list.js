Template.participantsList.helpers({
	participants: function () {
		return Participants.find({}, {sort: {name: 1}});
	},
	loggedIn: function () {
		return Meteor.userId();
	}
});
