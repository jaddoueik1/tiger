import { WhatsAppConfig } from '@/hooks/useApi';
import { ApiError, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: 'Network Error',
        message: 'Failed to parse error response',
        statusCode: response.status,
      }));
      throw errorData;
    }

    return response.json();
  }

  // Content API
  async getContent(key: string, locale = 'en') {
    return this.request<any>(`/content/${key}?locale=${locale}`);
  }

  async getSeoData(path: string, locale = 'en') {
    return this.request<any>(`/content/seo/${path}?locale=${locale}`);
  }

  // Classes API
  async getDisciplines() {
    return this.request<any>('/classes/disciplines');
  }

  async getClassTemplates(params?: {
    discipline?: string;
    level?: string;
    coachId?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.discipline) searchParams.set('discipline', params.discipline);
    if (params?.level) searchParams.set('level', params.level);
    if (params?.coachId) searchParams.set('coachId', params.coachId);
    
    return this.request<any>(`/classes/templates?${searchParams}`);
  }

  async getClassSessions(params?: {
    from?: string;
    to?: string;
    discipline?: string;
    level?: string;
    coachId?: string;
    locationId?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.from) searchParams.set('from', params.from);
    if (params?.to) searchParams.set('to', params.to);
    if (params?.discipline) searchParams.set('discipline', params.discipline);
    if (params?.level) searchParams.set('level', params.level);
    if (params?.coachId) searchParams.set('coachId', params.coachId);
    if (params?.locationId) searchParams.set('locationId', params.locationId);
    
    return this.request<any>(`/classes/sessions?${searchParams}`);
  }

  // Coaches API
  async getCoaches(specialty?: string) {
    const searchParams = new URLSearchParams();
    if (specialty) searchParams.set('specialty', specialty);
    
    return this.request<any>(`/coaches?${searchParams}`);
  }

  async getCoach(id: string) {
    return this.request<any>(`/coaches/${id}`);
  }

  async getCoachAvailability(id: string, from?: string, to?: string) {
    const searchParams = new URLSearchParams();
    if (from) searchParams.set('from', from);
    if (to) searchParams.set('to', to);
    
    return this.request<any>(`/coaches/${id}/availability?${searchParams}`);
  }

  // Auth API
  async login(email: string, password: string) {
    return this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) {
    return this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User API
  async getProfile() {
    return this.request<any>('/me');
  }

  async getUserBookings() {
    return this.request<any>('/me/bookings');
  }

  async getUserOrders() {
    return this.request<any>('/me/orders');
  }

  // Booking API
  async createBooking(userId: string, sessionId: string) {
    return this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify({ userId, sessionId }),
    });
  }

  async cancelBooking(bookingId: string) {
    return this.request<any>(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  }

  // Shop API
  async getProductCategories() {
    return this.request<any>('/shop/categories');
  }

  async getProducts(params?: {
    query?: string;
    categoryId?: string;
    inStock?: boolean;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.query) searchParams.set('query', params.query);
    if (params?.categoryId) searchParams.set('categoryId', params.categoryId);
    if (params?.inStock) searchParams.set('inStock', params.inStock.toString());
    if (params?.sort) searchParams.set('sort', params.sort);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    return this.request<any>(`/shop/products?${searchParams}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/shop/products/${id}`);
  }

  // Private Sessions API
  async createPrivateSession(sessionData: {
    userId: string;
    coachId: string;
    startAt: string;
    endAt: string;
    notes?: string;
  }) {
    return this.request<any>('/private-sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getWhatsAppConfig() {
    return this.request<WhatsAppConfig>('/shop/whatsapp-config');
  }

  // Membership Plans API
  async getMembershipPlans() {
    return this.request<any>('/memberships/plans');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);