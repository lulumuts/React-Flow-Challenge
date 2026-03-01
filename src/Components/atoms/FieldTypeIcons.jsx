/**
 * Custom field type icons for the Update Profile Field dropdown.
 * SVGs use currentColor for stroke so they inherit text color.
 */

import LocationOnIcon from '@mui/icons-material/LocationOn';

const iconSize = 14;

const IconWrapper = ({ children, ...props }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 6, flexShrink: 0 }} {...props}>
    {children}
  </span>
);

export function LocationIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <LocationOnIcon sx={{ fontSize: size }} />
    </IconWrapper>
  );
}

export function StringIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 7c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C5.602 4 6.068 4 7 4h10c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C20 5.602 20 6.068 20 7M9 20h6M12 4v16"
        />
      </svg>
    </IconWrapper>
  );
}

export function BooleanIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2 12a6 6 0 016-6h8a6 6 0 010 12H8a6 6 0 01-6-6z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        />
      </svg>
    </IconWrapper>
  );
}

export function EnumIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 12H9m12-6H9m12 12H9m-4-6a1 1 0 11-2 0 1 1 0 012 0zm0-6a1 1 0 11-2 0 1 1 0 012 0zm0 12a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </IconWrapper>
  );
}

export function LanguageIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12.913 17h7.174m-7.174 0L11 21m1.913-4l2.865-5.991c.231-.483.347-.724.505-.8a.5.5 0 01.434 0c.158.076.274.317.505.8L20.087 17m0 0L22 21M2 5h6m0 0h3.5M8 5V3m3.5 2H14m-2.5 0c-.496 2.957-1.647 5.636-3.334 7.884M10 14a9.396 9.396 0 01-1.834-1.116m0 0C6.813 11.848 5.603 10.427 5 9m3.166 3.884A17.295 17.295 0 012 18"
        />
      </svg>
    </IconWrapper>
  );
}

export function DateTimeIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 10H3m13-8v4M8 2v4m2.5 8l1.5-1v5m-1.25 0h2.5M7.8 22h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C21 19.72 21 18.88 21 17.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C18.72 4 17.88 4 16.2 4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C3 6.28 3 7.12 3 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C5.28 22 6.12 22 7.8 22z"
        />
      </svg>
    </IconWrapper>
  );
}

export function IntegerIcon({ size = iconSize }) {
  return (
    <IconWrapper>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.5 6.5l-11 11m2-7v-4m-2 2h4m3 7h4M7.8 21h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C21 18.72 21 17.88 21 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 00-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C5.28 21 6.12 21 7.8 21z"
        />
      </svg>
    </IconWrapper>
  );
}

const FIELD_TYPE_ICONS = {
  text: StringIcon,
  location: LocationIcon,
  boolean: BooleanIcon,
  language: LanguageIcon,
  date: DateTimeIcon,
  enum: EnumIcon,
  integer: IntegerIcon
};

export function FieldTypeIcon({ icon, size }) {
  const IconComponent = FIELD_TYPE_ICONS[icon] || StringIcon;
  return <IconComponent size={size || iconSize} />;
}
