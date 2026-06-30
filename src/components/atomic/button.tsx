import { Pressable, PressableProps, Text } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "items-center justify-center rounded-lg flex-row gap-2",

	variants: {
		variant: {
			primary: "bg-primary active:opacity-90",
			secondary: "bg-secondary active:opacity-90",
			outline: "border border-border bg-transparent",
			ghost: "bg-transparent active:bg-muted",
			destructive: "bg-destructive",
		},

		size: {
			sm: "h-9 px-3",
			md: "h-11 px-4",
			lg: "h-12 px-6",
			icon: "h-11 w-11",
		},

		disabled: {
			true: "opacity-50",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

const text = tv({
	base: "font-medium",

	variants: {
		variant: {
			primary: "text-primary-foreground",
			secondary: "text-secondary-foreground",
			outline: "text-foreground",
			ghost: "text-adaptive",
			destructive: "text-destructive-foreground",
		},

		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
			icon: "text-base",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

type ButtonProps = PressableProps &
	VariantProps<typeof button> & {
		title: string;
	};

export function Button({
	title,
	variant,
	size,
	disabled,
	className,
	...props
}: ButtonProps) {
	return (
		<Pressable
			disabled={disabled}
			className={button({
				variant,
				size,
				disabled,
				className,
			})}
			{...props}
		>
			<Text className={text({ variant, size })}>{title}</Text>
		</Pressable>
	);
}
