Template.raceSearchParticipants.helpers({
	search_name: function () {
		return Session.get('search_name');
	}
})

Template.raceSearchParticipants.rendered = function () {
//	document.getElementById('search_name').focus();
	acParticipants();
};

var acParticipants = function () {
//	console.log('calling acParticipants()');
	$('#search_name').autocomplete({
		minLength: 0,
		source: function (request, response) {
			var sData = ParticipantsInRace.find({name: {$regex: new RegExp(request.term), $options: 'i'}}, {sort: {name: 1}});
			var s = sData.fetch();
			var suggestions = [];
//			console.log('request.term: ' + request.term);
			for (var i = 0; i < s.length; i++) {
//				console.log('p[' + i + '].name: ' + p[i].name + ', club: ' + p[i].club + ', id: ' + p[i]._id);
				suggestions.push({value: s[i].name, year: s[i].year, club: s[i].club, _id: s[i]._id});
			}
			response(suggestions)
		},
		focus: function (event, ui) {
			$("#search_name").val(ui.item.value)
			return false;
		},
		select: function (event, ui) {
			Session.set('search_name', ui.item.value);
			$("#search_name").val(ui.item.value);
			$("#search_year").val(ui.item.year);
			$("#search_club").val(ui.item.club);
			$("#search_id").val(ui.item._id);
			return false;
		}
	});
}
