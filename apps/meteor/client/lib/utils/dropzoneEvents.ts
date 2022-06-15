import type { IRoom } from '@rocket.chat/core-typings';
import $ from 'jquery';
import { Blaze } from 'meteor/blaze';
import moment from 'moment';
import _ from 'underscore';

import { settings } from '../../../app/settings/client';
import { RoomManager } from '../../../app/ui-utils/client';
import { chatMessages } from './chatMessages';
import { userCanDrop } from './userCanDrop';

function addToInput(text: string): void {
	const { input } = chatMessages[RoomManager.openedRoom];
	const initText = input.value.slice(0, input.selectionStart);
	const finalText = input.value.slice(input.selectionEnd, input.value.length);

	input.value = initText + text + finalText;
	$(input).change().trigger('input');
}

async function createFileFromUrl(url: string): Promise<File> {
	let response;
	try {
		response = await fetch(url);
	} catch (error) {
		throw error;
	}

	const data = await response.blob();
	const metadata = {
		type: data.type,
	};
	const { mime } = await import('../../../app/utils/lib/mimeTypes');
	const file = new File(
		[data],
		`File - ${moment().format(settings.get('Message_TimeAndDateFormat'))}.${mime.extension(data.type)}`,
		metadata,
	);
	return file;
}

export const dropzoneEvents = {
	'dragenter .dropzone'(this: Pick<IRoom, '_id'>, e: JQuery.DragEnterEvent) {
		const types = e.originalEvent && e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.types;

		if (
			types != null &&
			types.length > 0 &&
			_.some(types, (type) => type.indexOf('text/') === -1 || type.indexOf('text/uri-list') !== -1 || type.indexOf('text/plain') !== -1) &&
			userCanDrop(this._id)
		) {
			e.currentTarget.classList.add('over');
		}
		e.stopPropagation();
	},

	'dragleave .dropzone-overlay'(e: JQuery.DragLeaveEvent) {
		e.currentTarget.parentNode.classList.remove('over');
		e.stopPropagation();
	},

	'dragover .dropzone-overlay'(e: JQuery.DragOverEvent) {
		document.querySelectorAll('.over.dropzone').forEach((dropzone) => {
			if (dropzone !== e.currentTarget.parentNode) {
				dropzone.classList.remove('over');
			}
		});

		if (!e.originalEvent?.dataTransfer) {
			return;
		}

		if (['move', 'linkMove'].includes(e.originalEvent.dataTransfer.effectAllowed)) {
			e.originalEvent.dataTransfer.dropEffect = 'move';
		} else {
			e.originalEvent.dataTransfer.dropEffect = 'copy';
		}

		e.stopPropagation();
	},

	async 'dropped .dropzone-overlay'(
		this: Pick<IRoom, '_id'>,
		event: JQuery.DropEvent,
		instance: Blaze.TemplateInstance & {
			onFile: (
				filesToUpload: {
					file: File;
					name: string;
				}[],
			) => void;
		},
	) {
		event.currentTarget.parentNode.classList.remove('over');

		const e = event.originalEvent;

		if (!e) {
			return;
		}

		e.stopPropagation();
		e.preventDefault();

		if (!userCanDrop(this._id) || !settings.get('FileUpload_Enabled')) {
			return false;
		}

		if (!e.dataTransfer) {
			return;
		}

		let files = Array.from(e.dataTransfer.files ?? []);

		if (files.length < 1) {
			const transferData = e.dataTransfer.getData('text') || e.dataTransfer.getData('url');

			if (e.dataTransfer.types.includes('text/uri-list')) {
				const url = e.dataTransfer.getData('text/html').match('<img.+src=(?:"|\')(.+?)(?:"|\')(?:.+?)>');
				const imgURL = url?.[1];

				if (!imgURL) {
					return;
				}

				const file = await createFileFromUrl(imgURL);
				if (typeof file === 'string') {
					return addToInput(file);
				}
				files = [file];
			}
			if (e.dataTransfer.types.includes('text/plain') && !e.dataTransfer.types.includes('text/x-moz-url')) {
				return addToInput(transferData.trim());
			}
		}
		const { mime } = await import('../../../app/utils/lib/mimeTypes');
		const filesToUpload = files.map((file) => {
			Object.defineProperty(file, 'type', { value: mime.lookup(file.name) });
			return {
				file,
				name: file.name,
			};
		});

		return instance.onFile?.(filesToUpload);
	},
} as const;
