import { useUserPreference } from '@rocket.chat/ui-contexts';
import { ComponentType, CSSProperties, ReactNode, useMemo } from 'react';

import Condensed from '../Item/Condensed';
import Extended from '../Item/Extended';
import Medium from '../Item/Medium';

export const useTemplateByViewMode = (): ComponentType<{
	icon: ReactNode;
	title: ReactNode;
	avatar: ReactNode;
	href: string;
	time?: Date;
	menu?: () => ReactNode;
	menuOptions?: unknown;
	subtitle?: ReactNode;
	titleIcon?: ReactNode;
	badges?: ReactNode;
	threadUnread?: boolean;
	unread?: boolean;
	selected?: boolean;
	is?: string;
	id?: string;
	onClick?: () => void;
	style?: CSSProperties;
}> => {
	const sidebarViewMode = useUserPreference('sidebarViewMode');
	return useMemo(() => {
		switch (sidebarViewMode) {
			case 'extended':
				return Extended;

			case 'medium':
				return Medium;

			case 'condensed':
			default:
				return Condensed;
		}
	}, [sidebarViewMode]);
};
