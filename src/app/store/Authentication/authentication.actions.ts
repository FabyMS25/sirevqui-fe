import { createAction, props } from '@ngrx/store';

// Register action
export const Register = createAction('[Authentication] Register', props<{ email: string, first_name: string, password: string }>());
export const RegisterSuccess = createAction('[Authentication] Register Success', props<{ user: any }>());
export const RegisterFailure = createAction('[Authentication] Register Failure', props<{ error: string }>());

// login action
export const login = createAction('[Authentication] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Authentication] Login Failure', props<{ error: string }>());

// logout action
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');


