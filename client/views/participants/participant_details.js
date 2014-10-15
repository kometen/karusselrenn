Template.participantDetails.helpers({
	ownParticipant: function () {
		return this.ownerId == Meteor.userId();
	},
	participant: function () {
		var participant = Participants.findOne(Session.get('participant_id'));
		return participant;
	},
	edit_participant: function () {
		var edit_participant = Participants.findOne(Session.get('edit_participant'));
		return edit_participant;
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.participantDetails.events({
	'click input.edit': function (e) {
		e.preventDefault();

		Session.set('edit_participant', Session.get('participant_id'));
	}
});