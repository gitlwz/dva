import React from "react";
import { connect } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import app from '../../index'
import UserRouter from '../../utils/UserRouter';
import styles from './UserLayout.less';
/**
 * 登录注册
 */
class UserLayout extends React.Component {

    componentDidMount() {

    }

    render() {
        const { radioChange, handleOk } = this.props;
        return <div className={styles.root}>
            <Switch>
                {
                    UserRouter.map(({ path, ...dynamics }, key) => (
                        <Route
                            key={key}
                            exact
                            path={path}
                            component={dynamic({
                                app,
                                ...dynamics, // (models and) component
                            })}
                        />
                    ))
                }
                }
            </Switch>
        </div>
    }
}

export default connect((state, props) => {
    return {

        props
    }
}, (dispatch, props) => {
    return {

    }

})(UserLayout)