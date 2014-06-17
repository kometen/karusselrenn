Template.clubItem.helpers({
	ownClub: function () {
		return this.userId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});