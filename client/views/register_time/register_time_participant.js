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
	}
});

Template.raceRegisterTime.rendered = function () {
	document.getElementById('startnumber').focus();
//	document.getElementById('name').focus();
};