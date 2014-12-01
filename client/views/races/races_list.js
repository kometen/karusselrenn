Template.racesList.helpers({
	races: function () {
		return Races.find({}, {sort: {date: 1}});
	},
	loggedIn: function () {
		return Meteor.userId();
	}
});

Template.racesList.events({

	'click input.new': function (e) {
		e.preventDefault();

		// stackoverflow.com/questions/22009649/how-to-create-a-bootbox-prompt-with-a-bootstrap-datepicker-as-input

		function BootboxContent(){    
            var frm_str = '<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="name">Name</label> ' +
						'<div class="controls"> ' +
							'<input id="name" name="name" type="text" placeholder="Racename"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="location">Location</label> ' +
						'<div class="controls"> ' +
							'<input id="location" name="location" type="text" placeholder="Location"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="date">Date</label> ' +
						'<div class="controls"> ' +
							'<input class="datepicker date" id="date" name="date" type="text" placeholder="Date"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="time">Time</label> ' +
						'<div class="controls"> ' +
							'<input class="timepicker" id="time" name="time" type="text" placeholder="Time"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="interval">Interval</label> ' +
						'<div class="controls"> ' +
							'<input id="interval" name="interval" type="text" placeholder="Interval"> ' +
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
	        title: "Enter race details",
    	    buttons: {
				success: {
					label: "Save",
					className: "btn-success",
					callback: function () {
						var race = {
							name: $('#name').val(),
							location: $('#location').val(),
							date: $('#date').val(),
							time: $('#time').val(),
							interval: $('#interval').val()
						}
						console.log("add race with name " + race.name + " at " + race.location);
        			}
			    },
				cancel: {
					label: "Cancel",
					className: "btn-default",
					callback: function () {
						console.log("cancel adding race");
					}
				}
			}
		});
    }
});
