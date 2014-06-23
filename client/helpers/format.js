var DateFormats = {
	short: 'dd-mm-yyyy',
	long: 'dddd DD.MM.YYYY HH:mm'
};

UI.registerHelper('formatDate', function (datetime, format) {
	if (moment)	{
		f = DateFormats[format];
		return moment(datetime).format(f);
	} else {
		return datetime;
	}
});