import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: 24px;
    background-color: ${theme.COLORS.GRAY_600};
  `}
`

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;
`

export const HeaderList = styled.View`
  width: 100%;
  margin: 32px 0 20px;
  flex-direction: row;
  align-items: center;
`

export const PlayersCounter = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`