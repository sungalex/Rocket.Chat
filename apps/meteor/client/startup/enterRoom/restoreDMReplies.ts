import { FlowRouter } from 'meteor/kadira:flow-router';

import { chatMessages } from '../../../app/ui/client/views/app/room/chatMessages';
import { callbacks } from '../../../lib/callbacks';
import { SubscriptionAndRoom } from '../../definitions/SubscriptionAndRoom';

const restoreDMReplies = (sub: SubscriptionAndRoom): void => {
	if (!sub) {
		return;
	}

	const isAReplyInDMFromChannel = FlowRouter.getQueryParam('reply') ? sub.t === 'd' : false;
	if (isAReplyInDMFromChannel && chatMessages[sub.rid]) {
		chatMessages[sub.rid].restoreReplies();
	}
};

callbacks.add('enter-room', restoreDMReplies);
