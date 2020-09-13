import { Color } from 'three/src/math/Color';
import { MaterialParameters, Material } from 'three/src/materials/Material';

export interface ShadowMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
}

export class ShadowMaterial extends Material {

	constructor( parameters?: ShadowMaterialParameters );

	/**
	 * @default 'ShadowMaterial'
	 */
	type: string;

	/**
	 * @default new THREE.Color( 0x000000 )
	 */
	color: Color;

	/**
	 * @default true
	 */
	transparent: boolean;

}
