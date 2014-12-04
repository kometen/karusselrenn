Template.participantEdit.events({
	'submit form': function (e) {
		e.preventDefault();

		var currentParticipantId = this._id;

		var participantProperties = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			gender: $(e.target).find('[name=gender]').val(),
			club: $(e.target).find('[name=club]').val()
		}

		Participants.update(currentParticipantId, {$set: participantProperties}, function (error) {
			if (error) {
				return alert(error.reason);
			} else {
				Session.set('edit_participant', 'changed');
			}
		});
	},

	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Delete participant?')) {
			var currentParticipantId = this._id;
			Participants.remove(currentParticipantId);
		}
	},

	'click .cancel': function (e) {
		e.preventDefault();
		Session.set('edit_participant', 'changed');
	}

});

Template.participantEdit.rendered = function () {
	document.getElementById('name').focus();

	acClub();

};
