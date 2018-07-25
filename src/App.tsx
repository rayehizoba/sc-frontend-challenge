import {
  Layout,
  Menu,
} from 'antd';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import './App.css';
import ContactsPage from './ContactsPage';
import HelpPage from './HelpPage';
import HomePage from './HomePage';
import SearchPage from './SearchPage';

const {
  Content,
  Footer,
  Header,
} = Layout;

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Layout>

          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/contacts">Contacts</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/search">Search</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/help">Help</Link></Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 30, minHeight: '75vh' }}>
              <Route exact={true} path="/" component={HomePage}/>
              <Route path="/contacts" component={ContactsPage}/>
              <Route path="/search" component={SearchPage}/>
              <Route path="/help" component={HelpPage}/>
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Customer Management System &copy;2018 Fancy Broker Agency
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
