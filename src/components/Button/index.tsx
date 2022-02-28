import { ReactNode } from 'react';
import { LoadingIcon } from '../LoadingIcon';
import { StyledIconButton } from './styles';
export { Button } from './styles';

interface ILoadingButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function LoadingButton(props: ILoadingButtonProps) {
  return (
    <StyledIconButton onClick={props.onClick}>
      {props.icon && (
        <LoadingIcon className={props.icon} isLoading={props.isLoading} />
      )}
      {props.children}
    </StyledIconButton>
  );
}
