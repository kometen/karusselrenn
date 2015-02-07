Template.participantItem.helpers({
	ownParticipant: function () {
		return this.ownerId == Meteor.userId();
	},
	domain: function () {
		return 'Blåbærsyltetøj';
	}
});

Template.participantItem.events({
	'click input.details': function (e) {
		e.preventDefault();

		Session.set('edit_participant', 'changed');
		Session.set('participant_id', this._id);
	}
});

Template.participantItemTiny.events({
	'click .edit': function (e) {
		e.preventDefault();
        function BootboxContent(that){
            var frm_str = '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                        '<label class="control-label" for="pname">Name</label> ' +
                        '<div class="controls"> ' +
                            '<input id="pname" name="pname" type="text" value="' + that.name + '" placeholder="Participants name"> ' +
                            '<input id="p_id" name="p_id" type="hidden" value="' + that._id + '">' +
                        '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                        '<label class="control-label" for="pyear">Year</label> ' +
                        '<div class="controls"> ' +
                            '<input id="pyear" name="pyear" type="text" value="' + that.year + '" placeholder="Year born"> ' +
                        '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                        '<label class="control-label" for="gender">Gender</label> ' +
                        '<div class="controls"> ' +
                            '<input id="male" name="gender" value="male" type="radio">Male ' +
                        '</div> ' +
                        '<div class="controls"> ' +
                            '<input id="female" name="gender" value="female" type="radio" checked="female">Female ' +
                        '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                        '<label class="control-label" for="club">Club</label> ' +
                        '<div class="controls"> ' +
                            '<input class="raceclub" id="raceclub" name="club" type="text"  value="' + that.club + '"placeholder="Club"> ' +
                        '</div> ' +
                    '</div> ' +
                '</form>';

            var object = $('<div/>').html(frm_str).contents();

            object.find('.raceclub').autocomplete({
                minLength: 0,
                source: function (request, response) {
                    var cData = Clubs.find({name: {$regex: new RegExp(request.term), $options: 'i'}}, {sort: {name: 1}});
                    var c = cData.fetch();
                    var suggestions = [];
                    for (var i = 0; i < c.length; i++) {
                        suggestions.push({value: c[i].name, club: c[i].city, _id: c[i]._id});
                    }
                    response(suggestions)
                },
                focus: function (event, ui) {
                    $("#raceclub").val(ui.item.value);
                    return false;
                },
                select: function (event, ui) {
                    $("#club").val(ui.item.value);
                    $("#city").val(ui.item.club);
                    $("#id").val(ui.item._id);
                    return false;
                }
            });

            return object
        }

        bootbox.dialog({
        message: BootboxContent(this),
        title: "Edit participant details",
        buttons: {
          success: {
            label: "Save",
            className: "btn-success",
            callback: function () {
              var participant = {
                name: $('#pname').val(),
                year: $('#pyear').val(),
                gender: $("input[name='gender']:checked").val(),
                club: $('#raceclub').val()
              }
              //console.log("id: " + $('#p_id').val() + ", name: " + participant.name + ", year: " + participant.year + ", gender: " + participant.gender + ", club: " + participant.club);
              ParticipantsInRace.update($('#p_id').val(), {$set: participant}, function (error, id) {
              if (error) {
                return alert(error.reason);
              }
            });
          }
        },
                cancel: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: function () {
                        console.log("cancel editing participant");
                    }
                }
            }
        });
	},
	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Remove from race?')) {
			var currentParticipantId = this.participantId;
//			console.log('currentParticipantId: ' + currentParticipantId + ', raceId: ' + this.raceId);
			ParticipantsInRace.remove(currentParticipantId + '_' + this.raceId);
		}
	}
});