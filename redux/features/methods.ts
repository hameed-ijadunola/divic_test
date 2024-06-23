const postMethod = <T>(url: string, body: T) => {
  return {
    url,
    method: 'POST',
    body,
  };
};
const getMethod = <T>(url: string, params: T) => {
  return {
    url,
    method: 'GET',
    params,
  };
};
const patchMethod = <T>(url: string, body: T) => {
  return {
    url,
    method: 'PATCH',
    body,
  };
};
const putMethod = <T>(url: string, body: T) => {
  return {
    url,
    method: 'PUT',
    body,
  };
};
const deleteMethod = <T>(url: string, body: T) => {
  return {
    url,
    method: 'DELETE',
    body,
  };
};

export { postMethod, getMethod, patchMethod, putMethod, deleteMethod };
