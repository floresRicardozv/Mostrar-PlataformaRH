interface ButtonProps {
  children: React.ReactNode;
  variant: 'orange' | 'teal';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantClasses: Record<ButtonProps['variant'], string> = {
  orange:
    'bg-gradient-to-r from-dylo-orange to-dylo-orange-darker hover:to-dylo-orange-hover-dark text-white',
  teal:
    'bg-gradient-to-r from-dylo-teal-light to-dylo-teal-darker hover:from-dylo-teal-hover hover:to-dylo-teal-hover-dark text-white',
};

export function Button({ children, variant, icon, className = '', onClick }: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all cursor-pointer ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
