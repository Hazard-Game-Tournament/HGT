export function loadMartialClansFromStorage(
  storage,
  key
){
  try{
    const value=JSON.parse(
      storage.getItem(key)||'{}'
    );

    return (
      value &&
      typeof value==='object'
    )
      ? value
      : {};
  }catch(error){
    return {};
  }
}

export function saveMartialClansToStorage(
  storage,
  key,
  clans
){
  storage.setItem(
    key,
    JSON.stringify(clans||{})
  );
}
