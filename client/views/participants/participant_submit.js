Template.participantSubmit.events({
	'submit form': function (e) {
		e.preventDefault();

		var participant = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			club: $(e.target).find('[name=club]').val()
		}

		Meteor.call('postParticipant', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('participantsList');
		});
	}
});

Template.participantSubmit.rendered = function () {
	document.getElementById('name').focus();

	acClub();

};