Template.clubItem.helpers({
	ownClub: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.clubItem.events({
	'click input.details': function (e) {
		e.preventDefault();

		delete Session.keys['edit_club'];
		Session.set('club_id', this._id);

/*		var club = {
			name: $(e.target).find('[name=name]').val(),
			description: $(e.target).find('[name=description]').val(),
			city: $(e.target).find('[name=city]').val()
		}

		Meteor.call('postClub', club, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('clubsList');
		});*/
	}
});