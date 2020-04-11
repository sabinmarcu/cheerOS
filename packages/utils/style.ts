export const transition = ({
  duration = 0.5,
  func = 'ease-out',
  props,
}: {
  duration?: number;
  func?: string;
  props: string[];
}): { transition: string } | null => (props && props.length > 0
  ? {
    transition: props.map((it) => `${it} ${duration}s ${func}`).join(', '),
  }
  : null
);

export default transition;
