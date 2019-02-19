import { fromPairs, map, head, isEmpty } from 'ramda';
import { constructEntry, purgeSuccessValidators } from './index';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEXP = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const testRegex = (regex, value) => regex.test(value);

/* Валидаторы ------------------------------------------------------------- */
export const required = value => ({ error: value ? null : 'Заполните поле.' });
export const check = value => ({ error: value ? null : 'Отметьте поле.' });
export const email = value => ({ error: testRegex(EMAIL_REGEXP, value) ? null : 'Некорректный E-Mail.' });
export const phone = value => ({ error: testRegex(PHONE_REGEXP, value) ? null : 'Некорректный номер телефона.' });
/* ------------------------------------------------------------------------ */

/**
	Вытащить первое попавшееся сообщение об ошибке валидации для каждого ключа
	@author Samir Amirseidov
*/
export const mapValidationObject = obj => {
	return fromPairs(map(field => {
		const [key, errors] = constructEntry(field);

		if (Array.isArray(errors)) {
			const failedValidators = purgeSuccessValidators(errors);
			if (!isEmpty(failedValidators)) {
				return [key, head(failedValidators)];
			}
		}

		return [key, null];
	}, Object.entries(obj)));
};

/**
	Валидация значения всех ключей путём вызова функций валидаторов на значение каждого ключа
	@author Samir Amirseidov
*/
export const validate = (obj, opts) => {
	return fromPairs(map(entry => {
		const [key, value] = constructEntry(entry);

		if (opts[key]) {
			return [key, map(fn => {
				return fn(value);
			}, opts[key])];
		}

		return [key, { error: null }];
	}, Object.entries(obj)));
};
