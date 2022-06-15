import type { IRoom } from '@rocket.chat/core-typings';

import { settings } from '../../../../../settings/client';
import { userCanDrop } from './userCanDrop';

export const dropzoneHelpers = {
	dragAndDrop() {
		return settings.get('FileUpload_Enabled') ? 'dropzone--disabled' : undefined;
	},

	isDropzoneDisabled() {
		return settings.get('FileUpload_Enabled') ? 'dropzone-overlay--enabled' : 'dropzone-overlay--disabled';
	},

	dragAndDropLabel(this: Pick<IRoom, '_id'>) {
		if (!userCanDrop(this._id)) {
			return 'error-not-allowed';
		}
		if (!settings.get('FileUpload_Enabled')) {
			return 'FileUpload_Disabled';
		}
		return 'Drop_to_upload_file';
	},
} as const;
