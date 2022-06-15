import { Session } from 'meteor/session';

import { callbacks } from '../../../lib/callbacks';

const wipeFailedUploads = (): void => {
	const uploads = Session.get('uploading');

	if (uploads) {
		Session.set(
			'uploading',
			uploads.filter((upload) => !upload.error),
		);
	}
};

callbacks.add('enter-room', wipeFailedUploads);
