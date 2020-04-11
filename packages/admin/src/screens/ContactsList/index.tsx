import React, { createRef } from 'react';
import { PhoneWrapper } from '../../components/PhoneWrapper';
import { Header } from './Header';
import { Contacts } from './Contacts';
import { SearchProvider } from './Search';

export const PhoneContactsList: React.FC = () => {
  const wrapperRef = createRef<HTMLDivElement>();
  return (
    <SearchProvider>
      <PhoneWrapper ref={wrapperRef}>
        <Header parent={wrapperRef} />
        <Contacts />
      </PhoneWrapper>
    </SearchProvider>
  );
}

export default PhoneContactsList;
