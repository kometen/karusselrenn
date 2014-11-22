// Check userId added the participant
ownsParticipant = function (ownerId, doc) {
	return doc && doc.ownerId === ownerId;
}

ownsClub = function (ownerId, doc) {
	return doc && doc.ownerId === ownerId;
}

ownsRace = function (ownerId, doc) {
	return doc && doc.ownerId === ownerId;
}

ownsParticipantsInRace = function (ownerId, doc) {
	return doc && doc.ownerId === ownerId;
}
