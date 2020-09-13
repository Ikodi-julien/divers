import { PointLight } from 'three/src/lights/PointLight';
import { Color } from 'three/src/math/Color';
import { Matrix4 } from 'three/src/math/Matrix4';
import { Object3D } from 'three/src/core/Object3D';

export class PointLightHelper extends Object3D {

	constructor(
		light: PointLight,
		sphereSize?: number,
		color?: Color | string | number
	);

	/**
	 * @default 'PointLightHelper'
	 */
	type: string;

	light: PointLight;
	color: Color | string | number | undefined;
	matrix: Matrix4;

	/**
	 * @default false
	 */
	matrixAutoUpdate: boolean;

	dispose(): void;
	update(): void;

}
