Template.participantItem.helpers({
	ownParticipant: function () {
		return this.userId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});