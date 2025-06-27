import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "/api",
});

// API endpoints
export const API_ENDPOINTS = {
  PUSHER: "/pusher",
  // Add more endpoints here as you create them
  // GAME: "/game",
  // PLAYERS: "/players",
  // QUESTIONS: "/questions",
} as const;

// API functions
export const apiService = {
  // Pusher related
  submitName: async (name: string) => {
    const response = await api.post(API_ENDPOINTS.PUSHER, {
      name,
      action: "submit-name",
    });
    return response.data;
  },

  // Get current state for synchronization
  getNames: async () => {
    const response = await api.post(API_ENDPOINTS.PUSHER, {
      action: "get-names",
    });
    return response.data.names;
  },

  // Add more API functions here
  // getGameState: async () => {
  //   const response = await api.get(API_ENDPOINTS.GAME);
  //   return response.data;
  // },

  // createPlayer: async (playerData: PlayerData) => {
  //   const response = await api.post(API_ENDPOINTS.PLAYERS, playerData);
  //   return response.data;
  // },
};
