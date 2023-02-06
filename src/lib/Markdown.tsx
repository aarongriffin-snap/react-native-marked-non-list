import React, { memo, useMemo } from "react";
import { useColorScheme, View } from "react-native";
import { marked } from "marked";
import Parser from "./Parser";
import getStyles from "../theme/styles";
import type { MarkdownProps } from "./types";

const Markdown = ({
	value,
	theme,
	baseUrl,
	styles: userStyles,
}: MarkdownProps) => {
	const colorScheme = useColorScheme();
	const styles = useMemo(
		() => getStyles(userStyles, colorScheme, theme),
		[userStyles, colorScheme, theme],
	);

	const rnElements = useMemo(() => {
		const parser = new Parser({ styles, baseUrl });
		const tokens = marked.lexer(value, { mangle: false, gfm: true });
		return parser.parse(tokens);
	}, [value, styles, baseUrl]);

	return (
		<View style={styles.container}>{rnElements.map((el) => el)}</View>
		// <FlatList
		// 	removeClippedSubviews
		// 	keyExtractor={keyExtractor}
		// 	maxToRenderPerBatch={8}
		// 	initialNumToRender={8}
		// 	style={styles.container}
		// 	{...flatListProps}
		// 	data={rnElements}
		// 	renderItem={renderItem}
		// />
	);
};

export default memo(Markdown);
