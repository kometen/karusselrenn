Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function () { return Meteor.subscribe('participants'); }
});

Router.map(function () {
	this.route('participantsList', {path: '/'});

	this.route('participantPage', {
		path: '/participants/:_id',
		data: function () { return Participants.findOne(this.params._id); }
	});

	this.route('participantEdit', {
		path: '/participants/:_id/edit',
		data: function () { return Participants.findOne(this.params._id); }
	});

	this.route('participantSubmit', {
		path: '/submit'
	});
});

var requireLogin = function (pause) {
	if (!Meteor.user()) {
		if (Meteor.logingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
		pause();
	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'participantSubmit'});
Router.onBeforeAction(function () { clearErrors() });