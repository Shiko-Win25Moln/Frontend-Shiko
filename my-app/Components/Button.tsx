type ButtonProps = {
  children: string;
  variant?: 'orange' | 'dark'; 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  buttonStyle?: 'default' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
    children,
    variant = 'orange',
    disabled = false,
    size = 'md',
    buttonStyle = 'default', // "default" = text button, "icon" = square icon button. Ex: <Button buttonStyle="icon" />
    onClick,
}: ButtonProps) {

    const baseStyle = 'rounded-md text-white cursor-pointer font-medium transition-colors duration-300';
    const colorStyles = {
        orange: 'bg-[#ED5735] hover:bg-[#F5C2BA]',
        dark: 'bg-[#2C3545] hover:bg-[#7185A8]',
    };

    const textSizeStyles = {
        xs: 'w-fit px-6 py-1 text-xs',
        sm: 'w-fit px-7 py-1 text-sm',
        md: 'w-fit px-8 py-2 text-sm',
        lg: 'w-fit px-9 py-2 text-base',
        xl: 'w-fit px-10 py-3 text-base',
        "2xl": 'w-fit px-11 py-3 text-lg',
    };

    const iconSizeStyles = {
        xs: 'w-8 h-8 flex items-center justify-center',
        sm: 'w-9 h-9 flex items-center justify-center',
        md: 'w-10 h-10 flex items-center justify-center',
        lg: 'w-11 h-11 flex items-center justify-center',
        xl: 'w-12 h-12 flex items-center justify-center',
        "2xl": 'w-14 h-14 flex items-center justify-center',
    };

    return (
        <button
            className={`${baseStyle} ${colorStyles[variant]} ${buttonStyle === 'icon' ? iconSizeStyles[size] : textSizeStyles[size]}`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
}