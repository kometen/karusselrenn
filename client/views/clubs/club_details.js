Template.clubDetails.helpers({
	ownClub: function () {
		return this.ownerId == Meteor.userId();
	},
	club: function () {
		var club = Clubs.findOne(Session.get('club_id'));
		return club;
	},
	edit_club: function () {
		var edit_club = Clubs.findOne(Session.get('edit_club'));
		return edit_club;
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.clubDetails.events({
	'click input.edit': function (e) {
		e.preventDefault();

		Session.set('edit_club', Session.get('club_id'));
	}
});