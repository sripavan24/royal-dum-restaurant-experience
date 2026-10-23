# Royal Dum Restaurant Experience

# Project: Royal Dum — Premium Biryani Restaurant Website UI

Design and build a complete, premium, modern, responsive frontend for an Indian biryani restaurant named **Royal Dum**.

IMPORTANT: Build ONLY the frontend UI. Do not implement a Django backend, database, API server, or real payment integration. Use realistic mock data for UI previews and demonstrate frontend interactions wherever possible.

The website will later connect to a Python Django REST Framework backend with PostgreSQL.

The goal is to create a visually impressive restaurant website with a premium customer experience and a separate admin dashboard.

# 1. TECH STACK

Use:
- React with TypeScript.
- Vite.
- Tailwind CSS.
- shadcn/ui.
- Lucide React icons.
- React Router for navigation.
- Local mock data for menu items, customers, and orders.
- React Context or an appropriate lightweight state-management approach for the shopping cart.
- LocalStorage for persisting the demo cart between page refreshes.

Keep the frontend code modular, reusable, and ready for future Django REST API integration.

# 2. BRAND AND VISUAL DESIGN

Restaurant name: Royal Dum

Tagline: "Every Grain Tells a Story."

Design inspiration:
Premium Indian dining, modern restaurant branding, editorial food photography, and sophisticated hospitality websites.

Color palette:
- Deep charcoal: #171513
- Dark brown: #282019
- Saffron gold: #D9A441
- Warm cream: #F8F2E8
- White: #FFFFFF
- Muted grey: #A9A29A
- Subtle borders: #3B332B

Typography:
- Playfair Display for premium headings.
- Inter for body text and interface elements.

Design requirements:
- Large, cinematic biryani photography.
- Premium visual hierarchy.
- Spacious layouts.
- Elegant gold accents.
- Beautiful typography.
- Subtle hover effects.
- Smooth transitions.
- Consistent spacing and alignment.
- Excellent mobile responsiveness.
- High-quality food cards.
- Professional loading, empty, and error states.

Avoid generic templates, excessive gradients, cluttered layouts, oversized rounded cards, and unnecessary animations.

The result should feel like a premium restaurant's official website.

# 3. CUSTOMER WEBSITE

Create the following pages with working frontend navigation.

## A. Home Page

Create a premium landing page.

### Navigation bar
Include:
- Royal Dum logo or elegant text-based logo.
- Home.
- Our Menu.
- Our Story.
- Contact.
- My Orders.
- Cart icon with item count.
- Login button or account menu.

Use a sticky navigation bar with a subtle dark translucent background.

On mobile, use a responsive menu drawer.

### Hero section

Create a full-width, cinematic hero section featuring a large, appetizing chicken dum biryani image.

Use a two-column layout on desktop and a carefully stacked layout on mobile.

Content:

Small label:
"AUTHENTIC INDIAN CUISINE"

Main heading:
"Royal Flavours. Timeless Tradition."

Description:
"Discover the art of authentic dum biryani, slow-cooked to perfection with fragrant basmati rice, handpicked spices, and recipes inspired by tradition."

Primary CTA:
"Explore Our Menu"

Secondary CTA:
"Discover Our Story"

Include subtle decorative patterns inspired by Indian architecture.

### Signature dishes

Display four premium food cards:
- Hyderabadi Chicken Dum Biryani.
- Royal Mutton Biryani.
- Paneer Biryani.
- Royal Family Biryani.

Each card includes:
- Food image.
- Name.
- Short description.
- Price in rupees.
- Bestseller badge where appropriate.
- Add to Cart button.

### Why Royal Dum?

Create three elegant feature sections:
- Authentic Dum Cooking.
- Carefully Selected Ingredients.
- Flavours Worth Remembering.

Use minimal icons and concise descriptions.

### Our Story

Create an editorial section with food photography and text about traditional biryani preparation.

Do not make unsupported claims about awards, history, or certifications.

### Customer Reviews

Show three sample testimonials, clearly treated as demonstration content until real reviews are available.

### Footer

Include:
- Logo and tagline.
- Navigation links.
- Restaurant contact placeholders.
- Opening hours placeholders.
- Social media icon placeholders.
- Copyright information.

# 4. MENU PAGE

Route: /menu

Create a visually rich menu browsing experience.

At the top, display:
"Discover Our Menu"

Subtitle:
"Prepared with passion. Served with pride."

Include category filter chips:
- All.
- Chicken Biryani.
- Mutton Biryani.
- Veg Biryani.
- Starters.
- Kebabs.
- Combos.
- Beverages.

Include:
- Search bar.
- Category filters.
- Sort by price.
- Responsive food grid.
- Food availability labels.
- Empty search state.

