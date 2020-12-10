import React from "react";
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";
import Layout from './layout'
import routeConfig from './Route'
import Login from '@/pages/Login'
import Register from "@/pages/Register";

export default function App() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" exact render={props => (<Login {...props} />)}/>
                <Route path="/register" exact render={props => (<Register {...props} />)}/>
                <Layout>
                    {
                        routeConfig.map(item => <Route key={item.path}
                                                       exact
                                                       path={item.path}
                                                       render={props => (<item.component  {...props} />)}/>)
                    }
                </Layout>
            </Switch>
        </HashRouter>
    );
}
