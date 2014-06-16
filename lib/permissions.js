// Check userId added the participant
ownsParticipant = function (userId, doc) {
	return doc && doc.userId === userId;
}