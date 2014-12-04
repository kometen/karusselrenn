acClub = function () {
	$("#raceclub").autocomplete({
		minLength: 0,
		source: function (request, response) {
			var cData = Clubs.find({name: {$regex: new RegExp(request.term), $options: 'i'}}, {sort: {name: 1}});
			var c = cData.fetch();
			var suggestions = [];
//			console.log('request.term: ' + request.term + ', cData: ' + cData);
			for (var i = 0; i < c.length; i++) {
//				console.log('c[' + i + '].name: ' + c[i].name + ', city: ' + c[i].city + ', id: ' + c[i]._id);
				suggestions.push({value: c[i].name, club: c[i].city, _id: c[i]._id});
			}
			response(suggestions)
		},
		focus: function (event, ui) {
			$("#raceclub").val(ui.item.value)
			return false;
		},
		select: function (event, ui) {
			$("#club").val(ui.item.value);
			$("#city").val(ui.item.club);
			$("#id").val(ui.item._id);
			return false;
		}
	});
}
