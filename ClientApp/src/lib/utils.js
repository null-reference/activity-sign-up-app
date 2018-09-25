export const validateEmailAddress = (emailAddress) => {
  const regex = /^([a-z0-9-_àáâãäåèéêëìíîïòóôõöùúûü]+\.)*[a-z0-9-_àáâãäåèéêëìíîïòóôõöùúûü]+@([a-z0-9-_àáâãäåèéêëìíîïòóôõöùúûü]+\.)+[a-zàáâãäåèéêëìíîïòóôõöùúûü]{2,6}$/i;
  return regex.test(emailAddress);
};
