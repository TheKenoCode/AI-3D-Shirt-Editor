/** @format */

import { proxy } from "valtio"

const state = proxy({
	intro: true,
	color: "#EFBD48",
	pantsColor: "#3b3b3b",
	hoodieColor: "#484848",
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: "./threejs.png",
	fullDecal: "./threejs.png",
	currentItem: "shirt",
	currentColor: "#EFBD48",
})

export default state
