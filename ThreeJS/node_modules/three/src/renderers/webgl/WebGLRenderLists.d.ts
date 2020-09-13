import { Object3D } from 'three/src/core/Object3D';
import { Material } from 'three/src/materials/Material';
import { WebGLProgram } from 'three/src/renderers/webgl/WebGLProgram';
import { Group } from 'three/src/objects/Group';
import { Scene } from 'three/src/scenes/Scene';
import { Camera } from 'three/src/cameras/Camera';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { WebGLProperties } from 'three/src/renderers/webgl/WebGLProperties';

export interface RenderTarget {} // not defined in the code, used in LightShadow and WebGRenderer classes

export interface RenderItem {
	id: number;
	object: Object3D;
	geometry: BufferGeometry | null;
	material: Material;
	program: WebGLProgram;
	groupOrder: number;
	renderOrder: number;
	z: number;
	group: Group | null;
}

export class WebGLRenderList {

	constructor( properties: WebGLProperties );

	/**
	 * @default []
	 */
	opaque: Array<RenderItem>;

	/**
	 * @default []
	 */
	transparent: Array<RenderItem>;

	init(): void;
	push(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;
	unshift(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;
	sort( opaqueSort: Function, transparentSort: Function ): void;
	finish(): void;

}

export class WebGLRenderLists {

	constructor( properties: WebGLProperties );

	dispose(): void;
	get( scene: Scene, camera: Camera ): WebGLRenderList;

}
