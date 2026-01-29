import { apiClient } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Content hooks
export const useContent = (key: string, locale = "en") => {
	return useQuery({
		queryKey: ["content", key, locale],
		queryFn: () => apiClient.getContent(key, locale),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Classes hooks
export const useDisciplines = () => {
	return useQuery({
		queryKey: ["disciplines"],
		queryFn: () => apiClient.getDisciplines(),
		staleTime: 10 * 60 * 1000,
	});
};

export const useMyEvaluations = () => {
	return useQuery({
		queryKey: ["my-evaluations"],
		queryFn: () => apiClient.getMyEvaluations(),
	});
};

export const useClassTemplates = () => {
	return useQuery({
		queryKey: ["class-templates"],
		queryFn: () => apiClient.getClassTemplates(),
		staleTime: 5 * 60 * 1000,
	});
};

export const useClassTemplate = (slug: string) => {
	return useQuery({
		queryKey: ["class-template", slug],
		queryFn: () => apiClient.getClassTemplate(slug),
		staleTime: 5 * 60 * 1000,
		enabled: !!slug,
	});
};

export const useClassTemplateById = (id: string) => {
	return useQuery({
		queryKey: ["class-template", id],
		queryFn: () => apiClient.getClassTemplateById(id),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
};

// Class Sessions - using booked sessions filtered for non-private
export const useClassSessions = (filters?: {
	startDate?: Date;
	endDate?: Date;
	disciplineId?: string;
}) => {
	const { startDate, endDate, disciplineId } = filters || {};

	const shouldFetch = !!startDate && !!endDate;

	const { data: sessionsData, isLoading } = useQuery({
		queryKey: [
			"all-coaches-booked-sessions",
			startDate?.toISOString(),
			endDate?.toISOString(),
		],
		queryFn: () => {
			if (!startDate || !endDate) return Promise.resolve({ data: [] });
			return apiClient.getCoachBookedSessionsRange(
				startDate.toISOString(),
				endDate.toISOString(),
			);
		},
		staleTime: 5 * 60 * 1000,
		enabled: shouldFetch,
	});

	// Backend now returns flattened list
	let filteredSessions = sessionsData?.data || [];

	// Apply other filters if necessary (backend handles date range & private filtering)
	if (disciplineId) {
		filteredSessions = filteredSessions.filter(
			(session: any) => session.disciplineId === disciplineId,
		);
	}

	return {
		data: { data: filteredSessions },
		isLoading,
	};
};
// Coaches hooks
export const useCoaches = (specialty?: string) => {
	return useQuery({
		queryKey: ["coaches", specialty],
		queryFn: () => apiClient.getCoaches(specialty),
		staleTime: 10 * 60 * 1000,
	});
};

export const useCoach = (id: string) => {
	return useQuery({
		queryKey: ["coach", id],
		queryFn: () => apiClient.getCoach(id),
		staleTime: 10 * 60 * 1000,
		enabled: !!id,
	});
};

export const useCoachBookedSessions = (id: string) => {
	return useQuery({
		queryKey: ["coach-booked-sessions", id],
		queryFn: () => apiClient.getCoachBookedSessions(id),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
};

export const useCoachSessions = (
	id: string,
	startDate?: Date,
	endDate?: Date,
) => {
	return useQuery({
		queryKey: [
			"coach-sessions",
			id,
			startDate?.toISOString(),
			endDate?.toISOString(),
		],
		queryFn: () => {
			if (!id || !startDate || !endDate) return Promise.resolve({ data: [] });
			return apiClient.getCoachSessionsInRange(
				id,
				startDate.toISOString(),
				endDate.toISOString(),
			);
		},
		staleTime: 5 * 60 * 1000,
		enabled: !!id && !!startDate && !!endDate,
	});
};

// Products hooks
export const useProducts = (params?: {
	query?: string;
	categoryId?: string;
	inStock?: boolean;
	sort?: string;
	page?: number;
	limit?: number;
}) => {
	console.log(params);
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => apiClient.getProducts(params),
		staleTime: 5 * 60 * 1000,
	});
};

export const useProduct = (id: string) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => apiClient.getProduct(id),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
};

export const useProductCategories = () => {
	return useQuery({
		queryKey: ["product-categories"],
		queryFn: () => apiClient.getProductCategories(),
		staleTime: 10 * 60 * 1000,
	});
};

// Membership Plans hook
export const useMembershipPlans = () => {
	return useQuery({
		queryKey: ["membership-plans"],
		queryFn: () => apiClient.getMembershipPlans(),
		staleTime: 10 * 60 * 1000,
	});
};

// Auth hooks
export const useLogin = () => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			apiClient.login(email, password),
		onSuccess: (response) => {
			apiClient.setToken(response.data.token);
		},
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: (userData: {
			email: string;
			password: string;
			name: string;
			phone?: string;
		}) => apiClient.register(userData),
		onSuccess: (response) => {
			apiClient.setToken(response.data.token);
		},
	});
};

// User hooks
export const useProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: () => apiClient.getProfile(),
		staleTime: 5 * 60 * 1000,
	});
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { name?: string; phone?: string }) =>
			apiClient.updateProfile(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			queryClient.invalidateQueries({ queryKey: ["auth-check"] }); // Assuming there might be auth check query
		},
	});
};

