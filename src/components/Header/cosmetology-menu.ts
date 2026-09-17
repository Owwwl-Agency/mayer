import { withBase } from "@/lib/basePath";

const img = {
  h1: withBase("/header/67df78b253dcd31fbbfa42bbc6b64f8827a379ac.webp"),
  h2: withBase("/header/cac1b571ab29be3d313f95cb75d07d752e75699b.webp"),
  h3: withBase("/header/Rectangle%20632.webp"),
  h4: withBase("/header/Rectangle%20634.webp"),
  s1: withBase("/hero-section/a3883001594f82540870a6bc0412fba03f0a4c33.webp"),
  s2: withBase("/hero-section/e51cd084c290e274f02ce275901ce2bd24c3f821.webp"),
  s3: withBase("/hero-section/63b4f2c9c876e7239955d6e29e2d7458728768eb.webp"),
  s4: withBase("/hero-section/64a8b3bf24cc872deeda2844244161c8610e18b6.webp"),
  s5: withBase("/hero-section/f578429f15775fefbebff207f3a7ae4d27293055.webp"),
  s6: withBase("/hero-section/3f84cf35ab8714ab44846efc32f6c9309e15a252.webp"),
  s7: withBase("/hero-section/04606df5123b40c8751779f6ed8c69aec4c3f461.webp"),
} as const;

export type MenuCard = {
  title: string;
  description: string;
  image: string;
};

export type MenuItem = {
  id: string;
  label: string;
  card: MenuCard;
};

export type MenuCategory = {
  id: string;
  label: string;
  defaultItemId: string;
  /** Featured cards for this category — shown while category is active (not on submenu hover) */
  featuredIds: readonly [string, string];
  items: MenuItem[];
};

export const COSMETOLOGY_MENU: MenuCategory[] = [
  {
    id: "injection",
    label: "Инъекционная",
    defaultItemId: "biorevital",
    featuredIds: ["contour", "biorevital"],
    items: [
      {
        id: "biorevital",
        label: "Биоревитализация",
        card: {
          title: "Биоревитализация",
          description:
            "Глубокое увлажнение и восстановление — кожа работает сама, изнутри",
          image: img.h4,
        },
      },
      {
        id: "meso",
        label: "Мезотерапия",
        card: {
          title: "Мезотерапия",
          description:
            "Точечное питание кожи коктейлями под твои задачи и состояние",
          image: img.h4,
        },
      },
      {
        id: "contour",
        label: "Контурная пластика",
        card: {
          title: "Контурная пластика",
          description:
            "Мягкая коррекция объёмов с сохранением твоих естественных линий",
          image: img.h3,
        },
      },
      {
        id: "botox",
        label: "Ботулинотерапия",
        card: {
          title: "Ботулинотерапия",
          description:
            "Расслабляем мимику аккуратно — лицо остаётся живым и своим",
          image: img.s1,
        },
      },
      {
        id: "collagen",
        label: "Коллагенотерапия",
        card: {
          title: "Коллагенотерапия",
          description:
            "Плотность и упругость кожи за счёт стимуляции собственного коллагена",
          image: img.s2,
        },
      },
      {
        id: "lipolytic",
        label: "Липолитики",
        card: {
          title: "Липолитики",
          description:
            "Локальная работа с объёмом — мягче контур, свежее профиль",
          image: img.s3,
        },
      },
      {
        id: "exosome",
        label: "Экзосомальная терапия",
        card: {
          title: "Экзосомальная терапия",
          description:
            "Клеточное обновление и восстановление с заметным эффектом качества кожи",
          image: img.s7,
        },
      },
    ],
  },
  {
    id: "hardware",
    label: "Аппаратная",
    defaultItemId: "laser-face",
    featuredIds: ["laser-face", "rf"],
    items: [
      {
        id: "laser-face",
        label: "Лазерное омоложение",
        card: {
          title: "Лазерное омоложение",
          description:
            "Мягкое обновление рельефа и тона без долгого восстановления",
          image: img.h1,
        },
      },
      {
        id: "rf",
        label: "RF-лифтинг",
        card: {
          title: "RF-лифтинг",
          description:
            "Плотность и лифтинг за счёт прогрева глубоких слоёв кожи",
          image: img.h2,
        },
      },
      {
        id: "ultrasound",
        label: "Ультразвуковой SMAS",
        card: {
          title: "Ультразвуковой SMAS",
          description:
            "Глубокий лифтинг каркаса лица с сохранением естественной мимики",
          image: img.s2,
        },
      },
      {
        id: "photo",
        label: "Фототерапия",
        card: {
          title: "Фототерапия",
          description:
            "Ровный тон, меньше пигмента и сосудистых проявлений",
          image: img.s5,
        },
      },
    ],
  },
  {
    id: "care",
    label: "Уходовая",
    defaultItemId: "cleaning",
    featuredIds: ["cleaning", "peels"],
    items: [
      {
        id: "cleaning",
        label: "Чистка лица",
        card: {
          title: "Чистка лица",
          description:
            "Глубокое очищение пор и свежий тон без агрессии к коже",
          image: img.s5,
        },
      },
      {
        id: "peels",
        label: "Пилинги",
        card: {
          title: "Пилинги",
          description:
            "Обновление поверхности кожи — сияние и более ровный рельеф",
          image: img.h3,
        },
      },
      {
        id: "care-ritual",
        label: "Уходовые ритуалы",
        card: {
          title: "Уходовые ритуалы",
          description:
            "Индивидуальный уход под тип кожи — комфорт и видимый результат",
          image: img.s1,
        },
      },
      {
        id: "mask",
        label: "Маски и сыворотки",
        card: {
          title: "Маски и сыворотки",
          description:
            "Насыщение и восстановление барьера после процедур и в сезон",
          image: img.s6,
        },
      },
    ],
  },
];

export function getFeaturedCards(category: MenuCategory): [MenuCard, MenuCard] {
  const cards = category.featuredIds.map((id) => {
    const item = category.items.find((i) => i.id === id);
    return item?.card ?? category.items[0].card;
  });
  return [cards[0], cards[1]];
}