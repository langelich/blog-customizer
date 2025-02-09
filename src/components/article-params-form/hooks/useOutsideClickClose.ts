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
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
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
	}, [isOpen, onChange, asideRef]);
};
