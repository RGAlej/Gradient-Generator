import { keyframes } from 'styled-components';

export const fadeIn = keyframes` // is used in 'code copied' popup
  from {
    opacity: 0;
    transform: translate3d(-50%, -20%, 0);
  }
  to {
    opacity: .8;
    transform: translate3d(-50%, 0, 0);
  }
`;

export const fadeRight = keyframes` // is used in 'limit error' popup
  from {
    opacity: 0;
    transform: translate3d(50%, 0%, 0);
  }
  to {
    opacity: .8;
    transform: translate3d(-50%, 0, 0);
  }
`;
