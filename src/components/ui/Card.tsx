interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverClassName?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', hoverClassName = '', onClick }: CardProps) {
  return (
    <div
      className={`rounded-lg p-4 ${className} ${hoverClassName}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {children}
    </div>
  );
}
