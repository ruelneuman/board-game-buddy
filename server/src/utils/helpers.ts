export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const getPaginationData = (
  count: number,
  offset: number,
  limit: number
) => {
  const totalPages = Math.ceil(count / limit);
  const page = Math.floor(offset / limit) + 1;
  const pagingCounter = Math.floor(offset / limit) * limit + 1;
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const prevPage = hasPrevPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    count,
    offset,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  };
};

const transformKeys = (
  value: unknown,
  transform: (inputString: string) => string
): unknown => {
  if (typeof value !== 'object' || value === null) return value;
  if (value instanceof Date || value instanceof RegExp) return value;
  if (Array.isArray(value))
    return value.map((val) => transformKeys(val, transform));
  return Object.fromEntries(
    Object.entries(value).map(([key, val]) => [
      transform(key),
      transformKeys(val, transform),
    ])
  );
};

const snakeCaseToCamelCase = (inputString: string) =>
  inputString.replace(/_(.)/g, (group) => group[1].toUpperCase());

export const transformKeysSnakeToCamel = (value: unknown) =>
  transformKeys(value, snakeCaseToCamelCase);
