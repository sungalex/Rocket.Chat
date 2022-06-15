import type { IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';

import { settings } from '../../../app/settings/client';

export function roomExcludePinned(room: IRoomWithRetentionPolicy): boolean {
	if (!room) {
		return false;
	}

	if (room.retention && room.retention.overrideGlobal) {
		return room.retention.excludePinned;
	}

	return settings.get('RetentionPolicy_DoNotPrunePinned');
}
