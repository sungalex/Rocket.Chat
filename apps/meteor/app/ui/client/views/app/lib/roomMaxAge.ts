import type { IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';

import { settings } from '../../../../../settings/client';
import { chatMessages } from './chatMessages';
import { roomHasPurge } from './roomHasPurge';

export { chatMessages };

export function roomMaxAge(room?: IRoomWithRetentionPolicy): number | undefined {
	if (!room) {
		return;
	}
	if (!roomHasPurge(room)) {
		return;
	}

	if (room.retention && room.retention.overrideGlobal) {
		return room.retention.maxAge;
	}

	if (room.t === 'c') {
		return settings.get('RetentionPolicy_MaxAge_Channels');
	}
	if (room.t === 'p') {
		return settings.get('RetentionPolicy_MaxAge_Groups');
	}
	if (room.t === 'd') {
		return settings.get('RetentionPolicy_MaxAge_DMs');
	}
}
