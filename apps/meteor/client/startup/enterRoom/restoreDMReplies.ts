import { FlowRouter } from 'meteor/kadira:flow-router';

import { callbacks } from '../../../lib/callbacks';
import { SubscriptionAndRoom } from '../../definitions/SubscriptionAndRoom';
import { chatMessages } from '../../lib/utils/chatMessages';

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
