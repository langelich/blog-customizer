import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	asideRef: React.RefObject<HTMLElement>;
	onChange: (newValue: boolean) => void;
};

export const useOutsideClickClose = ({
	isOpen,
	asideRef,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!isOpen) return;

			const { target } = event;
			if (target instanceof Node && !asideRef.current?.contains(target)) {
				isOpen;
				onChange?.(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onChange]);
};
