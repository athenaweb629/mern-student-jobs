import React, { useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

import Box from '@mui/material/Box';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ToggleButton from '@mui/material/ToggleButton';
import Divider from '@mui/material/Divider';

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
};

const RichEditor = ({ form, setForm }) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	return (
		<Box borderBottom={1} borderColor="grey.600" fontFamily='sans-serif'>
			<Slate
				editor={editor}
				value={form.description}
				onChange={(value) => {
					setForm({ ...form, description: value });
				}}
			>
				<Toolbar>
					<MarkButton format="bold">
						<FormatBoldIcon />
					</MarkButton>
					<MarkButton format="italic">
						<FormatItalicIcon />
					</MarkButton>
					<MarkButton format="underline">
						<FormatUnderlinedIcon />
					</MarkButton>
					<BlockButton format="numbered-list">
						<FormatListNumberedIcon />
					</BlockButton>
					<BlockButton format="bulleted-list">
						<FormatListBulletedIcon />
					</BlockButton>
				</Toolbar>
				<Box pl={1} style={{ minHeight: '100px' }}>
					<Editable
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder="Write your job description"
						spellCheck
						autoFocus
						onKeyDown={(event) => {
							// eslint-disable-next-line no-restricted-syntax
							for (const hotkey in HOTKEYS) {
								if (isHotkey(hotkey, event)) {
									event.preventDefault();
									const mark = HOTKEYS[hotkey];
									// eslint-disable-next-line @typescript-eslint/no-use-before-define
									toggleMark(editor, mark);
								}
							}
						}}
					/>
				</Box>
			</Slate>
		</Box>
	);
};

export const Element = ({ attributes, children, element }) => {
	switch (element.type) {
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>;
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>;
		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>;
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>;
		case 'list-item':
			return <li {...attributes}>{children}</li>;
		case 'numbered-list':
			return <ol {...attributes}>{children}</ol>;
		default:
			return <p {...attributes}>{children}</p>;
	}
};

export const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, children }) => {
	const editor = useSlate();
	return (
		<Box ml={1} mt={1}>
			<ToggleButton
				value={format}
				selected={isBlockActive(editor, format)}
				onMouseDown={(event) => {
					event.preventDefault();
					toggleBlock(editor, format);
				}}
				style={{ lineHeight: 1 }}
			>
				{children}
			</ToggleButton>
		</Box>
	);
};

const MarkButton = ({ format, children }) => {
	const editor = useSlate();
	return (
		<Box ml={1} mt={1}>
			<ToggleButton
				value={format}
				selected={isMarkActive(editor, format)}
				onMouseDown={(event) => {
					event.preventDefault();
					toggleMark(editor, format);
				}}
				style={{ lineHeight: 1 }}
			>
				{children}
			</ToggleButton>
		</Box>
	);
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
	<>
		<Box
			display="flex"
			direction="row"
			justify="flex-start"
			alignItems="center"
			flexWrap="wrap"
		>
			{children}
		</Box>
		<Box pt={2}>
			<Divider variant="middle" />
		</Box>
	</>
));

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
	<Menu {...props} ref={ref} />
));

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.type === format
	});
	return !!match;
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) => LIST_TYPES.includes(n.type),
		split: true
	});

	Transforms.setNodes(editor, {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

export default RichEditor;
