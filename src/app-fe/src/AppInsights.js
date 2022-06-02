import React from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
var ai = new ApplicationInsights({
    config: {
        connectionString: 'InstrumentationKey=e91a1564-c9b2-4860-80ac-948b51e08c12;IngestionEndpoint=https://centralus-2.in.applicationinsights.azure.com/;LiveEndpoint=https://centralus.livediagnostics.monitor.azure.com/',
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory }
        }
    }
});
ai.loadAppInsights();

export default (Component) => withAITracking(reactPlugin, Component);
export const appInsights = ai.appInsights;