const isProd = false;
const API_BASE_URL = isProd
	? "https://api.tigermuaythai.me"
	: "http://localhost:3001";

import { Evaluation } from "@/types/evaluation";

export interface ApiResponse<T> {
	data: T;
	meta?: {
		page?: number;
		limit?: number;
		total?: number;
		totalPages?: number;
	};
}

export interface ApiError {
	error: string;
	message: string;
	statusCode?: number;
	details?: any;
}

class ApiClient {
	private baseUrl: string;
	private token: string | null = null;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
		if (typeof window !== "undefined") {
			this.token = localStorage.getItem("auth_token");
		}
	}

	setToken(token: string) {
		this.token = token;
		if (typeof window !== "undefined") {
			localStorage.setItem("auth_token", token);
		}
	}

	clearToken() {
		this.token = null;
		if (typeof window !== "undefined") {
			localStorage.removeItem("auth_token");
		}
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${endpoint}`;

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		if (options.headers) {
			Object.assign(headers, options.headers);
		}

		if (this.token) {
			headers["Authorization"] = `Bearer ${this.token}`;
		}

		const response = await fetch(url, {
			...options,
			headers,
		});

		if (!response.ok) {
			const errorData: ApiError = await response.json().catch(() => ({
				error: "Network Error",
				message: "Failed to parse error response",
				statusCode: response.status,
			}));
			throw errorData;
		}

		return response.json();
	}

	// Health check
	async getHealth() {
		return this.request<{ status: string; timestamp: string }>("/health");
	}

	// Content API
	async getContent(key: string, locale = "en") {
		return this.request<any>(`/api/content/${key}?locale=${locale}`);
	}

	async updateContent(key: string, json: any, locale = "en") {
		return this.request<any>(`/api/content/${key}`, {
			method: "PUT",
			body: JSON.stringify({ json, locale }),
		});
	}

	async deleteContent(key: string, locale = "en") {
		return this.request<any>(`/api/content/${key}?locale=${locale}`, {
			method: "DELETE",
		});
	}

	// Auth API
	async login(email: string, password: string) {
		return this.request<{ token: string; user: any }>("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
	}

	async changePassword(password: string) {
		return this.request<{ success: boolean }>("/api/auth/change-password", {
			method: "POST",
			body: JSON.stringify({ newPassword: password }),
		});
	}

	async register(userData: {
		email: string;
		password: string;
		name: string;
		phone?: string;
	}) {
		return this.request<{ token: string; user: any }>("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		});
	}

	// Classes API
	async getDisciplines() {
		return this.request<any[]>("/api/classes/disciplines");
	}

	async createDiscipline(discipline: any) {
		return this.request<any>("/api/classes/disciplines", {
			method: "POST",
			body: JSON.stringify(discipline),
		});
	}

	async updateDiscipline(id: string, discipline: any) {
		return this.request<any>(`/api/classes/disciplines/${id}`, {
			method: "PUT",
			body: JSON.stringify(discipline),
		});
	}

	async deleteDiscipline(id: string) {
		return this.request<{ success: boolean }>(
			`/api/classes/disciplines/${id}`,
			{
				method: "DELETE",
			}
		);
	}

	async getClassTemplates() {
		return this.request<any[]>("/api/classes/templates");
	}

	async getClassTemplateById(id: string) {
		return this.request<any>(`/api/classes/templates/${id}`);
	}

	async getClassTemplate(slug: string) {
		return this.request<any>(`/api/classes/templates/discipline/${slug}`);
	}

	async createClassTemplate(template: any) {
		return this.request<any>("/api/classes/templates", {
			method: "POST",
			body: JSON.stringify(template),
		});
	}

	async updateClassTemplate(id: string, template: any) {
		return this.request<any>(`/api/classes/templates/${id}`, {
			method: "PUT",
			body: JSON.stringify(template),
		});
	}

	async deleteClassTemplate(id: string) {
		return this.request<{ success: boolean }>(`/api/classes/templates/${id}`, {
			method: "DELETE",
		});
	}

	// Coaches API
	async getCoaches(specialty?: string) {
		const searchParams = new URLSearchParams();
		if (specialty) searchParams.set("specialty", specialty);

		return this.request<any[]>(`/api/coaches?${searchParams}`);
	}

	async getCoach(id: string) {
		return this.request<any>(`/api/coaches/${id}`);
	}

	async createCoach(coach: any) {
		return this.request<any>("/api/coaches", {
			method: "POST",
			body: JSON.stringify(coach),
		});
	}

	async updateCoach(id: string, coach: any) {
		return this.request<any>(`/api/coaches/${id}`, {
			method: "PUT",
			body: JSON.stringify(coach),
		});
	}

	async deleteCoach(id: string) {
		return this.request<{ success: boolean }>(`/api/coaches/${id}`, {
			method: "DELETE",
		});
	}

	async getCoachBookedSessions(id: string) {
		return this.request<any[]>(`/api/coaches/${id}/booked-sessions`);
	}

	async addCoachBookedSession(id: string, session: any) {
		return this.request<any>(`/api/coaches/${id}/booked-sessions`, {
			method: "POST",
			body: JSON.stringify(session),
		});
	}

	async getAllCoachBookedSessions() {
		return this.request<any[]>("/api/coaches/booked-sessions");
	}

	async getCoachBookedSessionsRange(startDate: string, endDate: string) {
		return this.request<any[]>(
			`/api/coaches/booked-sessions-range?startDate=${startDate}&endDate=${endDate}`
		);
	}

	// Membership Plans API
	async getMembershipPlans() {
		return this.request<any[]>("/api/membership-plans");
	}

	async getMembershipPlan(id: string) {
		return this.request<any>(`/api/membership-plans/${id}`);
	}

	async createMembershipPlan(plan: any) {
		return this.request<any>("/api/membership-plans", {
			method: "POST",
			body: JSON.stringify(plan),
		});
	}

	async updateMembershipPlan(id: string, plan: any) {
		return this.request<any>(`/api/membership-plans/${id}`, {
			method: "PUT",
			body: JSON.stringify(plan),
		});
	}

	async deleteMembershipPlan(id: string) {
		return this.request<any>(`/api/membership-plans/${id}`, {
			method: "DELETE",
		});
	}

	// Shop API
	async getProductCategories() {
		return this.request<any>(`/api/shop/categories`, {
			method: "GET",
		});
	}

	async getProducts(params?: {
		query?: string;
		categoryId?: string;
		inStock?: boolean;
		sort?: string;
		page?: number;
		limit?: number;
	}) {
		return this.request<any>(
			`/api/shop/products?page=${params?.page}&size=${params?.limit}&categoryId=${params?.categoryId}&inStock=${params?.inStock}&sort=${params?.sort}`,
			{
				method: "GET",
			}
		);
	}

	async getProduct(id: string) {
		return this.request<any>(`/api/shop/products/${id}`);
	}

	async createProduct(product: any) {
		return this.request<any>("/api/shop/products", {
			method: "POST",
			body: JSON.stringify(product),
		});
	}

	async updateProduct(id: string, product: any) {
		return this.request<any>(`/api/shop/products/${id}`, {
			method: "PUT",
			body: JSON.stringify(product),
		});
	}

	async deleteProduct(id: string) {
		return this.request<{ success: boolean }>(`/api/shop/products/${id}`, {
			method: "DELETE",
		});
	}

	async createCart(userId: string, items: any[]) {
		return this.request<any>("/api/shop/cart", {
			method: "POST",
			body: JSON.stringify({ userId, items }),
		});
	}

	async getWhatsAppConfig() {
		return this.request<{ phoneE164: string; template?: string }>(
			"/api/shop/whatsapp-config"
		);
	}

	// User API
	async getProfile() {
		return this.request<any>("/api/me");
	}

	async updateProfile(data: { name?: string; phone?: string }) {
		return this.request<any>("/api/me", {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async getUserBookings() {
		return this.request<any[]>("/api/me/bookings");
	}

	async getUserOrders() {
		return this.request<any[]>("/api/me/orders");
	}

	// Admin API
	async adminListContent(locale = "en") {
		return this.request<any[]>(`/api/admin/content?locale=${locale}`);
	}

	async adminListDisciplines() {
		return this.request<any[]>("/api/admin/disciplines");
	}

	async adminListClassTemplates() {
		return this.request<any[]>("/api/admin/class-templates");
	}

	async adminListProductCategories() {
		return this.request<any[]>("/api/admin/product-categories");
	}

	// Evaluations
	async getMyEvaluations(): Promise<Evaluation[]> {
		return (await this.request<Evaluation[]>("/api/evaluations/me")).data;
	}
}

export const apiClient = new ApiClient(API_BASE_URL);
