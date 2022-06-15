import type { IRoom } from '@rocket.chat/core-typings';

import { ChatMessages } from '../../../app/ui/client/lib/chatMessages';

export const chatMessages: Record<IRoom['_id'], ChatMessages> = {};
