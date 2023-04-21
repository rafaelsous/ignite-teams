import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 24px;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600 };
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD };
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;