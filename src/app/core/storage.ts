import { environment } from '../../environments/environment';

declare var require: any;
export const AUTH_DATA = 'auth_data';
export const USER_DATA = 'user_data';
export const STATES = 'states';
export const BUSINESS_DATA = 'business_data';
export const TEMPORAL_BUSINESS_TYPE = ['Restaurante', 'Drogueria', 'Ferreteria']
export const TEMPORAL_BUSINESS_QUANTITY = [1, 2, 3]
/**
 * Constante con el nombre del prefijo que se asignara al Storage del navegador.
 * @type {String}
 */
const prefix = 'APON';

/**
 * Clase para el Manejo de los datos almacenados en el Storage del navegador.
 */
export class Storage {

	/**
	 * @ignore
	 */
	static CryptoJS = require('crypto-js');

	/**
	 * Remueve un valor en el almacenamiento local.
	 * @param {string} key key Nombre del valor a remover
	 */
	static remove(key: string) { localStorage.removeItem(`${prefix}_${key.toLowerCase()}`) }

	/**
	 * Obtiene Un valor tipo String del almacenamiento local.
	 * @param {string} key Nombre del valor a recuperar.
	 * @return {string} Retorna un string con el valor.
	 */
	static getOne(key: string) {
		return JSON.parse(this.decrypt(localStorage.getItem(`${prefix}_${key.toLowerCase()}`)) || "[]");
	}

	/**
	 * Obtiene un Objeto almacenado en el almacenamiento local.
	 * @param {string} key Clave el Objeto a recuperar.
	 * @return {Object} Retorna Objeto recuperado del Storage.
	 */
	static getAll(key: string): any {
		let info = localStorage.getItem(`${prefix}_${key.toLowerCase()}`);
		if (info) {
			let dcp = this.decrypt(info);
			try {
				return (dcp && typeof dcp === 'string') ? JSON.parse(dcp) : dcp;
			} catch {
				return dcp;
			}
		} else {
			return undefined;
		}
	}

	/**
	 * Almacena un valor String en el almacenamiento local.
	 * @param {string}	key		Clave del valor .
	 * @param {string}	Value	Valor a almacenar.
	 */
	static setOne(key: string, value: string) {
		return localStorage.setItem(`${prefix}_${key.toLowerCase()}`, this.encrypt(JSON.stringify(value)));
	}

	/**
	 * Recupera Objecto desde el Storage del navegador.
	 * @param {string}	key		Clave del Objeto para almacenar.
	 * @param {any}		value	Objecto para Almacenar.
	 * @returns {void}	No tiene retorno de información.
	 */
	static setAll(key: string, value: any): void {
		let data = this.encrypt(JSON.stringify(value));
		localStorage.setItem(`${prefix}_${key.toLowerCase()}`, data);
	}

	/**
	 * Remueve todos los datos del almacenamiento local.
	 * @returns {void} No retorna valor.
	 */
	static clear(): void { localStorage.clear(); }

	/**
	 * Comprueba existencia de un valor en el Storage del navegador.
	 * @param {boolean} return Valor boolean si existe valor en el Storage del navegador.
	 */
	static check(key: string): boolean {
		let data = localStorage.getItem(`${prefix}_${key.toLowerCase()}`);
		return data !== null;
	}

	/**
	 * Convierte una cadena de texto en una encriptada.
	 * @param {string} Cadena para encriptación
	 */
	static encrypt(data: string) {
		if (environment.production)
			return this.CryptoJS.AES.encrypt(data, 'm0n1t0rFtD');
		else
			return data;
	}

	/**
	 * Desencriptar una cadena de texto encriptada previamente.
	 * @param {string} Cadena de texto para desencriptación
	 */
	static decrypt(ciphertext: any) {
		let resp = '';
		let stringfy = '';
		if (ciphertext) {
			if (environment.production) {
				let bytes = this.CryptoJS.AES.decrypt(ciphertext, 'm0n1t0rFtD');
				stringfy = bytes.toString(this.CryptoJS.enc.Utf8);
			} else {
				stringfy = ciphertext;
			}
			try {
				return stringfy;
			} catch {
				return null;
			}
		}
		return null;
	}

}
