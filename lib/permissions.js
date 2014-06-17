// Check userId added the participant
ownsParticipant = function (userId, doc) {
	return doc && doc.userId === userId;
}

ownsClub = function (userId, doc) {
	return doc && doc.userId === userId;
}

ownsRace = function (userId, doc) {
	return doc && doc.userId === userId;
}