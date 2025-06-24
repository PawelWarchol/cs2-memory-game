import type { Weapon } from '@/types/Weapon'

export const weapons: Weapon[] = [
  {
    id: 'ak47',
    name: 'AK-47',
    image: '/src/assets/weapons/ak47.png',
    rarity: 'Covert',
  },
  {
    id: 'awp',
    name: 'AWP',
    image: '/src/assets/weapons/awp.png',
    rarity: 'Covert',
  },
  {
    id: 'm4a1',
    name: 'M4A1-S',
    image: '/src/assets/weapons/m4a1.png',
    rarity: 'Covert',
  },
  {
    id: 'deagle',
    name: 'Desert Eagle',
    image: '/src/assets/weapons/deagle.png',
    rarity: 'Classified',
  },
  {
    id: 'usp',
    name: 'USP-S',
    image: '/src/assets/weapons/usp.png',
    rarity: 'Restricted',
  },
  {
    id: 'glock',
    name: 'Glock-18',
    image: '/src/assets/weapons/glock.png',
    rarity: 'MilSpec',
  },
  {
    id: 'knife',
    name: 'Karambit',
    image: '/src/assets/weapons/karambit.png',
    rarity: 'Extraordinary',
  },
  {
    id: 'gloves',
    name: 'Sport Gloves',
    image: '/src/assets/weapons/gloves.png',
    rarity: 'Extraordinary',
  },
  {
    id: 'famas',
    name: 'FAMAS',
    image: '/src/assets/weapons/famas.png',
    rarity: 'Industrial',
  },
  {
    id: 'p90',
    name: 'P90',
    image: '/src/assets/weapons/p90.png',
    rarity: 'Consumer',
  },
  {
    id: 'mp5',
    name: 'MP5-SD',
    image: '/src/assets/weapons/mp5.png',
    rarity: 'Industrial',
  },
  {
    id: 'tec9',
    name: 'Tec-9',
    image: '/src/assets/weapons/tec9.png',
    rarity: 'MilSpec',
  },
  {
    id: 'm249',
    name: 'M249',
    image: '/src/assets/weapons/m249.png',
    rarity: 'Consumer',
  },
  {
    id: 'p250',
    name: 'P-250',
    image: '/src/assets/weapons/p250.png',
    rarity: 'Industrial',
  },
  {
    id: 'mac10',
    name: 'MAC-10',
    image: '/src/assets/weapons/mac10.png',
    rarity: 'Consumer',
  },
  {
    id: 'scout',
    name: 'SSG 08',
    image: '/src/assets/weapons/scout.png',
    rarity: 'MilSpec',
  },
]

export function getRandomWeapons(count: number, seed?: string): Weapon[] {
  const shuffled = [...weapons].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