export const useChangePassword = () => {
	return useMutation({
		mutationFn: (password: string) => apiClient.changePassword(password),
	});
};

export const useUserBookings = () => {
	return useQuery({
		queryKey: ["user-bookings"],
		queryFn: () => apiClient.getUserBookings(),
		staleTime: 1 * 60 * 1000, // 1 minute for real-time updates
	});
};

export const useUserOrders = () => {
	return useQuery({
		queryKey: ["user-orders"],
		queryFn: () => apiClient.getUserOrders(),
		staleTime: 5 * 60 * 1000,
	});
};

// WhatsApp Order Types and Functions
export type Customer = {
	name: string;
	email: string;
	phone: string;
	address: string;
	note?: string;
};

export type WhatsAppConfig = {
	phoneE164: string;
	template?: string;
};

export type PlaceOrderArgs = {
	customer: Customer;
	items: Array<{
		id: string;
		name: string;
		price: number;
		quantity: number;
	}>;
	currency?: string;
	orderId?: string;
	orderIdPrefix?: string;
	clearCart?: () => void;
};

export type UseWhatsAppOrderOptions = {
	apiBase?: string;
	config?: WhatsAppConfig;
	fetchConfig?: boolean;
	openWindow?: (url: string) => void;
};

function onlyDigitsPhone(e164: string) {
	return (e164 || "").replace(/[^\d]/g, "");
}

export function buildWhatsAppMessage(
	cfg: WhatsAppConfig | undefined,
	vars: {
		orderId: string;
		name: string;
		email: string;
		phone: string;
		address: string;
		note?: string;
		itemsText: string;
		total: string;
		currency: string;
	},
) {
	const fallback =
		`Hello, I'd like to place an order.\n\n` +
		`Order: ${vars.orderId}\n` +
		`Name: ${vars.name}\n` +
		`Phone: ${vars.phone}\n` +
		`Email: ${vars.email}\n` +
		`Address: ${vars.address}\n` +
		(vars.note ? `Note: ${vars.note}\n` : "") +
		`\nItems:\n${vars.itemsText}\n\n` +
		`Total: *${vars.total} ${vars.currency}*`;

	if (!cfg?.template) return fallback;

	// Simple {placeholder} replacement
	return cfg.template.replace(/\{(\w+)\}/g, (_, k) => {
		const map: Record<string, any> = {
			orderId: vars.orderId,
			name: vars.name,
			email: vars.email,
			phone: vars.phone,
			address: vars.address,
			note: vars.note ?? "",
			items: vars.itemsText,
			total: vars.total,
			currency: vars.currency,
		};
		return (map[k] ?? "").toString();
	});
}

