import { map, head, last, all, equals, filter, pluck } from 'ramda';

/**
	Вытащить пару ключ/значение из массива от Object.entries
	@author Samir Amirseidov
*/
export const constructEntry = entry => [head(entry), last(entry)];

/**
	Проверка на null каждого значения от Object.entries
	@author Samir Amirseidov
*/
export const areKeysNull = obj => {
	return all(equals(null))(map(entry => {
		return last(entry);
	}, Object.entries(obj)));
};

/**
	Отфильтровать валидаторы, возвратившие сообщение ошибки от валидаторов, возвративших сообщение об успешной валидации (null)
	@author Samir Amirseidov
*/
export const purgeSuccessValidators = arr => filter(val => val !== null, pluck('error')(arr));

export const getWordEnding = number => {
	const lastNum = last(number.toString());
	switch (lastNum) {
		case "0":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return 'ов';
		case "1":
			return "";
		case "2":
		case "3":
		case "4":
			return "а";
	}
};
