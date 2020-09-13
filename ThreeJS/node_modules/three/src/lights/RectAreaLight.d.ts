import { Light } from 'three/src/lights/Light';
import { Color } from 'three/src/math/Color';

export class RectAreaLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		width?: number,
		height?: number
	);

	/**
	 * @default 'RectAreaLight'
	 */
	type: string;

	/**
	 * @default 10
	 */
	width: number;

	/**
	 * @default 10
	 */
	height: number;

	/**
	 * @default 1
	 */
	intensity: number;

	readonly isRectAreaLight: true;

}
