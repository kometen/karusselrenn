Template.raceAddParticipant.helpers({
	raceLockedStatus: function () {
		if (Session.get("raceLockedStatus" + this._id) === true) {
			return true;
		} else {
			return false;
		}
	}
});

Template.raceAddParticipant.events({
	'submit form': function (e) {
		e.preventDefault();

		if (Session.equals(("raceLockedStatus" + this._id), true)) {
			console.log('Race locked in submit form');
			var raceId = this._id;

			var participant = {
				startnumber: $(e.target).find('[name=startnumber]').val(),
				endtime: $(e.target).find('[name=endtime]').val(),
				participantId: $(e.target).find('[name=id]').val()
			}

			console.log('startnumber: ' + participant.startnumber + ', endtime: ' + participant.endtime + ', raceId: ' + raceId);
		} else {

			var raceId = this._id;
			var interval = this.interval;
			var startdate = this.date;
			var starttime = this.time;

			var participant = {
				name: $(e.target).find('[name=name]').val(),
				year: $(e.target).find('[name=year]').val(),
				club: $(e.target).find('[name=club]').val(),
				participantId: $(e.target).find('[name=id]').val(),
				interval: interval,
				startdate: startdate,
				starttime: starttime,	// starttime is used in race_page.js
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
		}
	},
	'click .lock': function () {
		if (Session.equals(("raceLockedStatus" + this._id), true)) {
			console.log('setting raceLockedStatus for raceId ' + this._id + ' to false');
			Session.set(("raceLockedStatus" + this._id), false);
		} else {
			console.log('setting raceLockedStatus ' + this._id + ' to true');
			Session.set(("raceLockedStatus" + this._id), true);
		}
		var p = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}});
		var i = 0;
		p.forEach(function (post) {
//			console.log('i: ' + i + ', time: ' + moment(post.starttime, "HH:mm").add('seconds', post.interval * i).format("HH:mm:ss"));
			ParticipantsInRace.update(post._id,{$set: { starttime: moment(post.starttime, "HH:mm").add('seconds', post.interval * i).format("HH:mm:ss") }} );
			i++;
			post.startnumber = i;
			ParticipantsInRace.update(post._id,{$set: { startnumber: i }} );
		});
//		console.log('lock race with raceId ' + this._id);
	}
});

Template.raceAddParticipant.rendered = function () {
	if (Session.equals(("raceLockedStatus" + this._id), true)) {
		document.getElementById('startnumber').focus();
	} else {
		document.getElementById('name').focus();
	}

	acName();
};

var acName = function () {
	console.log('calling acName()');
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