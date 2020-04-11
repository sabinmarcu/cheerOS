import styled from '@emotion/styled';

export const Wrapper = styled.article`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
  box-sizing: border-box;
  border-bottom: solid 1px #aaa;
`;

export const Avatar = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 100%;
  margin: 10px;
  margin-left: 0;
  padding: 2px;
  border: solid 2px #000;
`;

export const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  & > * {
    width: 100%;
    margin: 5px;
    padding: 5px;
  }
  font-size: 1.2rem;
`;

export const NameSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: solid 1px #ccc;
`;

export const Name = styled.div`
  color: #000;
`;

export const NameAddon = styled.div`
  color: #ccc;
  margin-left: 10px;
  &:before {
    content: '@';
    color: #ccc;
    padding-right: 2px;
  }
`;

export const PhoneSection = styled.div`
  color: #000;
  margin-top: 0;
  &:before {
    content: '#';
    color: #ccc;
    padding-right: 2px;
  }
`;
