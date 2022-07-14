import Ajv from 'ajv';

const ajv = new Ajv({
	coerceTypes: true,
});

export type StartImportParamsPOST = {
	input: {
		users: [
			{
				// eslint-disable-next-line @typescript-eslint/camelcase
				user_id: string;
				username: string;
				// eslint-disable-next-line @typescript-eslint/camelcase
				email: string;
				is_deleted: boolean;
				// eslint-disable-next-line @typescript-eslint/camelcase
				is_bot: boolean;
				// eslint-disable-next-line @typescript-eslint/camelcase
				do_import: boolean;
				// eslint-disable-next-line @typescript-eslint/camelcase
				is_email_taken: boolean;
			},
		];
		channels: [
			{
				// eslint-disable-next-line @typescript-eslint/camelcase
				channel_id: string;

				name: string;
				creator?: string;
				// eslint-disable-next-line @typescript-eslint/camelcase
				is_archived: boolean;
				// eslint-disable-next-line @typescript-eslint/camelcase
				do_import: boolean;
				// eslint-disable-next-line @typescript-eslint/camelcase
				is_private: boolean;
				// eslint-disable-next-line @typescript-eslint/camelcase
				is_direct: boolean;
			},
		];
	};
};

const StartImportParamsPostSchema = {
	type: 'object',
	properties: {
		input: {
			type: 'object',
			properties: {
				users: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							user_id: { type: 'string' },
							username: { type: 'string' },
							email: { type: 'string' },
							is_deleted: { type: 'boolean' },
							is_bot: { type: 'boolean' },
							do_import: { type: 'boolean' },
							is_email_taken: { type: 'boolean' },
						},
						required: ['user_id', 'username', 'email', 'is_deleted', 'is_bot', 'do_import', 'is_email_taken'],
					},
				},
				channels: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							channel_id: { type: 'string' },
							name: { type: 'string' },
							creator: { type: 'string' },
							is_archived: { type: 'boolean' },
							do_import: { type: 'boolean' },
							is_private: { type: 'boolean' },
							is_direct: { type: 'boolean' },
						},
						required: ['channel_id', 'name', 'is_archived', 'do_import', 'is_private', 'is_direct'],
					},
				},
			},
			required: ['users', 'channels'],
		},
	},
	required: ['input'],
};

export const isStartImportParamsPOST = ajv.compile<StartImportParamsPOST>(StartImportParamsPostSchema);
