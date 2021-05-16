import Head from 'next/head';

import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => (
    <>
        <Head>
            <title>Turbo</title>
        </Head>

        <Header />

        <main role="main">{children}</main>

        <Footer />
    </>
);
