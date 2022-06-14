import type { IImport, IImportChannel, IImportUser } from '@rocket.chat/core-typings';

export type ImportEndpoints = {
	'/v1/uploadImportFile': {
		POST: (params: { binaryContent: string; contentType: string; fileName: string; importerKey: string }) => any;
	};
	'/v1/downloadPublicImportFile': {
		POST: (params: { fileUrl: string; importerKey: string }) => void;
	};
	'/v1/startImport': {
		POST: (params: {
			input: {
				users: [
					{
						user_id: string;
						username: string;
						email: string;
						is_delete: boolean;
						is_bot: boolean;
						do_import: boolean;
						is_email_taken: boolean;
					},
				];
				channels: [
					{
						channel_id: string;
						name: string;
						is_archived: boolean;
						do_import: boolean;
						is_private: boolean;
						is_direct: boolean;
					},
				];
			};
		}) => void;
	};
	'/v1/getImportFileData': {
		GET: () => {
			users: Array<IImportUser>;
			channels: Array<IImportChannel>;
			message_count: number;
		};
	};
	'/v1/getImportProgress': {
		GET: () => {
			key: string;
			name: string;
			step: string;
			count: {
				completed: number;
				total: number;
			};
		};
	};
	'/v1/getLatestImportOperations': {
		GET: () => Array<IImport>;
	};
	'/v1/downloadPendingFiles': {
		POST: () => { count: number };
	};
	'/v1/downloadPendingAvatars': {
		POST: () => { count: number };
	};
	'/v1/getCurrentImportOperations': {
		GET: () => { operation: IImport };
	};
};
