import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './utils/polling'

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model 注册全局model
app.model(require('./models/app').default);
app.model(require('./models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app;