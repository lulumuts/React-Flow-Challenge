/**
 * Turn.io expression schema - Contact object properties.
 * Aligned with Turn.io Contact API default schema.
 * @see https://whatsapp.turn.io/docs/api/contacts
 *
 * type maps to FieldTypeIcon: text, boolean, date, language, location
 */

export const CONTACT_PROPERTIES = [
  { name: 'whatsapp_profile_name', display: 'WhatsApp Profile Name', type: 'text' },
  { name: 'last_seen_at', display: 'Last Seen At', type: 'date' },
  { name: 'name', display: 'Name', type: 'text' },
  { name: 'surname', display: 'Surname', type: 'text' },
  { name: 'location', display: 'Location', type: 'location' },
  { name: 'opted_in', display: 'Opted In', type: 'boolean' },
  { name: 'language', display: 'Language', type: 'language' },
  { name: 'birthday', display: 'Birthday', type: 'date' },
  { name: 'first_message_received_at', display: 'First Message Received At', type: 'date' },
  { name: 'last_message_sent_at', display: 'Last Message Sent At', type: 'date' },
  { name: 'last_message_received_at', display: 'Last Message Received At', type: 'date' },
  { name: 'opted_in_at', display: 'Opted In At', type: 'date' },
  { name: 'whatsapp_id', display: 'WhatsApp Id', type: 'text' },
  { name: 'is_blocked', display: 'Is Blocked', type: 'boolean' }
];
