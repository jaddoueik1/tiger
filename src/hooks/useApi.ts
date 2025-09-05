import { apiClient } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Content hooks
export const useContent = (key: string, locale = 'en') => {
  return useQuery({
    queryKey: ['content', key, locale],
    queryFn: () => apiClient.getContent(key, locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Classes hooks
export const useDisciplines = () => {
  return useQuery({
    queryKey: ['disciplines'],
    queryFn: () => apiClient.getDisciplines(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useClassTemplates = (params?: {
  discipline?: string;
  level?: string;
  coachId?: string;
}) => {
  return useQuery({
    queryKey: ['class-templates', params],
    queryFn: () => apiClient.getClassTemplates(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useClassSessions = (params?: {
  from?: string;
  to?: string;
  discipline?: string;
  level?: string;
  coachId?: string;
  locationId?: string;
}) => {
  return useQuery({
    queryKey: ['class-sessions', params],
    queryFn: () => apiClient.getClassSessions(params),
    staleTime: 1 * 60 * 1000, // 1 minute for real-time capacity
  });
};

// Coaches hooks
export const useCoaches = (specialty?: string) => {
  return useQuery({
    queryKey: ['coaches', specialty],
    queryFn: () => apiClient.getCoaches(specialty),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCoach = (id: string) => {
  return useQuery({
    queryKey: ['coach', id],
    queryFn: () => apiClient.getCoach(id),
    staleTime: 10 * 60 * 1000,
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
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiClient.getProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiClient.getProduct(id),
    staleTime: 5 * 60 * 1000,
  });
};

// Membership Plans hook
export const useMembershipPlans = () => {
  return useQuery({
    queryKey: ['membership-plans'],
    queryFn: () => apiClient.getMembershipPlans(),
    staleTime: 10 * 60 * 1000,
  });
};

// Booking mutations
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, sessionId }: { userId: string; sessionId: string }) =>
      apiClient.createBooking(userId, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
    },
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

// WhatsApp Order Types and Functions
type Any = Record<string, any>;

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  note?: string;
};

export type WhatsAppConfig = {
  phoneE164: string;     // e.g. "+96171234567"
  template?: string;     // "Order {orderId}\n{name}\n{items}\nTotal: {total} {currency}"
};

export type PlaceOrderArgs = {
  customer: Customer;
  items: Product[];
  currency?: string;     // default 'USD'
  orderId?: string;      // optional explicit ID
  orderIdPrefix?: string;// default 'TEMP-'
  clearCart?: () => void;// optional side-effect after opening WA
};

export type UseWhatsAppOrderOptions = {
  apiBase?: string;      // default process.env.NEXT_PUBLIC_API_BASE
  config?: WhatsAppConfig;      // pass to skip fetching from BE
  fetchConfig?: boolean;        // default true (ignored if config provided)
  openWindow?: (url: string) => void; // default window.open
};

function onlyDigitsPhone(e164: string) {
  return (e164 || '').replace(/[^\d]/g, '');
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
  }
) {
  const fallback =
    `Hello, I'd like to place an order.\n\n` +
    `Order: ${vars.orderId}\n` +
    `Name: ${vars.name}\n` +
    `Phone: ${vars.phone}\n` +
    `Email: ${vars.email}\n` +
    `Address: ${vars.address}\n` +
    (vars.note ? `Note: ${vars.note}\n` : '') +
    `\nItems:\n${vars.itemsText}\n\n` +
    `Total: *${vars.total} ${vars.currency}*`;

  if (!cfg?.template) return fallback;

  // Simple {placeholder} replacement
  return cfg.template.replace(/\{(\w+)\}/g, (_, k) => {
    const map: Any = {
      orderId: vars.orderId,
      name: vars.name,
      email: vars.email,
      phone: vars.phone,
      address: vars.address,
      note: vars.note ?? '',
      items: vars.itemsText,
      total: vars.total,
      currency: vars.currency,
    };
    return (map[k] ?? '').toString();
  });
}

export function useWhatsAppOrder(opts?: UseWhatsAppOrderOptions) {
  // If a config is passed, we skip fetching (same pattern you use with params-enabled queries)
  const shouldFetch = !opts?.config;

  const { data: fetchedConfig, isLoading: isConfigLoading } = useQuery({
    queryKey: ['shop', 'whatsapp-config'],
    queryFn: () => apiClient.getWhatsAppConfig(),
    staleTime: 10 * 60 * 1000,
    enabled: shouldFetch,
  });

  const config: WhatsAppConfig | undefined = opts?.config ?? fetchedConfig?.data;

  const mutation = useMutation({
    mutationFn: async ({
      customer,
      items,
      currency = 'USD',
      orderId,
      orderIdPrefix = 'TEMP-',
      clearCart,
    }: PlaceOrderArgs) => {
      if (!config?.phoneE164) throw new Error('WhatsApp phone number is not configured.');
      if (!items?.length) throw new Error('Cart is empty.');

      const totalNum = items.reduce((s, it) => s + it.price * it.quantity, 0);
      const orderIdFinal = orderId ?? `${orderIdPrefix}${Date.now()}`;

      const itemsText = items
        .map(
          (it) =>
            `• ${it.name} × ${it.quantity} — ${(it.price * it.quantity).toFixed(2)} ${currency}`
        )
        .join('\n');

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
      const waUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

      (opts?.openWindow ?? ((url: string) => window.open(url, '_blank', 'noopener,noreferrer')))(
        waUrl
      );

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