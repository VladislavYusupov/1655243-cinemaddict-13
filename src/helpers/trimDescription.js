const DESCRIPTION_MAX_LENGTH = 140;

export const trimDescription = (description) => {
  return description.length > DESCRIPTION_MAX_LENGTH
    ? `${description.slice(0, DESCRIPTION_MAX_LENGTH - 1)}...`
    : description;
};
