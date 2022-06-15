import { Session } from 'meteor/session';

export const wipeFailedUploads = (): void => {
	const uploads = Session.get('uploading');

	if (uploads) {
		Session.set(
			'uploading',
			uploads.filter((upload) => !upload.error),
		);
	}
};
