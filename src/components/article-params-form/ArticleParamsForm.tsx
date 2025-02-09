import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useRef, useState } from 'react';

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
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	setArticleState,
}: {
	setArticleState: (newValue: ArticleStateType) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useOutsideClickClose({
		isOpen,
		asideRef,
		onChange: setIsOpen,
	});

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState({
			fontFamilyOption: formState.fontFamilyOption,
			fontSizeOption: formState.fontSizeOption,
			fontColor: formState.fontColor,
			contentWidth: formState.contentWidth,
			backgroundColor: formState.backgroundColor,
		});
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						dynamic={false}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'
						dynamicLite={false}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(select) => {
							setFormState({ ...formState, fontFamilyOption: select });
						}}
						title='шрифт'
					/>
					<RadioGroup
						name='radio'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(select) => {
							setFormState({ ...formState, fontSizeOption: select });
						}}
						title='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(select) => {
							setFormState({ ...formState, fontColor: select });
						}}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(select) => {
							setFormState({ ...formState, backgroundColor: select });
						}}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(select) => {
							setFormState({ ...formState, contentWidth: select });
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
