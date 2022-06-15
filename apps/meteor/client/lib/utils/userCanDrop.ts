import type { IRoom } from '@rocket.chat/core-typings';
import { Meteor } from 'meteor/meteor';

import { Users } from '../../../app/models/client';
import { roomCoordinator } from '../rooms/roomCoordinator';

export const userCanDrop = (_id: IRoom['_id']): boolean =>
	!roomCoordinator.readOnly(_id, Users.findOne({ _id: Meteor.userId() }, { fields: { username: 1 } }));
