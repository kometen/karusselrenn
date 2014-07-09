Template.raceItem.helpers({
	ownRace: function () {
		return this.ownerId == Meteor.userId();
	},
	date: function () {
		return moment(this.date).format("DD.MM.YYYY");
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});