import mysticindia from '../assets/portfolio/mysticindia.jpeg';
import smartattendence from '../assets/portfolio/smartattendence.jpeg';
import bookbazaar from '../assets/portfolio/bookbazaar.jpeg';
import todoexpee from '../assets/portfolio/todoexpee.jpeg';

const caseStudies = [
    {
        id: 'MysticIndia',
        category: 'landing',
        tag: 'Landing Page · Travel and Explore',
        title: 'Mystic India',
        blurb: 'A captivating landing page for a travel blog.',
        image: mysticindia,
        problem: 'Kettlebread was taking pre-orders over Instagram DMs, losing track of orders and missing pickup times during their weekend launch.',
        solution: 'We designed a single-page pre-order site with a live order form, pickup time picker, and a bold, photo-led hero that matched their in-store branding.',
        result: 'Their first online launch weekend sold out in under 48 hours, with zero missed orders.',
        stats: [
            { num: '48hrs', lbl: 'To sell out' },
            { num: '0', lbl: 'Missed orders' },
            { num: '5 days', lbl: 'Build time' },
        ],
    },
    {
        id: 'Attendence',
        category: 'website',
        tag: 'Full Website · Workforce Management',
        title: 'Smart Attendance Management System',
        blurb: 'An efficient attendance management system designed for organizations and teams.',
        image: smartattendence,
        problem: 'The studio relied on phone calls for class bookings, which ate staff time and led to double-bookings during busy weeks.',
        solution: 'We built a 6-page site with class schedules, instructor bios, and an embedded booking calendar so clients could self-serve.',
        result: 'Phone scheduling calls dropped by 70% in the first month, freeing staff to focus on classes.',
        stats: [
            { num: '70%', lbl: 'Fewer calls' },
            { num: '6', lbl: 'Pages built' },
            { num: '9 days', lbl: 'Build time' },
        ],
    },
    {
        id: 'Bookbazaar',
        category: 'ecommerce',
        tag: 'E-commerce · Book Marketplace',
        title: 'Book Bazaar',
        blurb: 'Buy and sell pre-owned books through a simple and user-friendly online marketplace.',
        image: bookbazaar,
        problem: 'Northbound sold exclusively at markets and pop-ups, with no way for customers to buy outside of in-person events.',
        solution: 'We built a full storefront with product catalog, cart, and checkout, plus shipping rules tailored to their fulfillment process.',
        result: 'The store took over 300 orders in its first month live, opening a new revenue channel beyond markets.',
        stats: [
            { num: '300+', lbl: 'Orders, month 1' },
            { num: '18', lbl: 'Products launched' },
            { num: '12 days', lbl: 'Build time' },
        ],
    },
    {
        id: 'Todoexpee',
        category: 'landing',
        tag: 'Landing Page · Tasks & Expenses',
        title: 'Todo-Expee',
        blurb: 'Track tasks, monitor expenses, and stay organized every day.',
        image: todoexpee,
        problem: "The firm's old site looked outdated and gave visitors no clear way to request a consultation.",
        solution: 'We designed a credibility-first landing page with clear service breakdowns, client logos, and a prominent consult request form.',
        result: 'Inbound consultation requests doubled within six weeks of launch.',
        stats: [
            { num: '2x', lbl: 'Consult requests' },
            { num: '4 days', lbl: 'Build time' },
            { num: '1', lbl: 'Round of revisions' },
        ],
    },
    {
        id: 'finch',
        category: 'website',
        tag: 'Full Website · Hospitality',
        title: 'Finch & Fable Café',
        blurb: 'A warm, photo-forward site with online reservations built in.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
        problem: 'The café had no online presence beyond a social media page, and customers often called to ask about hours and menu items.',
        solution: 'We built a warm, photo-forward site with an always-current menu, hours, and an embedded reservation widget.',
        result: 'The café now handles the majority of reservations online, with a noticeable drop in hours-related phone calls.',
        stats: [
            { num: '5', lbl: 'Pages built' },
            { num: '80%', lbl: 'Reservations online' },
            { num: '7 days', lbl: 'Build time' },
        ],
    },
    {
        id: 'loom',
        category: 'ecommerce',
        tag: 'E-commerce · Home Goods',
        title: 'Loom & Loft',
        blurb: 'A minimalist storefront built to make handmade textiles feel premium.',
        image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop',
        problem: 'This handmade textile brand wanted a storefront that felt as premium as their product, not a generic template shop.',
        solution: 'We designed a minimalist storefront with large product photography, a custom typographic system, and a streamlined checkout.',
        result: 'Average order value increased 22% after launch, attributed to the improved product presentation.',
        stats: [
            { num: '22%', lbl: 'Higher AOV' },
            { num: '24', lbl: 'Products launched' },
            { num: '11 days', lbl: 'Build time' },
        ],
    },
];

export default caseStudies;