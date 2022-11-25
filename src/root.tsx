// @refresh reload
import { Routes } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { FileRoutes, Head, Link, Meta, Scripts, Title } from 'solid-start';
import { ErrorBoundary } from 'solid-start/error-boundary';

import './root.css';

export default function Root() {
  return (
    <html lang="en">
      <Head>
        <Link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
        <Title>Solid Quality</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
