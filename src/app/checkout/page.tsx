// src/app/checkout/page.tsx
'use client';

import { useContent, useWhatsAppOrder } from '@/hooks/useApi';
import { useCartStore } from '@/store/cartStore';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

type Any = Record<string, any>;

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: 'cash' | 'card';
};
type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const v = {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    address: values.address.trim(),
  };
  const errors: FormErrors = {};
  if (!v.name) errors.name = 'Please enter your full name.';
  if (!v.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    errors.email = 'Please enter a valid email.';
  }
  // simple phone check: digits (allow +, spaces, dashes); at least 8 digits total
  const digitCount = (v.phone.match(/\d/g) || []).length;
  if (!v.phone || digitCount < 8) errors.phone = 'Please enter a valid phone number.';
  if (!v.address) errors.address = 'Please enter your delivery address.';
  return errors;
}

export default function CheckoutPage() {
  const { data: labelsRes } = useContent('checkout.page');
  const L = labelsRes?.data ?? {};

  // Cart (store → Product: { id, name, price, quantity })
  const products = useCartStore((s: Any) => s.products) as Any[];
  const currency = 'USD';

  const items = (Array.isArray(products) ? products : []).map((p, idx) => ({
    id: p.id ?? p.productId ?? p.sku ?? String(idx),
    name: p.name ?? p.title ?? 'Item',
    price: Number(p.price ?? p.unitPrice ?? 0),
    quantity: Number(p.quantity ?? p.qty ?? 1),
    image: p.image ?? p.imageUrl ?? p.thumbnail ?? undefined, // UI only
  }));

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  // Form state
  const [form, setForm] = React.useState<FormState>({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cash',
  });
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormState, boolean>>>({});
  const errors = validate(form);
  const isFormValid = Object.keys(errors).length === 0;

  // WA order hook
  const { placeOrder, isPlacing, config, isConfigLoading } = useWhatsAppOrder();
  const canPlace = items.length > 0 && !isConfigLoading && !!config?.phoneE164 && isFormValid;

  const handleBlur = (key: keyof FormState) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = () => {
    // mark all touched to show errors if any
    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
      note: touched.note ?? false,
      paymentMethod: touched.paymentMethod ?? false,
    });
    if (!isFormValid) return;

    // Send trimmed values so WhatsApp message is clean
    const clean = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      note: form.note.trim(),
      paymentMethod: form.paymentMethod,
    };

    if (clean.paymentMethod === 'cash') {
      placeOrder({ customer: clean, items, currency });
    } else {
      // Card payment would go here when implemented
      alert('Card payment coming soon!');
    }
  };

  return (
    <main className="bg-bg text-text">
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-8">
          {/* Left: Customer details */}
          <div className="lg:col-span-2">
            <div className="text-center md:text-left mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{L.title ?? 'Checkout'}</h1>
              {L.subtitle && <p className="text-text-muted mt-2">{L.subtitle}</p>}
            </div>

            <div className="card p-6 space-y-5">
              <Field
                label={L.fields?.name ?? 'Full name'}
                value={form.name}
                onChange={(v) => setForm((s) => ({ ...s, name: v }))}
                onBlur={() => handleBlur('name')}
                error={touched.name ? errors.name : undefined}
                required
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  label={L.fields?.email ?? 'Email'}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                  onBlur={() => handleBlur('email')}
                  error={touched.email ? errors.email : undefined}
                  required
                />
                <Field
                  label={L.fields?.phone ?? 'Phone'}
                  value={form.phone}
                  onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                  onBlur={() => handleBlur('phone')}
                  error={touched.phone ? errors.phone : undefined}
                  required
                />
              </div>
              <Field
                label={L.fields?.address ?? 'Delivery address'}
                value={form.address}
                onChange={(v) => setForm((s) => ({ ...s, address: v }))}
                onBlur={() => handleBlur('address')}
                error={touched.address ? errors.address : undefined}
                required
              />
              <Field
                label={L.fields?.note ?? 'Note (optional)'}
                value={form.note}
                onChange={(v) => setForm((s) => ({ ...s, note: v }))}
                onBlur={() => handleBlur('note')}
                textarea
              />

              {/* Payment Method */}
              <div>
                <label className="block mb-2 text-sm text-text-muted">
                  Payment Method *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={form.paymentMethod === 'cash'}
                      onChange={(e) => setForm((s) => ({ ...s, paymentMethod: e.target.value as 'cash' | 'card' }))}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-3 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-xs">$</span>
                      </div>
                      <div>
                        <div className="font-medium text-text">Pay with Cash</div>
                        <div className="text-sm text-text-muted">Pay on delivery</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-not-allowed opacity-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      disabled
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-3 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">💳</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-400">Pay with Card</div>
                        <div className="text-sm text-gray-400">Coming soon</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order summary */}
          <aside className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">
                {L.summary?.title ?? 'Order summary'}
              </h2>

              {items.length === 0 ? (
                <p className="text-text-muted">
                  {L.summary?.empty ?? 'Your cart is empty.'}
                </p>
              ) : (
                <>
                  <ul className="space-y-3">
                    {items.map((it) => (
                      <li key={it.id} className="flex gap-3">
                        {it.image && (
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-14 h-14 rounded object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{it.name}</div>
                          <div className="text-xs text-text-muted">x{it.quantity}</div>
                        </div>
                        <div className="text-sm whitespace-nowrap">
                          {(it.price * it.quantity).toFixed(2)} {currency}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="my-4 h-px bg-white/10" />
                  <TotalsRow
                    bold
                    label={L.summary?.total ?? 'Total'}
                    value={total}
                    currency={currency}
                  />
                </>
              )}

              <button
                disabled={!canPlace || isPlacing}
                onClick={handleSubmit}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 disabled:opacity-50"
              >
                {isPlacing && <Loader2 className="w-4 h-4 animate-spin" />}
                {form.paymentMethod === 'cash' 
                  ? (L.actions?.placeOrder ?? 'Place order via WhatsApp')
                  : 'Place order'
                }
              </button>

              {!isConfigLoading && !config?.phoneE164 && (
                <p className="mt-3 text-xs text-red-500">
                  WhatsApp number not configured in backend.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* UI bits */
function Field({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  textarea,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  textarea?: boolean;
  error?: string;
  required?: boolean;
}) {
  const base =
    'w-full rounded-xl px-3 py-2 bg-surface ' +
    (error
      ? 'border border-red-500 focus-visible:border-red-500 focus-visible:ring-red-400/40 '
      : 'border border-secondary/30 dark:border-white/15 focus-visible:border-primary focus-visible:ring-primary/40 ') +
    'outline-none focus-visible:ring-2 placeholder:text-text-muted/60 transition-colors';

  return (
    <label className="block">
      <span className="block mb-2 text-sm text-text-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          className={`${base} min-h-[100px]`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          className={base}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}

function TotalsRow({
  label,
  value,
  currency,
  bold,
}: {
  label: string;
  value: number;
  currency: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm mt-2">
      <span className={bold ? 'font-semibold' : ''}>{label}</span>
      <span className={bold ? 'font-semibold' : ''}>
        {value.toFixed(2)} {currency}
      </span>
    </div>
  );
}
