export const fetchUsers = async (page = 1) => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: {
      'x-api-key': 'reqres-free-v1',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};
