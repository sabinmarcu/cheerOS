import styled from '@emotion/styled';

import {
  Card,
  Typography,
  TextField,
  CardActions,
} from '@material-ui/core';

export const StyledCard = styled(Card)`
  min-width: 300px;
  max-width: 600px;
  min-height: 200px;
  width: 100vw;
    padding: 20px 30px;
`;

export const StyledTypography = styled(Typography)`
  && {
    margin-bottom: 50px;
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    margin: 15px 0;
  }
`;

export const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;
