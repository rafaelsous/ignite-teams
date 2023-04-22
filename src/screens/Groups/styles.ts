import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 24px;
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600 };
`;