Each food card must show:
- High-quality image.
- Veg or non-veg indicator.
- Food name.
- Description.
- Price.
- Bestseller badge where applicable.
- Add to Cart button.

When a customer clicks a food card, open a food details modal or navigate to a detail page.

Use realistic demo menu data with prices in Indian rupees.

# 5. FOOD DETAILS MODAL

When a customer selects an item, display a premium modal containing:
- Large food image.
- Item name.
- Description.
- Price.
- Portion selection if available.
- Spice-level selection if available.
- Quantity controls.
- Add to Cart button.

Update the cart when the customer adds an item.

Only show customization options when they are configured in the mock data.

# 6. SHOPPING CART

Route: /cart

Build a polished cart page.

Include:
- Food thumbnail.
- Item name.
- Unit price.
- Quantity increment and decrement buttons.
- Remove item action.
- Subtotal.
- Discount row if applicable.
- Final total.
- Continue Shopping button.
- Proceed to Booking button.

Show a beautifully designed empty-cart state with an Explore Menu button.

Cart functionality must work using local frontend state.

Persist the cart in LocalStorage.

Do not include delivery tracking, delivery personnel, driver assignment, or delivery management.

Do not invent delivery charges.

# 7. CHECKOUT PAGE

Route: /checkout

Create a clean, premium booking form.

Customer details:
- Full name.
- Phone number.
- Email address, optional.
- Customer notes, optional.

Include:
- Order summary.
- Quantity and price breakdown.
- Total amount.
- Back to Cart button.
- Confirm Booking button.

Use client-side form validation.

When the customer submits the form:
1. Validate required fields.
2. Prevent repeated clicks while submitting.
3. Create a demonstration order in local frontend state.
4. Assign a mock order number.
5. Save the demo order in LocalStorage.
6. Navigate to the booking confirmation page.

Clearly separate this demo behavior from real order creation. No real booking is created until a backend is connected.

Payment integration is not required in this frontend prototype.

# 8. BOOKING CONFIRMATION PAGE

Route: /booking-success

Create an elegant confirmation screen.

Heading:
"Your Order Is Booked!"

Supporting text:
"Thank you for choosing Royal Dum. Your booking has been received in this demo experience."

Display:
- Order number.
- Customer name.
- Items ordered.
- Quantity.
- Total amount.
- Booking date.
- Booking status.

Buttons:
- View My Orders.
- Continue Shopping.

Use a subtle success animation or checkmark.

Do not show delivery tracking or promise delivery times.

# 9. MY ORDERS PAGE

Route: /my-orders

Create an attractive order history page.

Use mock data and demo orders created through the checkout flow.

Each order card should show:
- Order number.
- Date.
- Items.
- Total amount.
- Status badge.
- View Details button.

Include filters:
- All Orders.
- Placed.
- Confirmed.
- Completed.
- Cancelled.

Display a beautiful empty state when there are no orders.

For this frontend prototype, use demo state and LocalStorage. Make it clear that real customer authentication and private order retrieval will be implemented through Django later.

# 10. LOGIN AND REGISTRATION PAGES

Routes:
- /login
- /register

Design premium, consistent authentication pages.

Login:
- Email.
- Password.
- Password visibility toggle.
- Remember me checkbox.
- Login button.
- Link to registration.

Registration:
- Full name.
- Email.
- Phone number.
- Password.
- Confirm password.
- Create Account button.

Include:
- Client-side validation.
- Inline error messages.
- Loading indicators.
- Success and failure feedback.
- Responsive layouts.

Use a tasteful restaurant photograph or dark premium background.

These are frontend demo forms only. Do not pretend authentication is secure or real until connected to the backend.

# 11. ADMIN DASHBOARD UI

Create a separate admin interface with its own layout.

Route:
- /admin-dashboard

Additional routes:
- /admin-dashboard/menu
- /admin-dashboard/orders
- /admin-dashboard/customers
- /admin-dashboard/reports
- /admin-dashboard/settings

Use mock data only.

The admin dashboard should have a professional operational interface, with restrained gold accents, a dark sidebar, and a light main content area.

Desktop:
- Fixed or collapsible sidebar.
- Top navigation bar.
- Page heading.
- Main content area.
- Responsive data tables.

Mobile:
- Sidebar drawer.
- Compact navigation.
- Responsive cards instead of overly wide tables.

## A. Admin Sidebar

Include:
- Dashboard.
- Menu Management.
- Orders.
- Customers.
- Reports.
- Settings.
- Logout.

Use Lucide icons and clear active navigation states.

## B. Admin Overview

Display summary cards:
- Total Orders.
- Orders Today.
- Pending Orders.
- Confirmed Orders.
- Completed Orders.

Include:
- Recent Orders table.
- Popular Food Items.
- Order Status Distribution chart.
- Sales Overview chart.

Use a chart library compatible with React, such as Recharts.

