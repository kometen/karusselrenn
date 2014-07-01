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
			id: $(e.target).find('[name=id]').val(),
			submitted: new Date().getTime(),
			raceId: raceId
		}

/*		Meteor.call('postParticipantToRace', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('participantPage', {_id: id});
		});*/

		console.log('raceId: ' + raceId + ', name: ' + participant.name + ', club: ' + participant.club + ', id: ' + participant.id);
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
//		source: participantsData,
		source: function (request, response) {
			response(participantsData)
		},
		focus: function (event, ui) {
			$("#name").val(ui.item.value)
			return false;
		},
		select: function (event, ui) {
			$("#name").val(ui.item.value);
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

function extractLast( term ) {
  return split( term ).pop();
}

function split( val ) {
  return val.split( /,\s*/ );
}