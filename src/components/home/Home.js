import React from 'react';
import styled, { css } from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Header>
        <p>کشت و صنعت اکسون</p>
      </Header>

      <ButtonsContainer>
        <Button green>
          <ButtonText>استعلام</ButtonText>
        </Button>

        <Button gray>
          <ButtonText>بروزرسانی</ButtonText>
        </Button>

        <DateSection>
          <DateText>از تاریخ</DateText>
          <DateInput>
            <DateValue>---- / -- / --</DateValue>
          </DateInput>
          <DateText>تا تاریخ</DateText>
          <DateInput>
            <DateValue>---- / -- / --</DateValue>
          </DateInput>
        </DateSection>
      </ButtonsContainer>

      <ColumnsSection>
        <CheckBoxColumn></CheckBoxColumn>
        <Column>
          <ColumnsTitle>شناسه بازارگاه</ColumnsTitle>
        </Column>
        <Column>
          <ColumnsTitle>وزن بازارگاه</ColumnsTitle>
        </Column>
        <Column>
          <ColumnsTitle>وزن بارنامه</ColumnsTitle>
        </Column>
        <Column>
          <ColumnsTitle>تاریخ بارنامه</ColumnsTitle>
        </Column>
        <Column>
          <ColumnsTitle>شماره بارنامه</ColumnsTitle>
        </Column>
        <Column>
          <ColumnsTitle>نام کالا</ColumnsTitle>
        </Column>

        <NameColumn>
          <ColumnsTitle>نام خریدار</ColumnsTitle>
        </NameColumn>

        <StatusColumn>
          <ColumnsTitle>وضعیت استعلام</ColumnsTitle>
        </StatusColumn>
      </ColumnsSection>

      <DataRow>
        <CheckBoxColumn></CheckBoxColumn>
        <Column>
          <DataValue>شناسه بازارگاه</DataValue>
        </Column>
        <Column>
          <DataValue>وزن بازارگاه</DataValue>
        </Column>
        <Column>
          <DataValue>وزن بارنامه</DataValue>
        </Column>
        <Column>
          <DataValue>تاریخ بارنامه</DataValue>
        </Column>
        <Column>
          <DataValue>شماره بارنامه</DataValue>
        </Column>
        <Column>
          <DataValue>نام کالا</DataValue>
        </Column>

        <NameColumn>
          <DataValue>نام خریدار</DataValue>
        </NameColumn>

        <StatusColumn>
          <DataValue>وضعیت استعلام</DataValue>
        </StatusColumn>
      </DataRow>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  height: 66px;
  display: flex;
  flex-direction: row-reverse;
  background-color: var(--caribbean-green);
  width: 100vw;
  padding-right: 48px;

  p {
    color: white;

    letter-spacing: 0px;
    text-align: center;
    white-space: nowrap;

    font-family: 'Dana-Bold', Helvetica, Arial, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  height: 70px;
  width: 100vw;

  padding: 0 48px;
`;

const Button = styled.div`
  ${(props) =>
    props.green &&
    css`
      background: var(--caribbean-green);
    `}

  ${(props) =>
    props.gray &&
    css`
      background: var(--dove-gray);
    `}
  border-radius: 12px;
  height: 44px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;

const ButtonText = styled.p`
  color: white;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

const DateSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  width: calc(100% - 330px);
  min-height: 70px;
`;

const DateText = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 0 0 24px;
`;

const DateInput = styled.div`
  border: 1px solid var(--dove-gray);
  background-color: white;
  border-radius: 20px;
  height: 46px;
  opacity: 0.5;
  width: 210px;
  margin: 0 0 0 24px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateValue = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  opacity: 1;
  margin: 0;
`;

const ColumnsSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-height: 65px;
  width: 100%;
  padding: 48px 48px 0 48px;
`;

const CheckBoxColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 24px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
`;

const NameColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 280px;
`;

const StatusColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 140px;
`;

const ColumnsTitle = styled.p`
  color: black;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-height: 66px;
  width: calc(100% - 96px);
  padding: 0;
  margin-top: 16px;

  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
`;

const DataValue = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

export default Home;
