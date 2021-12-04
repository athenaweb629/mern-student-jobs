import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import path from '../../constants/path';
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

interface Post {
	title: string,
	description: string,
	level: string,
	availability: string,
	author: string
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const { user } = (getState() as RootState).auth;

			if (user?.token) headers.set('authorization', `Bearer ${user?.token}`);

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
			query: () => path.api.AUTHORIZED_ACTION,
		}),
		createPost: builder.mutation({
			query: (body) => ({
				url: path.api.POSTS,
				method: 'POST',
				body,
			}),
		}),
		getPosts: builder.query<Post[], void>({
			query: () => path.api.POSTS,
			transformResponse: (rawResult: { posts: Post[] }) => rawResult.posts
		}),
		getPostById: builder.query<Post, string>({
			query: (id) => `posts/${id}`,
		}),
	}),
});

export const {
	useLoginMutation,
	useProtectedMutation,
	useRegisterMutation,
	useCreatePostMutation,
	useGetPostsQuery,
	useGetPostByIdQuery,
} = api;