Clearly treat all dashboard numbers and charts as sample data.

## C. Menu Management

Route: /admin-dashboard/menu

Include:
- Menu item table.
- Search.
- Category filters.
- Add Item button.
- Edit Item button.
- Delete Item button.
- Availability toggle.

Create a polished Add/Edit Item modal containing:
- Food name.
- Description.
- Price.
- Category.
- Image URL or local image preview.
- Veg/non-veg selection.
- Availability.
- Bestseller flag.

Save changes in demo frontend state and optionally persist them in LocalStorage.

The customer menu should reflect menu changes during the demo session.

Include delete confirmation dialogs and clear success messages.

## D. Order Management

Route: /admin-dashboard/orders

Create a professional order-management interface.

Include:
- Search by order number.
- Filter by status.
- Filter by date.
- Order table.
- Order details drawer.

Each order should show:
- Order ID.
- Customer name.
- Items.
- Total amount.
- Order date.
- Status.
- View Details button.

In the order details drawer, include customer details, item breakdown, and order total.

Provide status actions:
- Placed.
- Confirmed.
- Preparing.
- Ready.
- Completed.
- Cancelled.

When the admin changes an order status, update the demo order state so the change is reflected in the relevant customer-facing pages.

Use confirmation dialogs for cancellation.

Do not implement delivery tracking or driver management.

## E. Customer Management

Route: /admin-dashboard/customers

Create a customer table with:
- Name.
- Email.
- Phone.
- Number of demo orders.
- Registration date.

Include search and pagination-style controls.

Use only demonstration data.

## F. Reports

Route: /admin-dashboard/reports

Create a clean analytics interface with:
- Orders over time.
- Popular menu items.
- Completed versus cancelled orders.
- Sample sales trends.
- Date range selector.

Use Recharts and realistic mock data.

Label sample analytics as demo data.

## G. Settings

Route: /admin-dashboard/settings

Create settings sections for:
- Restaurant information.
- Contact information.
- Address.
- Opening hours.
- Currency.
- Restaurant logo preview.

Use placeholder values and editable frontend forms.

# 12. DEMO INTERACTIONS

The frontend should be interactive rather than a set of static screenshots.

Implement:
- Working navigation.
- Working category filters.
- Working search.
- Working food detail modal.
- Working Add to Cart.
- Working quantity controls.
- Working cart totals.
- Working checkout validation.
- Working demo order creation.
- Working booking confirmation.
- Working admin menu CRUD in local state.
- Working admin order status updates.
- Working demo customer and order filters.
- Toast notifications.
- Confirmation dialogs.
- Responsive mobile navigation.
- Loading and empty states.

Use shared state where appropriate so the customer menu, cart, and admin demo interface behave consistently.

Persist suitable demo data in LocalStorage.

Do not claim that demo orders are stored in a real database.

# 13. FUTURE DJANGO INTEGRATION

Prepare the project for a future Django REST Framework backend.

Create:
- A centralized API client.
- TypeScript interfaces for menu items, categories, customers, and orders.
- A separate mock-data service.
- A clear separation between UI components and data access.
- An environment variable for the API base URL.

Example:

VITE_API_BASE_URL=http://localhost:8000/api

Do not hardcode API URLs across components.

The future backend will handle:
- Real authentication.
- Role-based permissions.
- Menu persistence.
- Order creation.
- Customer order history.
- Order status updates.
- Price calculations.
- Database storage.

For now, do not implement or simulate a real Django backend.

# 14. RESPONSIVE DESIGN

The website must look excellent on:
- Desktop screens.
- Laptops.
- Tablets.
- Mobile phones.

Pay particular attention to:
- Hero image positioning.
- Menu grid responsiveness.
- Navigation drawer behavior.
- Food detail modal sizing.
- Checkout form usability.
- Cart usability on small screens.
- Admin dashboard responsiveness.
- Tables on mobile.

Avoid horizontal overflow and tiny text.

# 15. FINAL QUALITY REQUIREMENTS

Before finishing:
1. Ensure all routes work.
2. Ensure the main buttons perform their intended demo actions.
3. Ensure the cart calculates totals correctly.
4. Ensure the checkout flow reaches the confirmation page.
5. Ensure demo orders appear in the admin orders page.
6. Ensure admin status changes update the shared demo state.
7. Ensure menu edits affect the customer menu.
8. Ensure empty states and validation errors are handled.
9. Ensure responsive layouts work correctly.
10. Ensure there are no broken images, missing pages, or console errors.

Build the complete frontend with polished visual design, reusable components, realistic mock data, and functional demo interactions.

Start with the premium home page and design system, then build all customer pages and the admin dashboard.

The final website should feel like a premium Indian biryani restaurant's own branded online booking platform, not a generic food delivery marketplace.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/245bf3b4-373c-40d8-b73c-91d93c52453f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
