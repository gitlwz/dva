import React from "react";
import { Layout } from 'antd';
import { connect } from 'dva';
import Header from '../components/header';
import ThemeSet from './set/setTheme';
import Footer from '../components/footer';
import styles from "./Layout.less";

class LayoutPage extends React.Component {
    componentWillMount() {
        this.language = localStorage.getItem("language") || "China"
    }
    componentDidMount() {
        // this.props.getInstrumentIds();
        // this.props.findAllExchangeRateUse();
    }

    getBashRedirect = () => {
        const urlParams = new URL(window.location.href);
        const redirect = urlParams.hash.split("#")[1];
        // Remove the parameters in the url
        if (redirect) {
        } else {
            return '/home';
        }
        return redirect;
    }

    render() {
        const bashRedirect = this.getBashRedirect();
        const app = this.props.app;
        return (
            <Layout>
                <Header />
                <ThemeSet />
                <Layout.Content style={{ minHeight: 700 ,padding:0}}>
                    {this.props.children}
                </Layout.Content>
                
                <Layout.Footer style={{ padding: 0, margin: 0 }}>
                    <Footer />
                </Layout.Footer>
            </Layout>
        )
    }
}

export default connect((state, props) => {
    return {
        visible: state.app.visible,
        theme: state.app.theme,
        props
    }
}, (dispatch, props) => {
    return {
        save: (parme) => {
            dispatch({
                type: 'app/save',
                payload: {
                    ...parme
                }
            })
        },
        findAllExchangeRateUse: () => {
            dispatch({
                type: 'other/findAllExchangeRateUse'
            })
        },
        getInstrumentIds: () => {
            dispatch({
                type: 'kine/getInstrumentIds'
            })
        },
        dispatch,
        props
    }
})(LayoutPage)
