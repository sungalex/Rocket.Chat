import { readMessage } from '../../../app/ui-utils/client';
import { callbacks } from '../../../lib/callbacks';
import { SubscriptionAndRoom } from '../../definitions/SubscriptionAndRoom';

const readMessages = (sub: SubscriptionAndRoom): void => {
	if (!sub) {
		return;
	}

	setTimeout(() => readMessage.read(sub.rid), 1000);
};

callbacks.add('enter-room', readMessages);
