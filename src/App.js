import React from "react";
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";
import Layout from './layout'
import routeConfig from './Route'

export default function App() {
    return (
        <HashRouter>
            <Layout>
                <Switch>
                    {
                        routeConfig.map(item => <Route key={item.path}
                                                       exact
                                                       path={item.path}
                                                       render={props => (<item.component  {...props} />)}/>)
                    }
                </Switch>
            </Layout>
        </HashRouter>
    );
}
