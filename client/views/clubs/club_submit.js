Template.clubSubmit.events({
	'submit form': function (e) {
		e.preventDefault();

		var club = {
			name: $(e.target).find('[name=name]').val(),
			description: $(e.target).find('[name=description]').val(),
			city: $(e.target).find('[name=city]').val()
		}

		Meteor.call('postClub', club, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('clubsList');
		});
	}
});

Template.clubSubmit.rendered = function () {
	document.getElementById('name').focus();
}