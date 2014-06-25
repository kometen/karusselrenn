Template.raceAddParticipant.events({
	'submit form': function (e) {
		e.preventDefault();

		var raceId = this._id;

		var participant = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			club: $(e.target).find('[name=club]').val(),
			id: $(e.target).find('[name=_id]').val()
		}

/*		Meteor.call('postParticipantToRace', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('participantPage', {_id: id});
		});*/

		console.log('raceId: ' + raceId + ', name: ' + participant.name + ', club: ' + Session.get('currentUserClub') + ', id: ' + Session.get('currentUserId'));
	}

/*	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Delete participant?')) {
			var currentParticipantId = this._id;
			Participants.remove(currentParticipantId);
			Router.go('participantsList')
		}
	}*/
});

Template.raceAddParticipant.settings = function () {
	return {
		position: 'bottom',
		limit: 10,
		rules: [
			{
				collection: Participants,
				field: 'name',
				matchAll: true,
				callback: function (doc) {
					Session.set('currentUserClub', doc.club);
					Session.set('currentUserId', doc._id);
				},
				template: Template.acParticipants
			}
		]
	}
};