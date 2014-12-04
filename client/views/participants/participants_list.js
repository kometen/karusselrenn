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
                            '<input class="raceclub" id="raceclub" name="club" type="text" placeholder="Club"> ' +
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
                gender: $("input[name='gender']:checked").val(),
                club: $('#raceclub').val()
              }
              console.log("name: " + participant.name + ", year: " + participant.year + ", gender: " + participant.gender + ", club: " + participant.club);
              Meteor.call('postParticipant', participant, function (error, id) {
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
