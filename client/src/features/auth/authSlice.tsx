import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { User } from '../../app/services/auth';
import type { RootState } from '../../app/store';

type AuthState = {
	user: User | null;
	token: string | null;
};

const slice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null } as AuthState,
	reducers: {
		setCredentials: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
