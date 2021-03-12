import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import SiteTheme from '../util/theme';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={SiteTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
