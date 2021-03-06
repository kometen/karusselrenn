Template.raceInfo.helpers({
    ownRace: function () {
        return this.ownerId == Meteor.userId();
    },
    date: function () {
        return moment(this.date, "MM/DD/YYYY").format("DD.MM.YYYY");
    },
    raceLocked: function () {
        return this.locked;
    },
    domain: function () {
        return 'Blåbærsyltetøj';
    }
});
