Template.participantItem.helpers({
	ownParticipant: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.participantItem.events({
	'click input.details': function (e) {
		e.preventDefault();

		console.log('participant id: '+ this._id);
		delete Session.keys['edit_participant'];
		Session.set('participant_id', this._id);
	}
});

Template.participantItemTiny.events({
	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Remove from race?')) {
			var currentParticipantId = this.participantId;
//			console.log('currentParticipantId: ' + currentParticipantId + ', raceId: ' + this.raceId);
			ParticipantsInRace.remove(currentParticipantId + '_' + this.raceId);
		}
	}
});