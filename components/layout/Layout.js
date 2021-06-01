import Head from 'next/head';

import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => (
    <>
        <Head>
            <title>Turbo</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />

            <link rel="manifest" href="/manifest.webmanifest" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />

            <meta name="theme-color" content="#1400ff" />

            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
        </Head>

        <Header />

        <main role="main">{children}</main>

        <Footer />
    </>
);
