import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyClasses,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	handleSubmit,
	handleReset,
}: {
	handleSubmit: (value: ArticleStateType, evt: SyntheticEvent) => void;
	handleReset: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLElement>(null);
	const [selected, setSelected] = useState<ArticleStateType>({
		fontFamilyOption: {
			title: 'Open Sans',
			value: 'Open Sans',
			className: fontFamilyClasses[0],
		},
		fontColor: {
			title: 'Черный',
			value: '#000000',
			className: 'font-black',
			optionClassName: 'option-black',
		},
		backgroundColor: {
			title: 'Белый',
			value: '#FFFFFF',
			className: 'bg-white',
			optionClassName: 'option-white',
		},
		contentWidth: {
			title: 'Широкий',
			value: '1394px',
			className: 'width-wide',
			optionClassName: 'option-wide',
		},
		fontSizeOption: {
			title: '18px',
			value: '18px',
			className: 'font-size-18',
		},
	});

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const reset = () => {
		setSelected({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			backgroundColor: defaultArticleState.backgroundColor,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
	};

	const apply = () => {
		setSelected({
			fontFamilyOption: selected.fontFamilyOption,
			backgroundColor: selected.backgroundColor,
			fontColor: selected.fontColor,
			contentWidth: selected.contentWidth,
			fontSizeOption: selected.fontSizeOption,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={(evt) => handleSubmit(selected, evt)}
					onReset={handleReset}>
					<Text
						as='h1'
						size={31}
						dynamic={false}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'
						dynamicLite={false}>
						<h1>Задайте параметры</h1>
					</Text>
					<div style={{ paddingBlockStart: 50 }}>
						<Select
							selected={selected.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(select) => {
								setSelected({ ...selected, fontFamilyOption: select });
							}}
							title='шрифт'
						/>
					</div>
					<div style={{ paddingBlock: 50 }}>
						<RadioGroup
							name='radio'
							selected={selected.fontSizeOption}
							options={fontSizeOptions}
							onChange={(select) => {
								setSelected({ ...selected, fontSizeOption: select });
							}}
							title='размер шрифта'
						/>
					</div>
					<div style={{ paddingBlockEnd: 50 }}>
						<Select
							selected={selected.fontColor}
							options={fontColors}
							onChange={(select) => {
								setSelected({ ...selected, fontColor: select });
							}}
							title='Цвет шрифта'
						/>
					</div>
					<Separator />
					<div style={{ paddingBlockStart: 50 }}>
						<Select
							selected={selected.backgroundColor}
							options={backgroundColors}
							onChange={(select) => {
								setSelected({ ...selected, backgroundColor: select });
							}}
							title='Цвет фона'
						/>
					</div>
					<div style={{ paddingBlockStart: 50 }}>
						<Select
							selected={selected.contentWidth}
							options={contentWidthArr}
							onChange={(select) => {
								setSelected({ ...selected, contentWidth: select });
							}}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={reset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={apply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
