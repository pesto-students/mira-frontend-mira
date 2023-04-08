interface ArrayItem {
  id: number;
  [key: string]: any;
}

export const moveItemWithinArray = <T extends ArrayItem>(
  arr: T[],
  item: T,
  newIndex: number,
): T[] => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

export const insertItemIntoArray = <T extends ArrayItem>(
  arr: T[],
  item: T,
  index: number,
): T[] => {
  const arrClone = [...arr];
  arrClone.splice(index, 0, item);
  return arrClone;
};

export const updateArrayItemById = <T extends ArrayItem>(
  arr: T[],
  itemId: number,
  fields: Partial<T>,
): T[] => {
  const arrClone = [...arr];
  const item = arrClone.find(({ id }) => id === itemId);
  if (item) {
    const itemIndex = arrClone.indexOf(item);
    arrClone.splice(itemIndex, 1, { ...item, ...fields });
  }
  return arrClone;
};

export const sortByNewest = <T extends Record<string, any>>(
  items: T[],
  sortField: string,
): T[] => items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));
