Template.raceAddParticipant.events({
	'submit form': function (e) {
		e.preventDefault();

		var raceId = this._id;

		var participant = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			club: $(e.target).find('[name=club]').val()
		}

/*		Meteor.call('postParticipantToRace', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('participantPage', {_id: id});
		});*/

		console.log('raceId: ' + raceId + ', participant-name: ' + participant.name);
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

// http://atmospherejs.com/package/typeahead
// ac = autocomplete

Template.raceAddParticipant.rendered = function () {
	Meteor.typeahead(this.find('.typeahead'));
};

Template.raceAddParticipant.acparticipants = function () {
//	return Participants.find().fetch().map(function (post) { return post.name; });
	return Participants.find().fetch();
};