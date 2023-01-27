// @refresh reload
import { Suspense } from 'solid-js';
import { Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from 'solid-start';
import { Toaster } from 'solid-toast';

import { Spinner } from './components/lib/spinner';

import './root.css';

const errorBoundaryFallback = (err: Error) => {
  // eslint-disable-next-line no-console
  console.error(err);

  return <>An error occurred...</>;
};

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Solid Quality</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
      </Head>
      <Body>
        <Toaster position="top-right" />
        <ErrorBoundary fallback={errorBoundaryFallback}>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}

// if (import.meta.env.PROD && !isServer && "serviceWorker" in navigator) {
//   // Use the window load event to keep the page load performant
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register(`/sw.js`);
//   });
// }
