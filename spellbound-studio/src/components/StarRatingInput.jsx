import { useState } from 'react';

export default function StarRatingInput({ value, onChange }) {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="star-input" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={value === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    className={`star-btn ${(hovered || value) >= n ? 'filled' : ''}`}
                    onClick={() => onChange(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                >
                    ★
                </button>
            ))}
        </div>
    );
}