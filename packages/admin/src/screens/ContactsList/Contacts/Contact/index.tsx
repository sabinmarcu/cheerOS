import React from 'react';
import { Contact as ContactType } from '@cheeros/stores/types';
import {
  Wrapper,
  Avatar,
  TextWrapper,
  NameSection,
  Name,
  NameAddon,
  PhoneSection,
} from './style';

export const Contact: React.FC<{ contact: ContactType }> = ({
  contact: {
    name,
    phone,
    username,
    avatar,
  }
}) => (
  <Wrapper>
    <Avatar src={avatar ? avatar : '//placekitten.com/50/50'} />
    <TextWrapper>
      <NameSection>
        <Name>{name}</Name>
        {(username && phone) && <NameAddon>{username}</NameAddon>}
      </NameSection>
      {(username || phone) && <PhoneSection>{phone || username}</PhoneSection>}
    </TextWrapper>
  </Wrapper>
)
