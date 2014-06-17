Template.raceItem.helpers({
	ownRace: function () {
		return this.userId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});