export function loadRosterFromStorage(
  storage,
  key
){
  try{
    const raw=
      storage.getItem(key);

    const data=
      raw
        ? JSON.parse(raw)
        : {};

    return (
      data &&
      typeof data==='object' &&
      !Array.isArray(data)
    )
      ? data
      : {};
  }catch(error){
    return {};
  }
}

export function saveRosterToStorage(
  storage,
  key,
  roster
){
  storage.setItem(
    key,
    JSON.stringify(roster)
  );

  return roster;
}
