/**
 * Fetches ISO 639-3 language codes from SIL remotely.
 * Format: [{ value: 'eng', label: 'English' }, ...]
 */
const ISO6393_URL = 'https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3.tab';
export async function fetchLanguageOptions() {
  const url = `https://corsproxy.io/?url=${encodeURIComponent(ISO6393_URL)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch languages: ${res.status}`);
  const text = await res.text();
  const lines = text.trim().split('\n');
  const header = lines[0].split('\t');
  const idIdx = header.indexOf('Id');
  const refNameIdx = header.indexOf('Ref_Name');
  if (idIdx < 0 || refNameIdx < 0) throw new Error('Invalid ISO 639-3 format');

  const options = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const id = cols[idIdx]?.trim();
    const refName = cols[refNameIdx]?.trim();
    if (id && refName) {
      options.push({ value: id, label: refName });
    }
  }
  return options;
}
