import React, { useMemo, useState, useEffect, useContext } from 'react';
import { useFirebase } from '@cheeros/stores/firebase';
import { Contact as ContactType } from '@cheeros/stores/types';
import { Contact } from './Contact';
import { Wrapper } from './style';
import { SearchContext } from '../Search';

export const Contacts = () => {
  const {
    searching,
    term,
  } = useContext(SearchContext);
  const [firebase] = useFirebase();
  const database = useMemo(
    () => firebase?.database(),
    [firebase]
  );
  const ref = useMemo(
    () => database?.ref('accounts'),
    [database],
  )
  const [data, setData] = useState<{ [key: string]: ContactType }>();
  useEffect(
    () => {
      if (ref) {
        const handler = (d: any) => setData(d.val());
        ref.on('value', handler);
        return () => ref.off('value', handler);
      }
    },
    [ref, setData],
  );
  const accounts = useMemo(
    () => data
      ? Object.entries(data)
        .map(([key, d]) => ({ ...d, username: key }))
        .filter(it => {
          return searching
            ? it.name.includes(term)
            || (it.phone && `${it.phone}`.includes(term))
            || it.username.includes(term)
            : true
        })
      : [],
      [data, searching, term]
  )
  return (
    <Wrapper>
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
      {accounts.map(({ username, ...rest }) => (
        <Contact key={username} contact={{ username, ...rest }} />
      ))}
    </Wrapper>
  )
}

export default Contacts;
