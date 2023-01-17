// @ts-nocheck

import { redirect } from 'solid-start/server';
import { createCookieSessionStorage } from 'solid-start/session';

import { UserModel } from '~/server/db/models/user-model';

type LoginForm = {
  email: string;
  password: string;
};

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ['hello'],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  const session = storage.getSession(request.headers.get('Cookie'));

  return session;
}

export async function register({ email, password, firstName, lastName }: LoginForm) {
  const name = `${firstName} ${lastName}`;

  return UserModel.create({
    data: { email, password, firstName, lastName, name },
  });
}

export async function login({ email, password }: LoginForm) {
  const user = await UserModel.findUnique({ where: { email } });
  if (!user) return null;
  const isCorrectPassword = password === user.password;
  if (!isCorrectPassword) return null;
  return user;
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') {
    return null;
  }

  try {
    const user = await UserModel.findUnique({ where: { id: Number(userId) } });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}
