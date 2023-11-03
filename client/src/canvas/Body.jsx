/** @format */

import React from "react"
import { easing } from "maath"
import { useSnapshot } from "valtio"
import { useFrame } from "@react-three/fiber"
import { Decal, useGLTF, useTexture } from "@react-three/drei"
import state from "../store"
import { useThree } from "@react-three/fiber"
import { Vector3 } from "three"

export default function Body(props) {
	const { nodes, materials } = useGLTF("/body.glb")
	const snap = useSnapshot(state)
	const { camera } = useThree()

	const logoTexture = useTexture(snap.logoDecal)
	const fullTexture = useTexture(snap.fullDecal)

	useFrame((state, delta) => {
		easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)

		easing.dampC(materials.Layer.color, snap.hoodieColor, 0.25, delta)
		easing.dampC(materials.Layer_2.color, snap.hoodieColor, 0.25, delta)
		easing.dampC(materials.Jacket_M.color, snap.hoodieColor, 0.25, delta)
		easing.dampC(materials.Pants_M.color, snap.pantsColor, 0.25, delta)

		// Set the materials colors

		materials.Zipper.color.set("#ffc41c")
		materials.buttons.color.set("#ffc41c")
	})
	const stateString = JSON.stringify(snap)
	const handleClick = (item) => {
		if (item === "shirt") state.currentItem = "shirt"
		if (item === "pants") state.currentItem = "pants"
		if (item === "jacket") state.currentItem = "jacket"
	}

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				dispose={null}
				material-roughness={1}
				position={[0, 1.395, 0]}
				scale={0.957}
				onClick={() => handleClick("shirt")}>
				{snap.isFullTexture && fullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={1}
						anisotropy={16}
						depthTest={true}
						depthWrite={true}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && logoTexture && (
					<Decal
						position={[0, 0, 0.19]}
						rotation={[0, 0, 0]}
						scale={0.15}
						map={logoTexture}
						anisotropy={16}
						depthTest={true}
						depthWrite={true}
						onClick={() => handleClick("shirt")}
					/>
				)}
			</mesh>
			<group scale={0.01}>
				<mesh
					geometry={nodes.pants01_buttons_0.geometry}
					material={materials.buttons}
				/>
				<mesh
					castShadow
					geometry={nodes.pants01_Pants_M_0.geometry}
					material={materials.Pants_M}
					onClick={() => handleClick("pants")}
				/>
				<mesh
					geometry={nodes.jacket04_Layer_0.geometry}
					material={materials.Layer}
					castShadow
				/>
				<mesh
					geometry={nodes.jacket04_Zipper_0.geometry}
					material={materials.Zipper}
				/>
				<mesh
					geometry={nodes.jacket04_Jacket_M_0.geometry}
					material={materials.Jacket_M}
				/>
				<mesh
					geometry={nodes.jacket04_Layer_2_0.geometry}
					material={materials.Layer_2}
					onClick={() => handleClick("jacket")}
				/>
			</group>
		</group>
	)
}

useGLTF.preload("/body.glb")
