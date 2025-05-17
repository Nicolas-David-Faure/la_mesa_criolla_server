import { Rooms } from './types';

// export const rooms: Rooms = {
//   uno: {

//   },
//   truco: {

//   },
//   chinchon: {

//   },
//   escoba: {

//   }
// };

export const rooms: Rooms = new Map([
  ['uno', new Map()],
  ['truco', new Map()],
  ['chinchon', new Map()],
  ['escoba', new Map()],
]);