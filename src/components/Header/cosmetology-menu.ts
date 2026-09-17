import { withBase } from "@/lib/basePath";

const img = {
  inj1: withBase("/header/Rectangle%20632.webp"),
  inj2: withBase("/header/Rectangle%20634.webp"),
  hw1: withBase("/header/secondtab-first.webp"),
  hw2: withBase("/header/secondtab-second.webp"),
  care1: withBase("/header/thirdtab-first.webp"),
  care2: withBase("/header/thirdtab-second.webp"),
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
          image: img.inj2,
        },
      },
      {
        id: "meso",
        label: "Мезотерапия",
        card: {
          title: "Мезотерапия",
          description:
            "Точечное питание кожи коктейлями под твои задачи и состояние",
          image: img.inj2,
        },
      },
      {
        id: "contour",
        label: "Контурная пластика",
        card: {
          title: "Контурная пластика",
          description:
            "Мягкая коррекция объёмов с сохранением твоих естественных линий",
          image: img.inj1,
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
    defaultItemId: "diagnostics",
    featuredIds: ["laser", "rf"],
    items: [
      {
        id: "diagnostics",
        label: "Диагностика кожи",
        card: {
          title: "Диагностика кожи",
          description:
            "Точная оценка состояния кожи перед подбором процедур",
          image: img.s5,
        },
      },
      {
        id: "photo",
        label: "Фотоомоложение",
        card: {
          title: "Фотоомоложение",
          description:
            "Ровный тон, меньше пигмента и сосудистых проявлений",
          image: img.s6,
        },
      },
      {
        id: "laser",
        label: "Лазерные процедуры",
        card: {
          title: "Лазерные процедуры",
          description:
            "Точное воздействие на нужную зону без затрагивания окружающих тканей",
          image: img.hw1,
        },
      },
      {
        id: "rf",
        label: "RF-лифтинг",
        card: {
          title: "RF-лифтинг",
          description:
            "Подтяжка кожи на глубоком уровне с сохранением естественных контуров тела",
          image: img.hw2,
        },
      },
      {
        id: "smas",
        label: "SMAS-лифтинг",
        card: {
          title: "SMAS-лифтинг",
          description:
            "Глубокий лифтинг каркаса лица с сохранением естественной мимики",
          image: img.s2,
        },
      },
      {
        id: "ultrasound",
        label: "Ультразвуковые процедуры",
        card: {
          title: "Ультразвуковые процедуры",
          description:
            "Мягкая работа с тканями на глубине без повреждения поверхности",
          image: img.s3,
        },
      },
      {
        id: "em",
        label: "Электромагнитные процедуры",
        card: {
          title: "Электромагнитные процедуры",
          description:
            "Стимуляция мышц и кожи для плотности и тонуса",
          image: img.s4,
        },
      },
      {
        id: "hw-massage",
        label: "Аппаратный массаж",
        card: {
          title: "Аппаратный массаж",
          description:
            "Лимфодренаж и моделирование контуров с комфортным воздействием",
          image: img.s7,
        },
      },
    ],
  },
  {
    id: "care",
    label: "Уходовая",
    defaultItemId: "cleaning",
    featuredIds: ["cleaning", "care-proc"],
    items: [
      {
        id: "cleaning",
        label: "Чистки",
        card: {
          title: "Чистки",
          description:
            "Глубокое очищение кожи без пересушивания и раздражения",
          image: img.care1,
        },
      },
      {
        id: "peels",
        label: "Пилинги",
        card: {
          title: "Пилинги",
          description:
            "Обновление поверхности кожи — сияние и более ровный рельеф",
          image: img.s5,
        },
      },
      {
        id: "hydra",
        label: "Hydra Facial",
        card: {
          title: "Hydra Facial",
          description:
            "Многоступенчатое очищение и увлажнение за одну процедуру",
          image: img.s1,
        },
      },
      {
        id: "care-proc",
        label: "Уходовые процедуры",
        card: {
          title: "Уходовые процедуры",
          description:
            "Подтяжка кожи на глубоком уровне с сохранением естественных контуров тела",
          image: img.care2,
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