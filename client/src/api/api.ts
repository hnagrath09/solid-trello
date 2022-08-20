/* tslint:disable */
/* eslint-disable */
/**
 * Solid Trello API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CreateUserDto
 */
export interface CreateUserDto {
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    name: string;
}
/**
 * 
 * @export
 * @interface CreateUserRes
 */
export interface CreateUserRes {
    /**
     * JWT token
     * @type {string}
     * @memberof CreateUserRes
     */
    token: string;
    /**
     * 
     * @type {User}
     * @memberof CreateUserRes
     */
    user: User;
}
/**
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof InlineObject
     */
    listOrder: number;
}
/**
 * 
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject1
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof InlineObject1
     */
    taskOrder: number;
    /**
     * 
     * @type {string}
     * @memberof InlineObject1
     */
    listId: string;
}
/**
 * 
 * @export
 * @interface List
 */
export interface List {
    /**
     * 
     * @type {string}
     * @memberof List
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof List
     */
    title: string;
    /**
     * 
     * @type {Array<Task>}
     * @memberof List
     */
    tasks: Array<Task>;
    /**
     * Order of the list in the board
     * @type {number}
     * @memberof List
     */
    listOrder: number;
}
/**
 * 
 * @export
 * @interface LoginDto
 */
export interface LoginDto {
    /**
     * 
     * @type {string}
     * @memberof LoginDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof LoginDto
     */
    password: string;
}
/**
 * 
 * @export
 * @interface ReorderListsForm
 */
export interface ReorderListsForm {
    /**
     * 
     * @type {string}
     * @memberof ReorderListsForm
     */
    listId: string;
    /**
     * 
     * @type {number}
     * @memberof ReorderListsForm
     */
    listOrder: number;
}
/**
 * 
 * @export
 * @interface ReorderTasksForm
 */
export interface ReorderTasksForm {
    /**
     * 
     * @type {string}
     * @memberof ReorderTasksForm
     */
    taskId: string;
    /**
     * Order of this task in the list
     * @type {number}
     * @memberof ReorderTasksForm
     */
    taskOrder: number;
}
/**
 * 
 * @export
 * @interface Task
 */
export interface Task {
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    title: string;
    /**
     * List id associated with this task
     * @type {string}
     * @memberof Task
     */
    listId: string;
    /**
     * Order of this task in the list
     * @type {number}
     * @memberof Task
     */
    taskOrder: number;
}
/**
 * 
 * @export
 * @interface UpdateListForm
 */
export interface UpdateListForm {
    /**
     * 
     * @type {string}
     * @memberof UpdateListForm
     */
    title?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateListForm
     */
    listOrder?: number;
}
/**
 * 
 * @export
 * @interface UpdateTaskForm
 */
export interface UpdateTaskForm {
    /**
     * 
     * @type {string}
     * @memberof UpdateTaskForm
     */
    title?: string;
    /**
     * Order of this task in the list
     * @type {number}
     * @memberof UpdateTaskForm
     */
    taskOrder?: number;
    /**
     * List id associated with this task
     * @type {string}
     * @memberof UpdateTaskForm
     */
    listId?: string;
}
/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {string}
     * @memberof User
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    name: string;
}

/**
 * ApplicationApi - axios parameter creator
 * @export
 */
