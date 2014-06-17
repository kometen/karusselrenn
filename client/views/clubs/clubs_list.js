Template.clubsList.helpers({
	clubs: function () {
		return Clubs.find({}, {sort: {name: 1}});
	}
});