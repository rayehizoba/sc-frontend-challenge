import { Avatar, List } from 'antd';
import * as React from 'react';
import { Contact } from '../models';

export const RenderListItem = (contact: Contact) => {
  const {picture, name} = contact;
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={picture} />}
        title={`${name.first} ${name.last}`}
        description={description(contact)}
      />
    </List.Item>
  );
}


const description = ({email, address, phone, company}: Contact) => (
  <div>
    <div><strong>Email:</strong> {email}</div>
    <div><strong>Phone:</strong> {phone}</div>
    <div><strong>Company:</strong> {company}</div>
    <div><strong>Address:</strong> {address}</div>
  </div>
)