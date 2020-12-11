const DEFAULT_DELIMITER = `, `;

const convertArrayToString = (arr, delimiter = DEFAULT_DELIMITER) => arr.join(delimiter);

export default convertArrayToString;
