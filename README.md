# Tiger Muay Thai - Complete Gym Management Website

A production-ready MMA gym website built with Next.js frontend and Express.js backend. Features class booking, e-commerce, private training scheduling, and comprehensive admin tools.

## 🎨 Color Palette (Extracted from Gym Images)

The color system is based on authentic gym imagery:

- **Primary Red (#DC2626)**: From logo and gym equipment - represents energy and strength
- **Secondary Charcoal (#1F2937)**: From training mats - provides grounding and professionalism  
- **Accent Green (#10B981)**: From turf and plants - adds vitality and growth
- **Backgrounds**: Clean whites and warm neutrals for readability
- **Text**: High contrast charcoals ensuring WCAG AA compliance

## ✨ Features

### Core Functionality
- **API-First Content**: All text, menus, and page content loaded from `/content` endpoints
- **Real-time Class Booking**: Live capacity tracking, waitlist management, email confirmations
- **Private Training**: Coach availability calendar with dynamic pricing and Stripe payments
- **E-commerce Shop**: Full product catalog with variants, inventory, cart, and checkout
- **Multi-role Authentication**: Guest, member, coach, and admin access levels
- **Responsive Design**: Mobile-first approach with breakpoints for all devices

### Technical Features
- **TypeScript**: Full type safety across frontend and backend
- **Real-time Updates**: React Query for caching and real-time data synchronization
- **SEO Optimized**: Dynamic metadata, JSON-LD structured data, sitemap generation
- **Performance**: Image optimization, code splitting, and aggressive caching
- **Accessibility**: WCAG AA compliance with keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and install all dependencies**:
   ```bash
   git clone <repository-url>
   cd tiger-muay-thai
   npm run install:all
   ```

2. **Environment setup for both frontend and server**:
   ```bash
   cp frontend/.env.example frontend/.env
   cp server/.env.example server/.env
   # Edit both .env files with your configuration
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Seed the database**:
   ```bash
   npm run seed
   ```

5. **Start development servers**:
   ```bash
   npm run dev
   ```
   This starts both the Next.js frontend (port 3000) and Express.js API server (port 3001).

## 📁 Project Structure

```
├── frontend/                     # Next.js frontend application
│   ├── src/
│   ├── app/                      # App Router pages
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities and configurations
│   ├── store/                    # State management (Zustand)
│   └── styles/                   # Global styles and Tailwind
├── server/                       # Express.js API server  
│   ├── config/                   # Database and app configuration
│   ├── data/                     # Seed data files
│   ├── models/                   # MongoDB/Mongoose models
│   ├── routes/                   # API route handlers
│   ├── seeders/                  # Database seeders
│   ├── services/                 # Business logic layer
│   └── types/                    # TypeScript type definitions
```

## 🛠 API Documentation

### Development
- **Swagger UI**: http://localhost:3001/api/docs  
- **Health Check**: http://localhost:3001/health
- **Frontend**: http://localhost:3000

### Key Endpoints

#### Content Management
```
GET /api/content/{key}?locale=en    # Get content blocks
GET /api/content/seo/{path}         # Get SEO metadata
```

#### Classes & Booking
```
GET /api/classes/disciplines        # List martial arts disciplines
GET /api/classes/templates          # List class templates with filters
GET /api/classes/sessions           # List scheduled sessions with real-time capacity
POST /api/bookings                  # Create class booking
DELETE /api/bookings/{id}           # Cancel booking
```

#### Coaches & Private Training
```
GET /api/coaches                    # List active coaches
GET /api/coaches/{id}/availability  # Get coach availability slots
POST /api/private-sessions          # Book private training session
```

#### E-commerce
```
GET /api/shop/products             # List products with filters
POST /api/cart                     # Create/update shopping cart
POST /api/checkout/create-intent   # Create Stripe payment intent
```

## 🏃‍♂️ Demo Workflows

### 1. Class Booking Flow
1. Browse `/schedule` page
2. Select a class with available spots
3. Click "Book Now" 
4. Login/register if needed
5. Confirm booking with membership validation
6. Receive confirmation email (mock)

### 2. Private Training Flow  
1. Visit `/private-training`
2. Select preferred coach
3. Choose available time slot from calendar
4. Enter session details and preferences
5. Complete payment via Stripe test mode
6. Receive booking confirmation

### 3. E-commerce Flow
1. Browse `/shop` with category filters
2. Select product and variant (size, color)
3. Add to cart with quantity
4. Review cart and apply promo codes
5. Guest or member checkout
6. Complete payment with Stripe
7. Receive order confirmation and tracking

## 🧪 Testing

### Stripe Test Mode
Use these test cards in checkout:
- **Success**: `4242424242424242`
- **Requires SCA**: `4000002500003155`  
- **Declined**: `4000000000000002`

### Demo Accounts
- **Admin**: admin@apexmma.com / admin123
- **Member**: member@example.com / member123

## 🎯 Performance Targets

- **Lighthouse Scores**: 
  - Performance: >85
  - Accessibility: >95  
  - Best Practices: >95
  - SEO: >95
- **Core Web Vitals**:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

## 🚢 Deployment

### Development
```bash
npm run dev              # Start both frontend and server
npm run dev:frontend     # Frontend only (Next.js)
npm run dev:server       # Server only (Express.js)
```

### Production Build
```bash
npm run build            # Build both frontend and server
npm run start            # Start both in production mode
```

### Database Operations
```bash
npm run seed             # Seed database with sample data
```

## 🔧 Configuration

### Environment Variables
See `frontend/.env.example` and `server/.env.example` for configuration. Key variables:

**Server:**
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secure token for authentication
- `STRIPE_SECRET_KEY`: Stripe payments (test mode)
- `FRONTEND_URL`: CORS configuration
- `SMTP_*`: Email service configuration

**Frontend:**
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_FRONTEND_URL`: Frontend URL for redirects

### Customization

#### Branding
- Update logo in `frontend/src/components/layout/Header.tsx`
- Modify color palette in `frontend/tailwind.config.js` and `frontend/src/styles/globals.css`
- Edit content via `/content` API endpoints

#### Payment Processing
- Configure Stripe webhooks in production
- Update pricing in `server/data/memberships.ts`  
- Customize checkout flow in frontend shop components

#### Database
- Modify models in `server/models/`
- Update seeders in `server/seeders/`
- Add new API endpoints in `server/routes/`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Guide](https://tanstack.com/query/latest)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)
- [Stripe Integration Guide](https://stripe.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.