import { useMemo } from 'react';

interface ILoadingIconProps {
  className: string;
  isLoading?: boolean;
}

export function LoadingIcon(props: ILoadingIconProps) {
  const className = useMemo(() => {
    if (props.isLoading) return 'fas fa-circle-notch fa-spin';
    return props.className;
  }, [props.isLoading, props.className]);

  return <i className={className} />;
}

LoadingIcon.defaultProps = { isLoading: false };
