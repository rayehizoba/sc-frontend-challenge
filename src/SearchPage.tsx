import { Card, Checkbox, Input, List, Pagination } from 'antd';
import { chunk } from 'lodash';
import * as React from 'react';
import data from './data';
import { Contact } from './models';
import { RenderListItem, searchHandler } from './shared';

const searchFilterOptions = [
  { label: "First name", value: "name.first" },
  { label: "Last name", value: "name.last" },
  { label: "Address", value: "address" },
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Company", value: "company" },
];
const defaultFilterOptions = searchFilterOptions.map(({value}) => value);

interface State {
  contacts: Contact[][];
  perPageCount: number;
  currentPage: number;
  filterOptions: string[];
  searchResults: Contact[];
}

class Search extends React.Component<{}, State> {
  public state = {
    perPageCount: 10, 
    contacts: [], 
    currentPage: 0, 
    filterOptions: defaultFilterOptions,
    searchResults: []
  };
  
  public render() {
    const {contacts, currentPage, perPageCount, searchResults} = this.state;

    return (
      <div>
        <Card>
          <Input.Search
            placeholder="Input search text"
            style={{ width: '40%' }}
            enterButton={true}
            onSearch={this.onSearch}
          />
          <Checkbox.Group
            options={searchFilterOptions}
            defaultValue={defaultFilterOptions}
            onChange={this.onSearchFiltersChange}
            style={{ width: '60%', paddingLeft: 30 }}
          />
        </Card>
        <List
          dataSource={contacts[currentPage]}
          renderItem={RenderListItem}
        />
        <div style={{marginTop: 30}} >
          <Pagination
            current={currentPage + 1}
            total={searchResults.length}
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

  private onSearchFiltersChange = (checkedValues: string[]) => {
    this.setState({filterOptions: checkedValues});
  }

  private onSearch = (searchTerm: string) => {
    if (!searchTerm.length) { return;}
    const {filterOptions, perPageCount} = this.state;
    const searchResults = searchHandler(data, searchTerm, filterOptions);
    const contacts = chunk(searchResults, perPageCount) as Contact[][];
    this.setState({contacts, searchResults});
  }
}

export default Search;
