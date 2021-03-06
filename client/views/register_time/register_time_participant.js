Template.raceRegisterTime.events({
	'submit form': function (e) {
		e.preventDefault();

		var raceId = this._id;

		var participant = {
			startnumber: $(e.target).find('[name=startnumber]').val(),
			endtime: $(e.target).find('[name=endtime]').val(),
			raceId: raceId
		}

		Meteor.call('registerRaceTime', participant, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('registerTimePage', {_id: raceId});
		});
	},
	'click .unlock': function () {
		Races.update(this._id, {$set: { locked: false}} );
//		console.log('unlock race with raceId ' + this._id);
	}

});

Template.raceRegisterTime.rendered = function () {
	document.getElementById('startnumber').focus();
};