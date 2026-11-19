export function deleteFromMap<T, V>(map: Map<T, V>, key: T) {
  map.delete(key);
  return map;
}

export function mutateFromMap<T, V>(
  map: Map<T, V>,
  key: T,
  mutate: (value: V) => void,
) {
  const value = map.get(key);
  if (value) mutate(value);
  return map;
}
