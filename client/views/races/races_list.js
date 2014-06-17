Template.racesList.helpers({
	races: function () {
		return Races.find({}, {sort: {name: 1}});
	}
});