match = require("string-similarity-js");
const nameMatch = (firstName, lastName, fullName) => {
  if (!fullName) return true;
  if (fullName === "") return true;
  firstName = firstName.trim().toLowerCase();
  lastName = lastName.trim().toLowerCase();
  fullName = fullName.trim().toLowerCase();
  if (firstName.startsWith(fullName)) return true;
  if (lastName.startsWith(fullName)) return true;
  if (`${firstName} ${lastName}`.startsWith(fullName)) return true;
  if (`${lastName} ${firstName}`.startsWith(fullName)) return true;
  if (match.stringSimilarity(`${firstName}`, fullName) > 0.79) return true;
  if (match.stringSimilarity(`${lastName}`, fullName) > 0.79) return true;
  if (match.stringSimilarity(`${firstName} ${lastName}`, fullName) > 0.79)
    return true;
  if (match.stringSimilarity(`${lastName} ${firstName}`, fullName) > 0.79)
    return true;
  return false;
};
module.exports = nameMatch;
