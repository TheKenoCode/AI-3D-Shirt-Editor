/** @format */

import React, { useEffect } from "react"
import { SketchPicker } from "react-color"
import { useSnapshot } from "valtio"
import state from "../store"
function ColorPicker() {
	const snap = useSnapshot(state)
	useEffect(() => {
		if (snap.currentItem === "shirt") state.color = state.currentColor
		if (snap.currentItem === "pants") state.pantsColor = state.currentColor
		if (snap.currentItem === "jacket") state.hoodieColor = state.currentColor
	}, [snap])
	return (
		<div className='absolute left-full ml-3'>
			<SketchPicker
				color={snap.currentColor}
				disableAlpha
				onChange={(color) => (state.currentColor = color.hex)}
			/>
		</div>
	)
}

export default ColorPicker
