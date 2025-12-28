const menu_data = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/'
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Shop',
    link: '/shop',
    sub_menus: [
      { title: 'Shop', link: '/shop' },
      { title: 'Right Sidebar', link: '/shop-right-sidebar' },
      { title: 'Hidden Sidebar', link: '/shop-hidden-sidebar' },
    ],
  },
  {
    id: 4,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/'
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Shop',
    link: '/shop',
    sub_menus: [
      { title: 'Shop', link: '/shop' },
      { title: 'Right Sidebar', link: '/shop-right-sidebar' },
      { title: 'Hidden Sidebar', link: '/shop-hidden-sidebar' },
    ],
  },
  {
    id: 4,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
]