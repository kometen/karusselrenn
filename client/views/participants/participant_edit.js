Template.participantEdit.events({
	'submit form': function (e) {
		e.preventDefault();

		var currentParticipantId = this._id;

		var participantProperties = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			club: $(e.target).find('[name=club]').val()
		}

		Participants.update(currentParticipantId, {set: participantProperties}, function (error) {
			if (error) {
				return alert(error.reason);
			} else {
				Router.go('participantPage', {_id: currentParticipantId});
			}
		});
	},

	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Delete participant?')) {
			var currentParticipantId = this._id;
			Participants.remove(currentParticipantId);
			Router.go('participantsList')
		}
	}
});