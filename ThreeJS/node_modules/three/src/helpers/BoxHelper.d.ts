import { Object3D } from 'three/src/core/Object3D';
import { Color } from 'three/src/math/Color';
import { LineSegments } from 'three/src/objects/LineSegments';

export class BoxHelper extends LineSegments {

	/**
	 * @param object
	 * @param [color=0xffff00]
	 */
	constructor( object: Object3D, color?: Color | string | number );

	/**
	 * @default 'BoxHelper'
	 */
	type: string;

	update( object?: Object3D ): void;

	setFromObject( object: Object3D ): this;

}
