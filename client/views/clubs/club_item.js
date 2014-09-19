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
	}
});