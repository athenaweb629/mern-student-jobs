import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import path from '../../constants/path';
import { isAuthTokenExpired } from '../../utils/isAuthTokenExpired';
import { RootState } from '../store';

export interface User {
	email: string,
	name: string,
	token: string,
	role: 'student' | 'company',
}

export interface LoginRequest {
	email: string;
	password: string;
	name?:string;
	firstName?:string;
	lastName?:string;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			let { user } = (getState() as RootState).auth;

			if (user?.token && !isAuthTokenExpired) {
				headers.set('authorization', `Bearer ${user?.token}`);
			} else {
				user = null;
				window.location.href = '/login';
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginRequest>({
			query: (credentials) => ({ url: path.api.LOGIN, method: 'POST', body: credentials, }),
		}),
		register: builder.mutation<User, LoginRequest>({
			query: (body) => ({
				url: path.api.REGISTER,
				method: 'POST',
				body,
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => '/user/authorizedAction',
		}),
	}),
});

export const { useLoginMutation, useProtectedMutation, useRegisterMutation } = api;
