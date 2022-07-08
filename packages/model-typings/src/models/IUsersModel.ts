import type { UpdateResult, FindCursor, FindOptions, Filter, WithId } from 'mongodb';
import type {
	IUser,
	IRole,
	IRoom,
	ILivechatAgent,
	ILivechatDepartment,
	ILivechatAgentStatus,
	ILivechatBusinessHour,
} from '@rocket.chat/core-typings';

import type { FindPaginated, IBaseModel } from './IBaseModel';

export type PaginatedRequest<T = {}, S extends string = string> = {
	count?: number;
	offset?: number;
	sort?: `{ "${S}": ${1 | -1} }` | string;
	/* deprecated */
	query?: string;
} & T;

export interface IUsersModel extends IBaseModel<IUser> {
	addRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][]): Promise<UpdateResult>;
	findUsersInRoles(roles: IRole['_id'][] | IRole['_id'], scope?: null, options?: FindOptions<IUser>): FindCursor<IUser>;
	findOneByUsername(username: IUser['username'], options?: FindOptions<IUser>): Promise<IUser | null>;
	findOneAgentById(_id: ILivechatAgent['_id'], options?: FindOptions<ILivechatAgent>): Promise<ILivechatAgent | null>;
	findUsersInRolesWithQuery(roles: IRole['_id'] | IRole['_id'][], query: Filter<IUser>, options?: FindOptions<IUser>): FindCursor<IUser>;
	findOneByUsernameAndRoomIgnoringCase(
		username: IUser['username'] | RegExp,
		rid: IRoom['_id'],
		options?: FindOptions<IUser>,
	): Promise<IUser | null>;
	findOneByIdAndLoginHashedToken(_id: IUser['_id'], token: any, options?: FindOptions<IUser>): Promise<IUser | null>;
	findByActiveUsersExcept(
		searchTerm: string,
		exceptions: IUser['username'][] | IUser['username'],
		options: FindOptions<IUser>,
		searchFields: any,
		extraQuery: any[],
		params: { startsWith?: boolean; endsWith?: boolean },
	): FindCursor<IUser>;

	findActive(query: Filter<IUser>, options?: FindOptions<IUser>): FindCursor<IUser>;

	findActiveByIds(userIds: IUser['_id'][], options?: FindOptions<IUser>): FindCursor<IUser>;

	findByIds(userIds: IUser['_id'][], options?: FindOptions<IUser>): FindCursor<IUser>;

	findOneByUsernameIgnoringCase(username: IUser['username'], options: FindOptions<IUser>): Promise<IUser | null>;

	findOneByLDAPId(id: string, attribute?: any): Promise<IUser | null>;

	findLDAPUsers(options?: FindOptions<IUser>): FindCursor<IUser>;

	findConnectedLDAPUsers(options?: FindOptions<IUser>): FindCursor<IUser>;

	isUserInRole(userId: IUser['_id'], roleId: IRole['_id']): Promise<boolean>;

	getDistinctFederationDomains(): Promise<any>;

	getNextLeastBusyAgent(
		department: ILivechatDepartment['_id'],
		ignoreAgentId: ILivechatAgent['_id'],
	): Promise<{
		agentId: ILivechatAgent['_id'];
		username: ILivechatAgent['username'];
		lastRoutingTime: ILivechatAgent['lastRoutingTime'];
		departments: ILivechatDepartment['_id'][];
		count: number;
	} | null>;

	getLastAvailableAgentRouted(
		department: ILivechatDepartment['_id'],
		ignoreAgentId: ILivechatAgent['_id'],
	): Promise<{
		agentId: ILivechatAgent['_id'];
		username: ILivechatAgent['username'];
		lastRoutingTime: ILivechatAgent['lastRoutingTime'];
		departments: ILivechatDepartment['_id'][];
	} | null>;

	setLastRoutingTime(userId: IUser['_id']): Promise<WithId<IUser> | null>;

	setLivechatStatusIf(
		userId: ILivechatAgent['_id'],
		status: ILivechatAgentStatus,
		conditions: any,
		extraFields: any,
	): Promise<Document | UpdateResult>;

	getAgentAndAmountOngoingChats(userId: IUser['_id']): Promise<{
		'agentId': ILivechatAgent['_id'];
		'username': ILivechatAgent['username'];
		'lastAssignTime': ILivechatAgent['lastAssignTime'];
		'lastRoutingTime': ILivechatAgent['lastRoutingTime'];
		'queueInfo.chats': number;
	} | null>;

	findAllResumeTokensByUserId(userId: IUser['_id']): Promise<{ _id: IUser['_id']; tokens: string[] } | null>;

	findActiveByUsernameOrNameRegexWithExceptionsAndConditions(
		termRegex: RegExp,
		exceptions?: string[] | string,
		conditions?: string[],
		options?: FindOptions<IUser>,
	): FindCursor<IUser>;

	countAllAgentsStatus({ departmentId }: { departmentId?: ILivechatDepartment['_id'] }): any;

	getTotalOfRegisteredUsersByDate({ start, end, options }: { start: Date; end: Date; options?: PaginatedRequest }): Promise<
		{
			date: string;
			users: number;
			type: 'users';
		}[]
	>;

	getUserLanguages(): any;

	updateStatusText(_id: any, statusText: any): any;

	updateStatusByAppId(appId: any, status: any): any;

	openAgentsBusinessHoursByBusinessHourId(businessHourIds: any): any;

	openAgentBusinessHoursByBusinessHourIdsAndAgentId(businessHourIds: any, agentId: any): any;

	addBusinessHourByAgentIds(agentIds: any, businessHourId: any): any;

	removeBusinessHourByAgentIds(agentIds: any, businessHourId: any): any;

	openBusinessHourToAgentsWithoutDepartment(agentIdsWithDepartment: ILivechatDepartment['_id'], businessHourId: any): any;

	closeBusinessHourToAgentsWithoutDepartment(
		agentIdsWithDepartment: ILivechatAgent['_id'][],
		businessHourId: ILivechatBusinessHour['_id'],
	): any;

	closeAgentsBusinessHoursByBusinessHourIds(businessHourIds: any): any;

	updateLivechatStatusBasedOnBusinessHours(userIds?: any): any;

	setLivechatStatusActiveBasedOnBusinessHours(userId: IUser['_id']): any;

	isAgentWithinBusinessHours(agentId: any): Promise<any>;

	removeBusinessHoursFromAllUsers(): any;

	resetTOTPById(userId: IUser['_id']): any;

	unsetLoginTokens(userId: IUser['_id']): any;

	removeNonPATLoginTokensExcept(userId: IUser['_id'], authToken: any): any;

	removeRoomsByRoomIdsAndUserId(rids: any, userId: IUser['_id']): any;

	removeRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][]): Promise<UpdateResult>;

	isUserInRoleScope(uid: IUser['_id']): Promise<boolean>;

	addBannerById(_id: any, banner: any): any;

	findOneByAgentUsername(username: any, options: any): any;

	findOneByExtension(extension: any, options?: any): any;

	findByExtensions(extensions: string[], options?: FindOptions<ILivechatAgent>): FindCursor<IUser>;

	getVoipExtensionByUserId(userId: IUser['_id'], options: any): any;

	setExtension(userId: IUser['_id'], extension: any): any;

	unsetExtension(userId: IUser['_id']): any;

	getAvailableAgentsIncludingExt(includeExt: any, text: any, options: any): FindPaginated<FindCursor<ILivechatAgent>>;

	findActiveUsersTOTPEnable(options: any): any;

	findActiveUsersEmail2faEnable(options: any): any;

	findActiveByIdsOrUsernames(userIds: IUser['_id'][], options?: FindOptions<IUser>): FindCursor<IUser>;

	setAsFederated(userId: string): any;
}
