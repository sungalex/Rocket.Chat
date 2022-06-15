import type { IRoom } from '@rocket.chat/core-typings';

import { ChatMessages } from '../../../lib/chatMessages';

export const chatMessages: Record<IRoom['_id'], ChatMessages> = {};
