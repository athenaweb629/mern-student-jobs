import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

export interface User {
	firstName: string;
	lastName: string;
}

export interface UserResponse {
	user: User;
	token: string;
	message: string,
	success: boolean;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
		prepareHeaders: (headers, { getState }) => {
			const { token } = (getState() as RootState).auth;

			if (token) headers.set('authorization', `Bearer ${token}`);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => 'protected',
		}),
	}),
});

export const { useLoginMutation, useProtectedMutation } = api;
