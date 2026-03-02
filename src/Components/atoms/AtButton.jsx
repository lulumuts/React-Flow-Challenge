import atSignSvg from '../../assets/field-types/AtSign.svg';

/**
 * Button with @ icon for inserting Turn.io expressions.
 * Used in the TipTap value field to open the expression suggestion list.
 */
export default function AtButton({
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  title = 'Insert expression (@)',
  'aria-label': ariaLabel = 'Insert expression',
  size = 28,
  iconSize = 14
}) {
  return (
    <button
      type="button"
      className={['at-button', className].filter(Boolean).join(' ')}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
      title={title}
      aria-label={ariaLabel}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'rgba(0, 0, 0, 0.6)',
        cursor: 'pointer',
        padding: 0,
        pointerEvents: 'auto',
        appearance: 'none',
        position: 'relative',
        zIndex: 10,
        outline: 'none'
      }}
    >
      <img src={atSignSvg} alt="" style={{ width: iconSize, height: iconSize, pointerEvents: 'none' }} />
    </button>
  );
}
