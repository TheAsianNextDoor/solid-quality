import { Form } from 'solid-start/data/Form';

import { AppTitle } from 'components/app-title';
import { Button } from 'components/lib/button';
import { TextField } from 'components/lib/text-field';

export default function Login() {
  return (
    <>
      <AppTitle title="Login" />
      <div>
        <main class="flex items-center justify-center h-screen">
          <div class="w-96 space-y-4">
            <Form class=" bg-surface p-6 rounded-3xl flex flex-col gap-3">
              <h1 class="pb-8 text-2xl text-center">Sign In</h1>
              <TextField name="username" label="User" placeholder="What is your name?" />
              <TextField name="password" label="Password" placeholder="What is your password?" />
              <Button variant="contained" class="w-full">
                Log in
              </Button>
            </Form>
          </div>
        </main>
      </div>
    </>
  );
}
