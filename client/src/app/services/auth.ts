import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import path from '../../constants/path';
import { RootState } from '../store';

export interface User {
	firstName:string,
  lastName:string;
	name:string;
	success: boolean;
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
				url: path.api.LOGIN,
				method: 'POST',
				body: credentials,
			}),
		}),
		register: builder.mutation<User, LoginRequest>({
			query: (body) => ({
				url: path.api.REGISTER,
				method: 'POST',
				body,
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => 'protected',
		}),
	}),
});

export const { useLoginMutation, useProtectedMutation, useRegisterMutation } = api;
