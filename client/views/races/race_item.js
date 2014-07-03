Template.raceItem.helpers({
	ownRace: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});