Template.raceExportResults.events({
	'submit form': function (e) {
		e.preventDefault();

		window.URL = window.webkitURL || window.URL;

		var filename = 'karusellrenn.csv';
		var filedata = "";
		var contentType = 'text/csv';

		var raceId = this._id;
		var pc = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}}).fetch();

//		console.log('startnummer, namn, kjønn, tid brukt');
		filedata += 'startnummer,starttid,namn,fødd,kjønn,tid brukt,klubb\n';
		pc.forEach(function (p) {
//			console.log(p.startnumber + ', ' + p.name + ', ' + p.gender + ', ' + p.racetime);
			filedata += p.startnumber + ',' + p.starttime + ',' + p.name + ',' + p.year + ',' + (p.gender === 'male' ? 'gutt' : 'jente') + ',' + p.racetime + ',' + p.club + '\n';
		});

		var file = new Blob([filedata], {type: contentType});

		var currentButton = document.getElementById('exportRacetimes');
		var parentButton = currentButton.parentNode;
		var a = document.createElement('a');
		a.style.cssText = "margin: 50px; margin-right: -115px; float: right;";
		a.download = filename;
		a.href = window.URL.createObjectURL(file);
		a.textContent = 'Download CSV';
		a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
		parentButton.insertBefore(a, currentButton.nextSibling);
	}
});