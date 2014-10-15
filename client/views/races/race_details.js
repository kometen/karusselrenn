Template.raceDetails.helpers({
	ownRace: function () {
		return this.ownerId == Meteor.userId();
	},
	race: function () {
		return Races.findOne(Session.get('race_id'));
	},
	edit_race: function () {
		return Races.findOne(Session.get('edit_race'));
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.raceDetails.events({
	'click input.edit': function (e) {
		e.preventDefault();

		Session.set('edit_race', Session.get('race_id'));
	}
});