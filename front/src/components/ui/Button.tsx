import tw from 'tailwind-styled-components';

export const Button = tw.button<{
  px: number;
  py: number;
  rounded: string;
  color: string;
}>`
    ${(props) => `px-${props.px}`}
    ${(props) => `py-${props.py}`}
    
    ${(props) => `rounded-${props.rounded}`}
    ${(props) => props.color}
`;
