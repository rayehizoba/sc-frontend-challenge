import { Card, Checkbox, Input, List, Pagination } from 'antd';
import { chunk } from 'lodash';
import * as React from 'react';
import data from './data';
import { Contact } from './models';
import { RenderListItem } from './shared';

interface State {
  contacts: Contact[][];
  perPageCount: number;
  currentPage: number;
  filterOptions: string[];
  searchResults: Contact[];
}

const searchFilterOptions = ['Name', 'Address', 'Phone', 'Email', 'Company'];

class Search extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    const perPageCount = 10;
    this.state = {
      perPageCount, 
      contacts: [], 
      currentPage: 0, 
      filterOptions: searchFilterOptions,
      searchResults: []
    };
  }
  
  public render() {
    const {contacts, currentPage, perPageCount, searchResults} = this.state;

    return (
      <div>
        <Card>
          <Input.Search
            placeholder="Input search text"
            style={{ width: '50%' }}
            enterButton={true}
            onSearch={this.onSearch}
          />
          <Checkbox.Group
            options={searchFilterOptions}
            defaultValue={searchFilterOptions}
            onChange={this.onSearchFiltersChange}
            style={{ width: '50%', paddingLeft: 30 }}
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
    this.setState({
      filterOptions: checkedValues
    });
  }

  private onSearch = (searchTerm: string) => {
    const {filterOptions, perPageCount} = this.state;
    if (!searchTerm.length) { return;}
    const searchResults = handleSearch(data, searchTerm, filterOptions);
    const contacts = chunk(searchResults, perPageCount) as Contact[][];
    this.setState({contacts, searchResults});
  }
}

export default Search;

const handleSearch = (contacts: Contact[], searchTerm: string, searchFields: string[]): Contact[] => {
  const nameFields = ['first', 'last'];
  return contacts.filter(contact => {
    let found = false;
    for (let field of searchFields) {
      field = field.toLowerCase();
      if (field === 'name') {
        for (const nField of nameFields) {
          found = foundInObj(contact[field], nField, searchTerm);
          if (found) { break;}
        }
      } else {
        found = foundInObj(contact, field, searchTerm);
      }
      if (found) { break;}
    }
    return found;
  });
}

const foundInObj = (obj: object, field: string, searchTerm: string): boolean => {
  return obj[field].toLowerCase().includes(searchTerm.toLowerCase());
}
