export const gameList = [
  {
    id: 1,
    name: '翻牌匹配',
    desc: 'desc card',
    path: '/games/cards'
  },
  {
    id: 2,
    name: '打靶射击',
    desc: 'desc',
    path: '/games/shots'
  },
];

export interface CardItem {
  id: number;
  name: string;
  selected: boolean;
  matched: boolean;
}
export const cardsList: Array<CardItem> = [
  { id: 1, name: '1', selected: false, matched: false },
  { id: 1, name: '1', selected: false, matched: false },
  { id: 2, name: '2', selected: false, matched: false },
  { id: 2, name: '2', selected: false, matched: false },
  { id: 3, name: '3', selected: false, matched: false },
  { id: 3, name: '3', selected: false, matched: false },
  { id: 4, name: '4', selected: false, matched: false },
  { id: 4, name: '4', selected: false, matched: false },
  { id: 5, name: '5', selected: false, matched: false },
  { id: 5, name: '5', selected: false, matched: false },
  { id: 6, name: '6', selected: false, matched: false },
  { id: 6, name: '6', selected: false, matched: false },
  { id: 7, name: '7', selected: false, matched: false },
  { id: 7, name: '7', selected: false, matched: false },
  { id: 8, name: '8', selected: false, matched: false },
  { id: 8, name: '8', selected: false, matched: false },
  { id: 9, name: '9', selected: false, matched: false },
  { id: 9, name: '9', selected: false, matched: false },
  { id: 10, name: '10', selected: false, matched: false },
  { id: 10, name: '10', selected: false, matched: false },
  { id: 11, name: 'J', selected: false, matched: false },
  { id: 11, name: 'J', selected: false, matched: false },
  { id: 12, name: 'Q', selected: false, matched: false },
  { id: 12, name: 'Q', selected: false, matched: false },
];