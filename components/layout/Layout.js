import Head from 'next/head';

import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => (
    <>
        <Head>
            <title>Turbo</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
        </Head>

        <Header />

        <main role="main">{children}</main>

        <Footer />
    </>
);
