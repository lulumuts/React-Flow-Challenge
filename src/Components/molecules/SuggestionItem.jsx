import CheckIcon from '@mui/icons-material/Check';
import { FieldTypeIcon } from '../atoms';

/** Single suggestion row with icon, label, and checkmark. Used in ExpressionSuggestionList (organism). */
export default function SuggestionItem({ item, index, isSelected, onSelect, onHover, onHoverEnd }) {
  const itemClassName = [
    'expression-suggestion-list__item',
    isSelected && 'expression-suggestion-list__item--selected'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      data-index={index}
      role="option"
      aria-selected={isSelected}
      className={itemClassName}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {item.type && (
        <span className="expression-suggestion-list__item-icon">
          <FieldTypeIcon icon={item.type} size={18} />
        </span>
      )}
      <span className="expression-suggestion-list__item-label">{item.label}</span>
      <span className="expression-suggestion-list__item-check">
        <CheckIcon sx={{ fontSize: 22, color: '#1a1a1a', opacity: isSelected ? 1 : 0 }} />
      </span>
    </div>
  );
}
