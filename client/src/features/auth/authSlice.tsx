import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { User } from '../../app/services/auth';
import type { RootState } from '../../app/store';

type AuthState = {
	user: User | null;
	token: User | null;
};

const slice = createSlice({
	name: 'auth',
	initialState: { user: null } as AuthState,
	reducers: {
		setCredentials: (state, { payload } : PayloadAction<User>) => {
			state.user = payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
