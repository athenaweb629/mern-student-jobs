import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

export interface User {
	email: string,
	name: string,
	token: string,
	role: 'student' | 'company',
}

export interface LoginRequest {
	username: string;
	password: string;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		prepareHeaders: (headers, { getState }) => {
			const { user } = (getState() as RootState).auth;

			if (user?.token) headers.set('authorization', `Bearer ${user?.token}`);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginRequest>({
			query: (credentials) => ({ url: '/user/login', method: 'POST', body: credentials }),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => '/user/authorizedAction',
		}),
	}),
});

export const { useLoginMutation, useProtectedMutation } = api;
