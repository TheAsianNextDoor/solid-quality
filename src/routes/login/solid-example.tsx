// /* eslint-disable */
// // @ts-nocheck

// import { getSession } from '@auth/solid-start';
// import { Show } from 'solid-js';
// import { useRouteData, useParams } from 'solid-start';
// import { FormError } from 'solid-start/data/Form';
// import { createServerData$, createServerAction$ } from 'solid-start/server';

// import { authOpts } from '~/routes/api/auth/[...solidauth]';
// import { prisma } from '~/server/prisma/client';
// import { register, login, createUserSession } from '~/server/prisma/session/session';
// // import { trpcClient } from '~/utils/trpc';

// export const routeData = () => {
//   return createServerData$(async (_, { request }) => {
//     return getSession(request, authOpts);
//   });
// };

// function validateEmail(username: unknown) {
//   if (typeof username !== 'string' || username.length < 3) {
//     return 'Usernames must be at least 3 characters long';
//   }
// }

// function validatePassword(password: unknown) {
//   if (typeof password !== 'string' || password.length < 6) {
//     return 'Passwords must be at least 6 characters long';
//   }
// }

// export default function Login() {
//   const session = useRouteData<typeof routeData>();

//   const params = useParams();

//   const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
//     const loginType = form.get('loginType');
//     const email = form.get('email');
//     const firstName = form.get('firstName');
//     const lastName = form.get('lastName');
//     const password = form.get('password');
//     const redirectTo = form.get('redirectTo') || '/';
//     if (
//       typeof loginType !== 'string' ||
//       typeof email !== 'string' ||
//       typeof password !== 'string' ||
//       typeof redirectTo !== 'string'
//     ) {
//       throw new FormError('Form not submitted correctly.');
//     }

//     const fields = { loginType, email, password };
//     const fieldErrors = {
//       email: validateEmail(email),
//       password: validatePassword(password),
//     };

//     if (Object.values(fieldErrors).some(Boolean)) {
//       throw new FormError('Fields invalid', { fieldErrors, fields });
//     }

//     switch (loginType) {
//       case 'login': {
//         const user = await login({ email, password });
//         if (!user) {
//           throw new FormError('email/Password combination is incorrect', {
//             fields,
//           });
//         }

//         return createUserSession(`${user.id}`, redirectTo);
//       }
//       case 'register': {
//         // const userExists = await db.user.findUnique({ where: { email } });
//         const userExists = await prisma.user.findUnique({ where: { email } });
//         if (userExists) {
//           throw new FormError(`User with email ${email} already exists`, {
//             fields,
//           });
//         }
//         const user = await register({ email, firstName, lastName, password });
//         if (!user) {
//           throw new FormError('Something went wrong trying to create a new user.', {
//             fields,
//           });
//         }

//         return createUserSession(`${user.id}`, redirectTo);
//       }
//       default: {
//         throw new FormError('Login type invalid', { fields });
//       }
//     }
//   });

//   return (
//     <>
//       <main>
//         <h1>Login</h1>
//         <Form>
//           <input type="hidden" name="redirectTo" value={params.redirectTo ?? '/'} />
//           <fieldset>
//             <legend>Login or Register?</legend>
//             <label>
//               <input type="radio" name="loginType" value="login" checked={true} /> Login
//             </label>
//             <label>
//               <input type="radio" name="loginType" value="register" /> Register
//             </label>
//           </fieldset>
//           <div>
//             <label for="email-input">email</label>
//             <input name="email" placeholder="kody" />
//           </div>
//           <Show when={loggingIn.error?.fieldErrors?.email}>
//             <p role="alert">{loggingIn.error.fieldErrors.email}</p>
//           </Show>
//           <div>
//             <label for="firstName-input">firstName</label>
//             <input name="firstName" placeholder="kody" />
//           </div>
//           <Show when={loggingIn.error?.fieldErrors?.firstName}>
//             <p role="alert">{loggingIn.error.fieldErrors.firstName}</p>
//           </Show>
//           <div>
//             <label for="lastName-input">lastName</label>
//             <input name="lastName" placeholder="kody" />
//           </div>
//           <Show when={loggingIn.error?.fieldErrors?.lastName}>
//             <p role="alert">{loggingIn.error.fieldErrors.lastName}</p>
//           </Show>
//           <div>
//             <label for="password-input">Password</label>
//             <input name="password" type="password" placeholder="twixrox" />
//           </div>
//           <Show when={loggingIn.error?.fieldErrors?.password}>
//             <p role="alert">{loggingIn.error.fieldErrors.password}</p>
//           </Show>
//           <Show when={loggingIn.error}>
//             <p role="alert" id="error-message">
//               {loggingIn.error.message}
//             </p>
//           </Show>
//           <button type="submit">{'Login'}</button>
//         </Form>
//       </main>
//       {/* <Title>Create JD App</Title>
//       <div>
//         <Switch fallback={<pre class="font-bold text-2xl text-gray-500">{JSON.stringify(res.data, null, 2)}</pre>}>
//           <Match when={res.isLoading}>
//             <div class="font-bold text-2xl text-gray-500">{res.isFetching ? 'Loading' : 'Not Logged In'}</div>
//           </Match>
//         </Switch>
//         <Switch
//           fallback={
//             <button
//               onClick={() => signIn('github')}
//               class="bg-purple-700 mx-3 my-3 rounded-lg w-56 p-2.5 text-white font-bold flex items-center justify-center"
//             >
//               Login
//             </button>
//           }
//         >
//           <Match when={session.loading}>
//             <h1>Loading session</h1>
//           </Match>
//           <Match when={session()}>
//             <button
//               onClick={() => signOut()}
//               class="bg-purple-700 mx-3 my-3 rounded-lg w-56 p-2.5 text-white font-bold flex items-center justify-center"
//             >
//               Logout
//             </button>
//           </Match>
//         </Switch>
//       </div> */}
//     </>
//   );
// }
