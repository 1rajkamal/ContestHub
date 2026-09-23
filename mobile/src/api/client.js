import { Platform } from 'react-native';

// In development, detect whether running on web, emulator, or physical device
const getDefaultBaseUrl = () => {
  if (Platform.OS === 'android') {
    // Android emulator loops back to host machine via 10.0.2.2
    return 'http://10.0.2.2:5000/api';
  }
  // Web or iOS simulator
  return 'http://localhost:5000/api';
};

const BASE_URL = getDefaultBaseUrl();

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    console.warn(`[API] Request failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Competitions
  getCompetitions: () => request('/competitions'),
  getDemoUsers: () => request('/competitions/demo-users'),
  getCompetitionById: (id, userId = null) =>
    request(`/competitions/${id}${userId ? `?userId=${userId}` : ''}`),
  getAvailability: (id) => request(`/competitions/${id}/availability`),
  getWinners: (id) => request(`/competitions/${id}/winners`),
  getReviews: (id) => request(`/competitions/${id}/reviews`),
  getRewards: (id) => request(`/competitions/${id}/rewards`),
  getParticipation: (id, userId) =>
    request(`/competitions/${id}/participation?userId=${userId}`),
  getReferral: (id, userId) =>
    request(`/competitions/${id}/referral?userId=${userId}`),

  // Mutations
  register: (id, userId, paymentDetails = {}) =>
    request(`/competitions/${id}/register`, {
      method: 'POST',
      body: JSON.stringify({ userId, paymentDetails }),
    }),

  submitEntry: (id, submissionData) =>
    request(`/competitions/${id}/submission`, {
      method: 'POST',
      body: JSON.stringify(submissionData),
    }),
};
