/**
 * Icons for the Update Profile Field card header.
 * User (profile) and InfoCircle icons.
 */

export function UserIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 21c0-1.396 0-2.093-.172-2.661a4 4 0 00-2.667-2.667c-.568-.172-1.265-.172-2.661-.172h-5c-1.396 0-2.093 0-2.661.172a4 4 0 00-2.667 2.667C4 18.907 4 19.604 4 21M16.5 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
      />
    </svg>
  );
}

export function InfoCircleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
      />
    </svg>
  );
}
