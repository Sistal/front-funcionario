export const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockResponse = async (data, delay = 500) => {
  await mockDelay(delay);
  return data;
};

export const mockError = async (message, status = 400, delay = 500) => {
  await mockDelay(delay);
  throw { message, status };
};
