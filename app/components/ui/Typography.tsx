interface ChildrenProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const TypographyH1: React.FC<ChildrenProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
      onClick={onClick}
    >
      {children}
    </h1>
  );
};

const TypographyH2: React.FC<ChildrenProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
      onClick={onClick}
    >
      {children}
    </h2>
  );
};

const TypographyH3: React.FC<ChildrenProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
      onClick={onClick}
    >
      {children}
    </h3>
  );
};

const TypographyP: React.FC<ChildrenProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <p className={`text-sm ${className}`} onClick={onClick}>
      {children}
    </p>
  );
};

const TypographySmall: React.FC<ChildrenProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <small
      className={`text-sm font-medium leading-none ${className}`}
      onClick={onClick}
    >
      {children}
    </small>
  );
};

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
  TypographySmall,
};
