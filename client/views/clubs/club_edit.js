Template.clubEdit.events({
	'submit form': function (e) {
		e.preventDefault();

		var currentClubId = this._id;

		var clubProperties = {
			name: $(e.target).find('[name=name]').val(),
			description: $(e.target).find('[name=description]').val(),
			city: $(e.target).find('[name=city]').val()
		}

		Clubs.update(currentClubId, {$set: clubProperties}, function (error) {
			if (error) {
				return alert(error.reason);
			} else {
				Router.go('clubPage', {_id: currentClubId});
			}
		});
	},

	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Delete club?')) {
			var currentClubId = this._id;
			Clubs.remove(currentClubId);
			Router.go('clubsList')
		}
	}
});

Template.clubEdit.rendered = function () {
	document.getElementById('name').focus();
}