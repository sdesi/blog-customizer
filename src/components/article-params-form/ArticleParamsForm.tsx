import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	values: ArticleStateType;
	onChange: (values: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { values, onChange, onApply, onReset } = props;
	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as Node;
			if (rootRef.current && !rootRef.current.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isOpen]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onApply();
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		onReset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Select
						title='ШРИФТ'
						selected={values.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							onChange({ ...values, fontFamilyOption: selected })
						}
					/>

					<RadioGroup
						name='font-size'
						title='РАЗМЕР ШРИФТА'
						options={fontSizeOptions}
						selected={values.fontSizeOption}
						onChange={(selected) =>
							onChange({ ...values, fontSizeOption: selected })
						}
					/>

					<Select
						title='ЦВЕТ ШРИФТА'
						selected={values.fontColor}
						options={fontColors}
						onChange={(selected) => onChange({ ...values, fontColor: selected })}
					/>

					<Separator />

					<Select
						title='ЦВЕТ ФОНА'
						selected={values.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							onChange({ ...values, backgroundColor: selected })
						}
					/>

					<RadioGroup
						name='content-width'
						title='ШИРИНА КОНТЕНТА'
						options={contentWidthArr}
						selected={values.contentWidth}
						onChange={(selected) =>
							onChange({ ...values, contentWidth: selected })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