export const ApplicationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a list
         * @param {InlineObject} inlineObject 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createList: async (inlineObject: InlineObject, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'inlineObject' is not null or undefined
            assertParamExists('createList', 'inlineObject', inlineObject)
            const localVarPath = `/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(inlineObject, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Create a task
         * @param {InlineObject1} inlineObject1 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTask: async (inlineObject1: InlineObject1, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'inlineObject1' is not null or undefined
            assertParamExists('createTask', 'inlineObject1', inlineObject1)
            const localVarPath = `/task`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(inlineObject1, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Create a new user
         * @param {CreateUserDto} createUserDto User object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (createUserDto: CreateUserDto, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'createUserDto' is not null or undefined
            assertParamExists('createUser', 'createUserDto', createUserDto)
            const localVarPath = `/signup`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createUserDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get all lists
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllLists: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/lists`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Validates token and returns user details if successful
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMe: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Login a user
         * @param {LoginDto} loginDto Login credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (loginDto: LoginDto, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginDto' is not null or undefined
            assertParamExists('login', 'loginDto', loginDto)
            const localVarPath = `/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Reorder tasks
         * @param {Array<ReorderListsForm>} reorderListsForm Tasks to reorder
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reorderLists: async (reorderListsForm: Array<ReorderListsForm>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'reorderListsForm' is not null or undefined
            assertParamExists('reorderLists', 'reorderListsForm', reorderListsForm)
            const localVarPath = `/lists/reorder`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(reorderListsForm, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Reorder tasks
         * @param {Array<ReorderTasksForm>} reorderTasksForm Tasks to reorder
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reorderTasks: async (reorderTasksForm: Array<ReorderTasksForm>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'reorderTasksForm' is not null or undefined
            assertParamExists('reorderTasks', 'reorderTasksForm', reorderTasksForm)
            const localVarPath = `/tasks/reorder`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(reorderTasksForm, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update a list
         * @param {string} id 
         * @param {UpdateListForm} updateListForm List to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateList: async (id: string, updateListForm: UpdateListForm, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateList', 'id', id)
            // verify required parameter 'updateListForm' is not null or undefined
            assertParamExists('updateList', 'updateListForm', updateListForm)
            const localVarPath = `/list/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateListForm, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update a task
         * @param {string} id 
         * @param {UpdateTaskForm} updateTaskForm Task to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTask: async (id: string, updateTaskForm: UpdateTaskForm, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateTask', 'id', id)
            // verify required parameter 'updateTaskForm' is not null or undefined
            assertParamExists('updateTask', 'updateTaskForm', updateTaskForm)
            const localVarPath = `/task/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateTaskForm, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ApplicationApi - functional programming interface
 * @export
 */
export const ApplicationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ApplicationApiAxiosParamCreator(configuration)
    return {
        /**
         * Create a list
         * @param {InlineObject} inlineObject 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createList(inlineObject: InlineObject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<List>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createList(inlineObject, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Create a task
         * @param {InlineObject1} inlineObject1 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTask(inlineObject1: InlineObject1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Task>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createTask(inlineObject1, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Create a new user
         * @param {CreateUserDto} createUserDto User object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(createUserDto: CreateUserDto, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateUserRes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(createUserDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all lists
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllLists(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<List>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllLists(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Validates token and returns user details if successful
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMe(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMe(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Login a user
         * @param {LoginDto} loginDto Login credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(loginDto: LoginDto, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateUserRes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Reorder tasks
         * @param {Array<ReorderListsForm>} reorderListsForm Tasks to reorder
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reorderLists(reorderListsForm: Array<ReorderListsForm>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<List>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reorderLists(reorderListsForm, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Reorder tasks
         * @param {Array<ReorderTasksForm>} reorderTasksForm Tasks to reorder
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reorderTasks(reorderTasksForm: Array<ReorderTasksForm>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Task>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reorderTasks(reorderTasksForm, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update a list
         * @param {string} id 
         * @param {UpdateListForm} updateListForm List to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateList(id: string, updateListForm: UpdateListForm, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<List>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateList(id, updateListForm, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update a task
         * @param {string} id 
         * @param {UpdateTaskForm} updateTaskForm Task to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateTask(id: string, updateTaskForm: UpdateTaskForm, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Task>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateTask(id, updateTaskForm, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ApplicationApi - factory interface
 * @export
 */
export const ApplicationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ApplicationApiFp(configuration)
    return {
        /**
         * Create a list
         * @param {InlineObject} inlineObject 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createList(inlineObject: InlineObject, options?: any): AxiosPromise<List> {
            return localVarFp.createList(inlineObject, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a task
         * @param {InlineObject1} inlineObject1 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTask(inlineObject1: InlineObject1, options?: any): AxiosPromise<Task> {
            return localVarFp.createTask(inlineObject1, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a new user
         * @param {CreateUserDto} createUserDto User object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(createUserDto: CreateUserDto, options?: any): AxiosPromise<CreateUserRes> {
            return localVarFp.createUser(createUserDto, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all lists
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllLists(options?: any): AxiosPromise<Array<List>> {
            return localVarFp.getAllLists(options).then((request) => request(axios, basePath));
        },
        /**
         * Validates token and returns user details if successful
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMe(options?: any): AxiosPromise<User> {
            return localVarFp.getMe(options).then((request) => request(axios, basePath));
        },
        /**
         * Login a user
         * @param {LoginDto} loginDto Login credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(loginDto: LoginDto, options?: any): AxiosPromise<CreateUserRes> {
            return localVarFp.login(loginDto, options).then((request) => request(axios, basePath));
        },
        /**
         * Reorder tasks
         * @param {Array<ReorderListsForm>} reorderListsForm Tasks to reorder
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reorderLists(reorderListsForm: Array<ReorderListsForm>, options?: any): AxiosPromise<List> {
            return localVarFp.reorderLists(reorderListsForm, options).then((request) => request(axios, basePath));
        },
        /**
         * Reorder tasks
         * @param {Array<ReorderTasksForm>} reorderTasksForm Tasks to reorder
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reorderTasks(reorderTasksForm: Array<ReorderTasksForm>, options?: any): AxiosPromise<Task> {
            return localVarFp.reorderTasks(reorderTasksForm, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a list
         * @param {string} id 
         * @param {UpdateListForm} updateListForm List to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateList(id: string, updateListForm: UpdateListForm, options?: any): AxiosPromise<List> {
            return localVarFp.updateList(id, updateListForm, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a task
         * @param {string} id 
         * @param {UpdateTaskForm} updateTaskForm Task to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTask(id: string, updateTaskForm: UpdateTaskForm, options?: any): AxiosPromise<Task> {
            return localVarFp.updateTask(id, updateTaskForm, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ApplicationApi - object-oriented interface
 * @export
 * @class ApplicationApi
 * @extends {BaseAPI}
 */
export class ApplicationApi extends BaseAPI {
    /**
     * Create a list
     * @param {InlineObject} inlineObject 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public createList(inlineObject: InlineObject, options?: any) {
        return ApplicationApiFp(this.configuration).createList(inlineObject, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create a task
     * @param {InlineObject1} inlineObject1 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public createTask(inlineObject1: InlineObject1, options?: any) {
        return ApplicationApiFp(this.configuration).createTask(inlineObject1, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create a new user
     * @param {CreateUserDto} createUserDto User object
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public createUser(createUserDto: CreateUserDto, options?: any) {
        return ApplicationApiFp(this.configuration).createUser(createUserDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all lists
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public getAllLists(options?: any) {
        return ApplicationApiFp(this.configuration).getAllLists(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Validates token and returns user details if successful
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public getMe(options?: any) {
        return ApplicationApiFp(this.configuration).getMe(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Login a user
     * @param {LoginDto} loginDto Login credentials
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public login(loginDto: LoginDto, options?: any) {
        return ApplicationApiFp(this.configuration).login(loginDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Reorder tasks
     * @param {Array<ReorderListsForm>} reorderListsForm Tasks to reorder
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public reorderLists(reorderListsForm: Array<ReorderListsForm>, options?: any) {
        return ApplicationApiFp(this.configuration).reorderLists(reorderListsForm, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Reorder tasks
     * @param {Array<ReorderTasksForm>} reorderTasksForm Tasks to reorder
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public reorderTasks(reorderTasksForm: Array<ReorderTasksForm>, options?: any) {
        return ApplicationApiFp(this.configuration).reorderTasks(reorderTasksForm, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update a list
     * @param {string} id 
     * @param {UpdateListForm} updateListForm List to update
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public updateList(id: string, updateListForm: UpdateListForm, options?: any) {
        return ApplicationApiFp(this.configuration).updateList(id, updateListForm, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update a task
     * @param {string} id 
     * @param {UpdateTaskForm} updateTaskForm Task to update
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplicationApi
     */
    public updateTask(id: string, updateTaskForm: UpdateTaskForm, options?: any) {
        return ApplicationApiFp(this.configuration).updateTask(id, updateTaskForm, options).then((request) => request(this.axios, this.basePath));
    }
}


