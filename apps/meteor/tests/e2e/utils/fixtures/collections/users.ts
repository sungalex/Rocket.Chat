import type { IUser } from '@rocket.chat/core-typings';

export const userSimple1: IUser = {
	_id: 'user_simple_1',
	type: 'user',
	active: true,
	emails: [{ address: 'user_simple_1@email.com', verified: false }],
	roles: ['user'],
	name: 'User Simple 1',
	lastLogin: new Date(),
	statusConnection: 'offline',
	utcOffset: -3,
	username: 'user_simple_1',
	services: {
		password: {
			bcrypt: '$2b$10$EMxaeQQbSw9JLL.YvOVPaOW8MKta6pgmp2BcN5Op4cC9bJiOqmUS.',
		},
		email2fa: { enabled: true, changedAt: new Date() },
		email: {
			verificationTokens: [
				{
					token: 'V8e1X2pMtYnVBzIgQx017Gmy37kq-WxohSHPjg-0qf8',
					address: 'user_simple_1@email.com',
					when: new Date(),
				},
			],
		},
		resume: { loginTokens: [] },
		emailCode: [{ code: '', expire: new Date() }],
	},
	createdAt: new Date(),
	_updatedAt: new Date(),
	// @ts-ignore
	__rooms: ['GENERAL', 'room_private_1', 'room_public_1'],
};
