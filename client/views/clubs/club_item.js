Template.clubItem.helpers({
	ownClub: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});