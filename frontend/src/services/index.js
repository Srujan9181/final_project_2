import { config } from '../config'; // Assuming you have a config file

const apiRequest = async (endpoint, method, headers = {}, body = null) => {
  try {
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(`${config.backendUrl}${endpoint}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      // Improved error handling:  Throw an error with the message from the backend
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (error) {
    // Centralized error logging and handling
    console.error(`API request to ${endpoint} failed:`, error);
    return { error: error.message || 'An unexpected error occurred' }; // Consistent error format
  }
};

const userService = {
  signup: async (user) => apiRequest('/user/signup', 'POST', {}, user),
  editProfile: async (user) => apiRequest('/user/signup', 'PUT', {}, user),  // Corrected endpoint
  login: async (user) => apiRequest('/user/login', 'POST', {}, user),
  addTeamMember: async (user) => apiRequest('/user/member', 'POST', {}, user),
  fetchTeamMembers: async (id) => apiRequest(`/user/fetchmembers/${id}`, 'GET'),
  deleteMember: async (id) =>
    apiRequest('/user/member', 'DELETE', {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }, { id }),
};

const messageService = {
  addEndUser: async (user) => apiRequest('/message/adduser', 'POST', {}, user),
  sendMessage: async (id, message) => apiRequest('/message/addmessage', 'POST', {}, { id, message }),
  fetchUsers: async () => apiRequest('/message/users', 'GET'),
  updateStatus: async (id, status) => apiRequest('/message/updatestatus', 'POST', {}, { id, status }),
  assignChat: async (memberId, ticketId) => apiRequest(`/message/assign?memberId=${memberId}&ticketId=${ticketId}`, 'GET'),
  memberMessageFetch: async (id) => apiRequest(`/message/member/${id}`, 'GET'), 
  updateMissed: async (userId, dateObj) =>
    apiRequest('/message/adduser', 'PATCH', {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }, { id: userId, date: dateObj }), 
  fetchMissed: async () =>
    apiRequest('/message/missed', 'GET', {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
};

export default {
  ...userService,
  ...messageService
};
