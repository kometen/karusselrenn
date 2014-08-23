Template.racesList.helpers({
	races: function () {
		return Races.find({}, {sort: {date: 1}});
	}
});