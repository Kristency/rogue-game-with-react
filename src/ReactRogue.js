import React, { useRef, useEffect, useState } from 'react'
import InputManager from './InputManager'

const ReactRogue = ({ width, height, tilesize }) => {
	const canvasRef = useRef()
	let inputManager = new InputManager()
	const [player, setPlayer] = useState({ x: 12, y: 22 })

	const handleInput = (action, data) => {
		let newPlayer = { ...player }
		newPlayer.x += data.x * tilesize
		newPlayer.y += data.y * tilesize
		setPlayer(newPlayer)
	}

	useEffect(() => {
		console.log('Binding input')
		inputManager.bindKeys()
		inputManager.subscribe(handleInput)

		return () => {
			inputManager.unbindKeys()
			inputManager.unsubscribe(handleInput)
		}
	})

	useEffect(() => {
		console.log('Drawing to canvas')
		const ctx = canvasRef.current.getContext('2d')
		ctx.clearRect(0, 0, width * tilesize, height * tilesize)
		ctx.fillStyle = '#000'
		ctx.fillRect(player.x, player.y, 16, 16)
	})

	return (
		<canvas
			ref={canvasRef}
			width={width * tilesize}
			height={height * tilesize}
			style={{ border: '1px solid black' }}
		></canvas>
	)
}

export default ReactRogue
