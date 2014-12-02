Template.clubsList.helpers({
	clubs: function () {
		return Clubs.find({}, {sort: {name: 1}});
	},
	loggedIn: function () {
		return Meteor.userId();
	}
});

Template.clubsList.events({

	'click input.new': function (e) {
		e.preventDefault();

		// stackoverflow.com/questions/22009649/how-to-create-a-bootbox-prompt-with-a-bootstrap-datepicker-as-input

		function BootboxContent(){
            var frm_str = '<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="name">Name</label> ' +
						'<div class="controls"> ' +
							'<input id="name" name="name" type="text" placeholder="Clubname"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="description">Description</label> ' +
						'<div class="controls"> ' +
							'<input id="description" name="description" type="text" placeholder="Description"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="city">City</label> ' +
						'<div class="controls"> ' +
							'<input id="city" name="city" type="text" placeholder="City"> ' +
						'</div> ' +
					'</div> ' +
				'</form>';

    	    var object = $('<div/>').html(frm_str).contents();

        	return object
	    }

	    //Show the datepicker in the bootbox
    	bootbox.dialog({
        	message: BootboxContent,
	        title: "Enter club details",
    	    buttons: {
				success: {
					label: "Save",
					className: "btn-success",
					callback: function () {
						var club = {
							name: $('#name').val(),
							description: $('#description').val(),
							city: $('#city').val()
						}
						console.log("add club with name " + club.name + " at " + club.city);
                        Meteor.call('postClub', club, function (error, id) {
                            if (error) {
                                return alert(error.reason);
                            }
                            Router.go('clubsList');
                        });
        			}
			    },
				cancel: {
					label: "Cancel",
					className: "btn-default",
					callback: function () {
						console.log("cancel adding club");
					}
				}
			}
		});
    }
});
