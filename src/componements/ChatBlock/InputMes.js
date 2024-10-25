import { useEffect, useRef } from 'react';

const useAutosizeTextArea = (ref, value) => {
    useEffect(() => {
        if (ref && ref.current) {
            const textarea = ref.current;

            // Сброс высоты для предотвращения мерцания
            textarea.style.height = 'inherit';

            // Устанавливаем высоту на основе содержимого, но ограничиваем максимальной высотой
            const maxHeight = 180; // Максимальная высота в пикселях
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
        }
    }, [ref, value]);
};

export default useAutosizeTextArea;

