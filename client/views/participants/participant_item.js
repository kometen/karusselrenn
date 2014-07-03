Template.participantItem.helpers({
	ownParticipant: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});