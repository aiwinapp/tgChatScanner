export interface CountryCode {
  value: string;
  label: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { value: '+1', label: 'United States', flag: '🇺🇸' },
  { value: '+7', label: 'Russia', flag: '🇷🇺' },
  { value: '+44', label: 'United Kingdom', flag: '🇬🇧' },
  { value: '+49', label: 'Germany', flag: '🇩🇪' },
  { value: '+33', label: 'France', flag: '🇫🇷' },
  { value: '+81', label: 'Japan', flag: '🇯🇵' },
  { value: '+86', label: 'China', flag: '🇨🇳' },
  { value: '+91', label: 'India', flag: '🇮🇳' },
  { value: '+55', label: 'Brazil', flag: '🇧🇷' },
  { value: '+39', label: 'Italy', flag: '🇮🇹' },
  { value: '+34', label: 'Spain', flag: '🇪🇸' },
  { value: '+380', label: 'Ukraine', flag: '🇺🇦' },
  { value: '+48', label: 'Poland', flag: '🇵🇱' },
  { value: '+31', label: 'Netherlands', flag: '🇳🇱' },
  { value: '+46', label: 'Sweden', flag: '🇸🇪' },
  // Добавьте другие страны по необходимости
];

export default countryCodes;
