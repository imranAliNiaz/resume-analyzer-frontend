import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authFetch, apiUrl } from "@/lib/api";
import type { RootState, AppDispatch } from "@/redux/store";

interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
  isAuthModalOpen: false,
  authModalMode: "login",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: { email: string; password: string; name?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(apiUrl("/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.detail || "Registration failed");
      }

      // Save token to localStorage
      if (typeof window !== "undefined" && data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      return data;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || "Registration failed");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.detail || "Login failed");
      }

      // Save token to localStorage
      if (typeof window !== "undefined" && data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      return data;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || "Login failed");
    }
  },
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await authFetch(
        "/auth/me",
        { method: "GET" },
        getState as () => RootState,
        dispatch as AppDispatch,
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.detail || "Session expired");
      }
      return data;
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || "Failed to load profile",
      );
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    // Simply clear localStorage and state
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    dispatch(logout());
    return { success: true };
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
    },
    hydrate(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
          state.accessToken = token;
          state.status = "authenticated"; // Temporary until fetchMe succeeds
        }
      }
    },
    openAuthModal(state, action: PayloadAction<"login" | "register">) {
      state.isAuthModalOpen = true;
      state.authModalMode = action.payload;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },
    clearError(state) {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.accessToken = action.payload.access_token;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = String(action.payload || "Registration failed");
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.accessToken = action.payload.access_token;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = String(action.payload || "Login failed");
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        // Ensure accessToken is in state if we're here
        if (typeof window !== "undefined") {
          state.accessToken = localStorage.getItem("access_token");
        }
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.error = String(action.payload || "Failed to load profile");
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "idle";
      });
  },
});

export const { logout, hydrate, openAuthModal, closeAuthModal, clearError } =
  authSlice.actions;

export default authSlice.reducer;
