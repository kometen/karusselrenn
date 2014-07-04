Template.raceAddParticipant.events({
	'keypress raceAddParticipant#name': function (e) {
		if (e.which == 13) {
			console.log('enter key pressed');
		}
	},
	'submit form': function (e) {
		e.preventDefault();

		var raceId = this._id;

		var participant = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			club: $(e.target).find('[name=club]').val(),
			participantId: $(e.target).find('[name=id]').val(),
			raceId: raceId
		}

		Meteor.call('addParticipantToRace', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			$('#formRaceAddParticipant')[0].reset();
			Router.go('racePage', {_id: raceId});
		});

		console.log('raceId: ' + raceId + ', name: ' + participant.name + ', year: ' + participant.year + ', club: ' + participant.club + ', id: ' + participant.participantId);
	}

/*	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Delete participant?')) {
			var currentParticipantId = this._id;
			Participants.remove(currentParticipantId);
			Router.go('participantsList')
		}
	}*/
});

Template.raceAddParticipant.rendered = function () {
	document.getElementById('name').focus();

	$("#name").autocomplete({
		minLength: 0,
		source: function (request, response) {
			var pData = Participants.find({name: {$regex: new RegExp(request.term), $options: 'i'}}, {sort: {name: 1}});
			var p = pData.fetch();
			var suggestions = [];
//			console.log('request.term: ' + request.term);
			for (var i = 0; i < p.length; i++) {
//				console.log('p[' + i + '].name: ' + p[i].name + ', club: ' + p[i].club + ', id: ' + p[i]._id);
				suggestions.push({value: p[i].name, year: p[i].year, club: p[i].club, _id: p[i]._id});
			}
			response(suggestions)
//			response(participantsData)
		},
		focus: function (event, ui) {
			$("#name").val(ui.item.value)
			return false;
		},
		select: function (event, ui) {
			$("#name").val(ui.item.value);
			$("#year").val(ui.item.year);
			$("#club").val(ui.item.club);
			$("#id").val(ui.item._id);
			return false;
		}
	});
};

var participantsData = [
	{
		value: 'Claus Guttesen',
		club: 'BBIL',
		_id: 'abcd1234'
	},
	{
		value: 'Eline Clausdatter Kleppenes',
		club: 'BBIL',
		_id: 'efgh5678'
	},
	{
		value: 'Malene Clausdatter Kleppenes',
		club: 'BBIL',
		_id: 'ijkl9012'
	},
	{
		value: 'Vincent Claussøn Kleppenes',
		club: 'BBIL',
		_id: 'emno9012'
	},
	{
		value: 'Anne-Merete Kleppenes',
		club: 'BBIL',
		_id: 'pqrs3456'
	},
	{
		value: 'Anders Felde',
		club: 'BBIL',
		_id: 'tuvx7890'
	}
];

Template.raceAddParticipant.helpers({
	participants: participantsData
});