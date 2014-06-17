var DateFormats = {
	short: 'dd-mm-yyyy',
	long: 'dddd dd.mm.yyyy HH:mm'
};

UI.registerHelper('formatDate', function (datetime, format) {
	if (moment) {
		f = DateFormats[format];
		return moment(datetime).format(f);
	} else {
		return datetime;
	}
});

Handlebars.registerHelper('prettyfyDate', function (timestamp) {
	return new Date(timestamp).toString('dd-MM-yyyy');
});