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
			Router.go('participantPage', {_id: id});
		});
	}
});

// http://atmospherejs.com/package/typeahead
// ac = autocomplete

Template.participantSubmit.rendered = function () {
	Meteor.typeahead(this.find('.typeahead'));
};

Template.participantSubmit.acclubs = function () {
	return Clubs.find().fetch().map(function (post) { return post.name;	});
};