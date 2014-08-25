Template.raceAddParticipant.events({
	'submit form': function (e) {
		e.preventDefault();

		var raceId = this._id;
		var interval = this.interval;
		var startdate = this.date;
		var starttime = this.time;
		var racestarttime = this.time;

		var participant = {
			name: $(e.target).find('[name=name]').val(),
			year: $(e.target).find('[name=year]').val(),
			club: $(e.target).find('[name=club]').val(),
			participantId: $(e.target).find('[name=id]').val(),
			interval: interval,
			startdate: startdate,
			starttime: starttime,	// starttime is used in race_page.js
			racestarttime: racestarttime,
			raceId: raceId
		}

		Meteor.call('addParticipantToRace', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			$('#formRaceAddParticipant')[0].reset();
			Router.go('racePage', {_id: raceId});
		});

		console.log('raceId: ' + raceId + ', interval: ' + participant.interval + ', date: ' + participant.startdate + ', time: ' + participant.starttime + ', name: ' + participant.name + ', id: ' + participant.participantId);
	},
	'click .lock': function () {
		Races.update(this._id, {$set: { locked: true}} );
		var p = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}});
		var i = 0;
		p.forEach(function (post) {
			ParticipantsInRace.update(post._id,{$set: { starttime: moment(post.racestarttime, "HH:mm").second(post.interval * i).format("HH:mm:ss"),  startnumber: (i + 1) }} );
//			console.log('i: ' + i + ', starttime: ' + post.racestarttime + ', time: ' + moment(post.racestarttime, "HH:mm").seconds(post.interval * i).format("HH:mm:ss"));
			i++;
		});
		console.log('lock race with raceId ' + this._id);
	}
});

Template.raceAddParticipant.rendered = function () {
	document.getElementById('name').focus();
	acName();
};

var acName = function () {
//	console.log('calling acName()');
	$('#name').autocomplete({
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
}

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