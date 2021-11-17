import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

export interface User {
	firstName: string;
	lastName: string;
	success: boolean;
}

export interface Email {
	email: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface ResetPasswordRequest {
	email: string;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		prepareHeaders: (headers, { getState }) => {
			const { token } = (getState() as RootState).auth;

			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginRequest>({
			query: (credentials) => ({
				url: '/user/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		resetPassword: builder.mutation<Email, ResetPasswordRequest>({
			query: (credentials) => ({
				url: '/user/resetPassword',
				method: 'PATCH',
				body: credentials,
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => 'protected',
		}),
	}),
});

export const { useLoginMutation, useProtectedMutation } = api;