export function useWhatsAppOrder(opts?: UseWhatsAppOrderOptions) {
	const shouldFetch = !opts?.config;

	const { data: fetchedConfig, isLoading: isConfigLoading } = useQuery({
		queryKey: ["shop", "whatsapp-config"],
		queryFn: () => apiClient.getWhatsAppConfig(),
		staleTime: 10 * 60 * 1000,
		enabled: shouldFetch,
	});

	const config: WhatsAppConfig | undefined =
		opts?.config ?? fetchedConfig?.data;

	const mutation = useMutation({
		mutationFn: async ({
			customer,
			items,
			currency = "USD",
			orderId,
			orderIdPrefix = "TEMP-",
			clearCart,
		}: PlaceOrderArgs) => {
			if (!config?.phoneE164)
				throw new Error("WhatsApp phone number is not configured.");
			if (!items?.length) throw new Error("Cart is empty.");

			const totalNum = items.reduce((s, it) => s + it.price * it.quantity, 0);
			const orderIdFinal = orderId ?? `${orderIdPrefix}${Date.now()}`;

			const itemsText = items
				.map(
					(it) =>
						`• ${it.name} × ${it.quantity} — ${(it.price * it.quantity).toFixed(
							2,
						)} ${currency}`,
				)
				.join("\n");

			const message = buildWhatsAppMessage(config, {
				orderId: orderIdFinal,
				name: customer.name,
				email: customer.email,
				phone: customer.phone,
				address: customer.address,
				note: customer.note,
				itemsText,
				total: totalNum.toFixed(2),
				currency,
			});

			const phoneDigits = onlyDigitsPhone(config.phoneE164);
			const waUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
				message,
			)}`;

			(
				opts?.openWindow ??
				((url: string) => window.open(url, "_blank", "noopener,noreferrer"))
			)(waUrl);

			if (clearCart) {
				try {
					clearCart();
				} catch {
					/* ignore */
				}
			}

			return { orderId: orderIdFinal, url: waUrl };
		},
	});

	return {
		placeOrder: mutation.mutate,
		placeOrderAsync: mutation.mutateAsync,
		isPlacing: mutation.isPending,
		error: mutation.error as Error | null,
		config,
		isConfigLoading,
	};
}

// Private Session Booking Hook
export const usePrivateSessionBooking = () => {
	const { config, isConfigLoading } = useWhatsAppOrder();

	const mutation = useMutation({
		mutationFn: (bookingData: {
			coachName: string;
			name: string;
			email: string;
			phone: string;
			preferredDate: string;
			preferredTime: string;
			notes?: string;
			hourlyRate?: number;
			mainInterest?: string;
			goal?: string;
			medicalInformation?: string;
			dailyRoutine?: string;
			physicalActivity?: string;
			nutrition?: string;
		}) => {
			if (!config?.phoneE164) {
				throw new Error("WhatsApp contact number is not configured.");
			}

			const message = `Hello! I'd like to book a private training session.

📋 *Booking Details:*
Coach: ${bookingData.coachName}
Date: ${bookingData.preferredDate}
Time: ${bookingData.preferredTime}
${bookingData.hourlyRate ? `Rate: $${bookingData.hourlyRate}/hour` : ""}

👤 *Contact Information:*
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

💰 *Payment Method:* Cash (pay at gym)

${
	bookingData.mainInterest
		? `🥊 *Main Interest:* ${bookingData.mainInterest}\n\n`
		: ""
}${bookingData.goal ? `🎯 *Main Goal:* ${bookingData.goal}\n\n` : ""}${
				bookingData.medicalInformation
					? `🏥 *Medical Information:*\n${bookingData.medicalInformation}\n\n`
					: ""
			}${
				bookingData.dailyRoutine
					? `📅 *Daily Routine:*\n${bookingData.dailyRoutine}\n\n`
					: ""
			}${
				bookingData.physicalActivity
					? `💪 *Physical Activity:*\n${bookingData.physicalActivity}\n\n`
					: ""
			}${
				bookingData.nutrition
					? `🥗 *Diet Habits:*\n${bookingData.nutrition}\n\n`
					: ""
			}${
				bookingData.notes
					? `📝 *Additional Notes:*\n${bookingData.notes}\n\n`
					: ""
			}Please confirm availability and let me know the next steps.`;

			const phoneDigits = config.phoneE164.replace(/[^\d]/g, "");
			const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
				message,
			)}`;

			window.open(whatsappUrl, "_blank", "noopener,noreferrer");

			return Promise.resolve({ success: true });
		},
	});

	return {
		bookPrivateSession: mutation.mutateAsync,
		isBooking: mutation.isPending,
		error: mutation.error,
		isConfigLoading,
		config,
	};
};

// Cart mutations
export const useCreateCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ userId, items }: { userId: string; items: any[] }) =>
			apiClient.createCart(userId, items),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
};

// Admin hooks
export const useAdminContent = (locale = "en") => {
	return useQuery({
		queryKey: ["admin-content", locale],
		queryFn: () => apiClient.adminListContent(locale),
		staleTime: 5 * 60 * 1000,
	});
};

export const useAdminDisciplines = () => {
	return useQuery({
		queryKey: ["admin-disciplines"],
		queryFn: () => apiClient.adminListDisciplines(),
		staleTime: 5 * 60 * 1000,
	});
};

export const useAdminClassTemplates = () => {
	return useQuery({
		queryKey: ["admin-class-templates"],
		queryFn: () => apiClient.adminListClassTemplates(),
		staleTime: 5 * 60 * 1000,
	});
};

export const useAdminProductCategories = () => {
	return useQuery({
		queryKey: ["admin-product-categories"],
		queryFn: () => apiClient.adminListProductCategories(),
		staleTime: 5 * 60 * 1000,
	});
};
