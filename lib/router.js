Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function () {
		return [
			Meteor.subscribe('participants'),
			Meteor.subscribe('clubs'),
			Meteor.subscribe('races')
		];
	}
});

Router.map(function () {
	this.route('racesList', {path: '/'});
	this.route('clubsList', {path: '/clubs'});
	this.route('participantsList', {path: '/participants'});
//	this.route('racesList', {path: '/races'});

	this.route('clubSubmit', {
		path: '/clubs/new'
	});
	this.route('participantSubmit', {
		path: '/participants/new'
	});
	this.route('raceSubmit', {
		path: '/races/new'
	});

	this.route('clubPage', {
		path: '/clubs/:_id',
		data: function () { return Clubs.findOne(this.params._id); }
	});
	this.route('participantPage', {
		path: '/participants/:_id',
		data: function () { return Participants.findOne(this.params._id); }
	});
	this.route('racePage', {
		path: '/races/:_id',
		waitOn: function () {
			return Meteor.subscribe('participantsInRace', this.params._id);
		},
		data: function () { return Races.findOne(this.params._id); }
	});

	this.route('registerTimePage', {
		path: '/register_time/:_id',
		waitOn: function () {
			return Meteor.subscribe('participantsInRace', this.params._id);
		},
		data: function () { return Races.findOne(this.params._id); }
	});

	this.route('clubEdit', {
		path: '/clubs/:_id/edit',
		data: function () { return Clubs.findOne(this.params._id); }
	});
	this.route('participantEdit', {
		path: '/participants/:_id/edit',
		data: function () { return Participants.findOne(this.params._id); }
	});
	this.route('raceEdit', {
		path: '/races/:_id/edit',
		data: function () { return Races.findOne(this.params._id); }
	});

});

var requireLogin = function (pause) {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'participantSubmit'});
//Router.onBeforeAction(function () { clearErrors() });
