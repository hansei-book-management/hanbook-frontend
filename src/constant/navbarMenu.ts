export interface NavbarMenuItem {
  text: string;
  href: string;
}

export const ADMIN_NAVBAR_MENU_LIST: NavbarMenuItem[] = [
  {
    text: '모든 도서',
    href: '/book',
  },
  {
    text: '도서 대여',
    href: '/rent/club/',
  },
  {
    text: '내 도서',
    href: '/user-book',
  },
  {
    text: '도서 관리',
    href: '/rent/club-book',
  },
  {
    text: '동아리 관리',
    href: '/manage-club',
  },
  {
    text: '한북 관리',
    href: '/manage-hanbook',
  },
];

export const DIRECTOR_NAVBAR_MENU_LIST: NavbarMenuItem[] = [
  {
    text: '모든 도서',
    href: '/book',
  },
  {
    text: '도서 대여',
    href: '/rent/club/',
  },
  {
    text: '내 도서',
    href: '/user-book',
  },
  {
    text: '도서 관리',
    href: '/club-book',
  },
  {
    text: '동아리 관리',
    href: '/manage-club',
  },
];

export const USER_NAVBAR_MENU_LIST: NavbarMenuItem[] = [
  {
    text: '모든 도서',
    href: '/book',
  },
  {
    text: '도서 대여',
    href: '/rent/club/',
  },
  {
    text: '내 도서',
    href: '/user-book',
  },
];
