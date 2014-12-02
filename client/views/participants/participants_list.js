Template.participantsList.helpers({
	participants: function () {
		return Participants.find({}, {sort: {name: 1}});
	},
	loggedIn: function () {
		return Meteor.userId();
	}
});

Template.participantsList.events({

	'click input.new': function (e) {
		e.preventDefault();

		// stackoverflow.com/questions/22009649/how-to-create-a-bootbox-prompt-with-a-bootstrap-datepicker-as-input

		function BootboxContent(){
            var frm_str = '<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="name">Name</label> ' +
						'<div class="controls"> ' +
							'<input id="name" name="name" type="text" placeholder="Participants name"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="year">Year</label> ' +
						'<div class="controls"> ' +
							'<input id="year" name="year" type="text" placeholder="Year born"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="club">Club</label> ' +
						'<div class="controls"> ' +
							'<input id="raceclub" name="club" type="text" placeholder="Club"> ' +
						'</div> ' +
					'</div> ' +
				'</form>';

    	    var object = $('<div/>').html(frm_str).contents();

        	object.find('.date').datepicker({
            	format: 'dd-mm-yyyy',
	            autoclose: true}).on('changeDate', function (ev) {
    	           $(this).blur();
        	       $(this).datepicker('hide');
        	});

        	return object
	    }

	    //Show the datepicker in the bootbox
    	bootbox.dialog({
        	message: BootboxContent,
	        title: "Enter participant details",
    	    buttons: {
				success: {
					label: "Save",
					className: "btn-success",
					callback: function () {
						var participant = {
							name: $('#name').val(),
							year: $('#year').val(),
							club: $('#club').val()
						}
						console.log("add participant with name " + participant.name + " at club " + participant.club);
                        Meteor.call('postParticipant', participant, function (error, id) {
                            if (error) {
                                return alert(error.reason);
                            }
//                            Router.go('racePage', {_id: id});
                        });
        			}
			    },
				cancel: {
					label: "Cancel",
					className: "btn-default",
					callback: function () {
						console.log("cancel adding participant");
					}
				}
			}
		});
    }
});

Template.participantsList.rendered = function () {
	acClub();
};
