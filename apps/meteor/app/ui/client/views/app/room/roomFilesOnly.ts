import type { IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';

import { settings } from '../../../../../settings/client';

export function roomFilesOnly(room: IRoomWithRetentionPolicy): boolean {
	if (!room) {
		return false;
	}

	if (room.retention && room.retention.overrideGlobal) {
		return room.retention.filesOnly;
	}

	return settings.get('RetentionPolicy_FilesOnly');
}
