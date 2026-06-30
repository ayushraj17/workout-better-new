/* eslint-disable better-tailwindcss/no-unknown-classes */
import type { TextInputProps } from "react-native";
import * as React from "react";
import {
	I18nManager,
	TextInput as NTextInput,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { tv } from "tailwind-variants";
import { useCSSVariable } from "uniwind";

const inputTv = tv({
	slots: {
		container: "mb-4",
		label: "font-label tracking-widest text-secondary uppercase",
		inputContainer:
			"flex-row items-center overflow-hidden rounded-md border-2 border-transparent bg-input",
		input: "flex-1 p-2 font-sans font-semibold text-foreground",
	},

	variants: {
		focused: {
			true: {
				inputContainer: "border-secondary",
			},
		},
		error: {
			true: {
				inputContainer: "border-destructive bg-destructive",
				input: "text-destructive-foreground",
				label: "text-destructive",
			},
		},
		disabled: {
			true: {
				inputContainer: "bg-muted opacity-50",
			},
		},
	},
	defaultVariants: {
		focused: false,
		error: false,
		disabled: false,
	},
});

export type NInputProps = {
	label?: string;
	disabled?: boolean;
	error?: string;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
} & TextInputProps;

export function Input({
	ref,
	...props
}: NInputProps & { ref?: React.Ref<NTextInput | null> }) {
	const {
		label,
		error,
		testID,
		onBlur: onBlurProp,
		onFocus: onFocusProp,
		startAdornment,
		endAdornment,
		...inputProps
	} = props;
	const [isFocussed, setIsFocussed] = React.useState(false);
	const mutedForeground = useCSSVariable("--color-muted-foreground");

	const onBlur = React.useCallback(
		(e: any) => {
			setIsFocussed(false);
			onBlurProp?.(e);
		},
		[onBlurProp],
	);

	const onFocus = React.useCallback(
		(e: any) => {
			setIsFocussed(true);
			onFocusProp?.(e);
		},
		[onFocusProp],
	);

	const styles = inputTv({
		error: Boolean(error),
		focused: isFocussed,
		disabled: Boolean(props.disabled),
	});

	return (
		<View className={styles.container()}>
			{label && (
				<Text
					testID={testID ? `${testID}-label` : undefined}
					className={styles.label()}
				>
					{label}
				</Text>
			)}
			<View
				className={styles.inputContainer()}
				style={props.multiline ? { alignItems: "flex-start" } : undefined}
			>
				{startAdornment && <View className="mr-2">{startAdornment}</View>}
				<NTextInput
					testID={testID}
					ref={ref}
					placeholderTextColor={(mutedForeground as string) || "#b0ae70"}
					className={styles.input()}
					onBlur={onBlur}
					onFocus={onFocus}
					{...inputProps}
					style={StyleSheet.flatten([
						{ writingDirection: I18nManager.isRTL ? "rtl" : "ltr" },
						{ textAlign: I18nManager.isRTL ? "right" : "left" },
						props.multiline ? { textAlignVertical: "top", minHeight: 100 } : {},
						inputProps.style,
					])}
				/>
				{endAdornment && <View className="ml-2">{endAdornment}</View>}
			</View>
			{error && (
				<Text
					testID={testID ? `${testID}-error` : undefined}
					className="text-destructive mt-1 text-sm font-semibold"
				>
					{error}
				</Text>
			)}
		</View>
	);
}
