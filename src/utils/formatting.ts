import { formatNumericValue, numberCompacter } from './numbers'

export const abbreviateAddress = (address: string | null | undefined): string => {
  if (!address) {
    return '';
  }

  const length = address.length;
  return length > 10 ? `${address.substring(0, 6)}...${address.substring(length - 4)}` : address;
};

export const formatYAxis = (value: number) => {
  return value === 0
    ? '0'
    : Math.abs(value) > 1
    ? numberCompacter.format(value)
    : formatNumericValue(value, 4)
}

export const tryParse = (val: string) => {
  try {
    const json = JSON.parse(val)
    return json
  } catch (e) {
    return val
  }
}
