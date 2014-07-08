Template.participantItem.helpers({
	ownParticipant: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}});

Template.participantItemTiny.events({
	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Remove from race?')) {
			var currentParticipantId = this.participantId;
//			console.log('currentParticipantId: ' + currentParticipantId + ', raceId' + this.raceId);
			ParticipantsInRace.remove(currentParticipantId);
		}
	}
});

Template.participantItemTiny.helpers({
	raceLockedStatus: function () {
		return Session.get("raceLockedStatus");
	}
});