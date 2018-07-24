import { Avatar, List, Pagination } from 'antd';
import { chunk } from 'lodash';
import * as React from 'react';
import data from './data';
import { Contact } from './models';

interface State {
  contacts: Contact[][];
  perPageCount: number;
  currentPage: number;
}

class Contacts extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    const perPageCount = 10;
    const contacts = chunk(data, perPageCount) as Contact[][];
    this.state = {perPageCount, contacts, currentPage: 0};
  }
  
  public render() {
    const {contacts, currentPage, perPageCount} = this.state;
    return (
      <div>
        <List
          dataSource={contacts[currentPage]}
          renderItem={RenderListItem}
        />
        <div style={{marginTop: 30}} >
          <Pagination
            current={currentPage + 1}
            total={data.length}
            onChange={this.onChange}
            showTotal={this.paginationTotal}
            pageSize={perPageCount}
          />
        </div>
      </div>
    )
  }

  private onChange = (page: number) => {
    this.setState({
      currentPage: page - 1,
    });
  }

  private paginationTotal = (total: number, range: number[]) => (
    `${range[0]}-${range[1]} of ${total} items`
  )
}

export default Contacts;

const RenderListItem = ({picture, name, email}: Contact) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar src={picture} />}
      title={`${name.first} ${name.last}`}
      description={email}
    />
  </List.Item>
)
