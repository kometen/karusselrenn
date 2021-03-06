Template.raceItem.helpers({
	ownRace: function () {
		return this.ownerId == Meteor.userId();
	},
	date: function () {
		return moment(this.date, "MM/DD/YYYY").format("DD.MM.YYYY");
	},
	raceLocked: function () {
		return this.locked;
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.raceItem.events({
	'click input.details': function (e) {
		e.preventDefault();

		Session.set('edit_race', 'changed');
		Session.set('race_id', this._id);
	}
});