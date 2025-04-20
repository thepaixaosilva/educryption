export default function applyMask(rawValue: string, mask: string): string {
  let formattedValue = '';
  let rawIndex = 0;

  for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
    if (mask[i] === '#') {
      formattedValue += rawValue[rawIndex++];
    } else {
      formattedValue += mask[i];
    }
  }

  return formattedValue;
}
