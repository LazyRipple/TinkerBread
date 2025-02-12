import { useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { DRACOLoader, GLTFLoader } from 'three-stdlib'
import { TextureLoader, SRGBColorSpace } from 'three'

export const Gingerbread = ({
  ggbType,
  instance,
  index,
  handleClick,
  focusedIndex,
  accessoryOfThis,
  setName,
  setMessage,
  setShowMessage,
}) => {
  // Loading the textures for gingerbread model and accessory
  const modelTexture = useLoader(TextureLoader, `/gingerbread/${ggbType}.jpg`, () => {
    // console.log('Texture loaded')
  })
  modelTexture.flipY = false
  modelTexture.colorSpace = SRGBColorSpace

  // Loading the gingerbread model
  const model = useLoader(GLTFLoader, `/gingerbread/${ggbType}.glb`, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  })

  // Refs for controlling models and group
  const modelRef = useRef()

  useEffect(() => {
    if (model && model.scene) {
      model.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = modelTexture
          child.material.needsUpdate = true
        }
      })
      modelRef.current = model.scene
    }
  }, [model, modelTexture])

  // If model not loaded, return null
  if (!model || !model.scene) {
    return null
  }
  const headAccessory =
    accessoryOfThis[index] != null
      ? accessoryOfThis[index]['head'] != null
        ? accessoryOfThis[index]['head']['item']
        : null
      : null
  const leftAccessory =
    accessoryOfThis[index] != null
      ? accessoryOfThis[index]['left hand'] != null
        ? accessoryOfThis[index]['left hand']['item']
        : null
      : null
  const rightAccessory =
    accessoryOfThis[index] != null
      ? accessoryOfThis[index]['right hand'] != null
        ? accessoryOfThis[index]['right hand']['item']
        : null
      : null

  // load head model

  let headAccessoryModel = null
  let headAccessoryTexture = null

  if (headAccessory) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    headAccessoryModel = useLoader(GLTFLoader, `/accessory/${headAccessory}.glb`, (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    headAccessoryTexture = useLoader(TextureLoader, `/accessory/${headAccessory}.jpg`, () => {
      // console.log(`head texture of ${index} loaded`)
    })
    headAccessoryTexture.flipY = false
    headAccessoryTexture.colorSpace = SRGBColorSpace
  }

  // load head model

  let leftAccessoryModel = null
  let leftAccessoryTexture = null

  if (leftAccessory) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    leftAccessoryModel = useLoader(GLTFLoader, `/accessory/${leftAccessory}.glb`, (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    leftAccessoryTexture = useLoader(TextureLoader, `/accessory/${leftAccessory}.jpg`, () => {
      // console.log(`head texture of ${index} loaded`)
    })
    leftAccessoryTexture.flipY = false
    leftAccessoryTexture.colorSpace = SRGBColorSpace
  }

  // load right model

  let rightAccessoryModel = null
  let rightAccessoryTexture = null

  if (rightAccessory) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    rightAccessoryModel = useLoader(GLTFLoader, `/accessory/${rightAccessory}.glb`, (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    rightAccessoryTexture = useLoader(TextureLoader, `/accessory/${rightAccessory}.jpg`, () => {
      // console.log(`head texture of ${index} loaded`)
    })
    rightAccessoryTexture.flipY = false
    rightAccessoryTexture.colorSpace = SRGBColorSpace
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const updateAccessoryTexture = (accessoryModel, accessoryTexture) => {
      if (accessoryModel && accessoryModel.scene) {
        accessoryModel.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.map = accessoryTexture
            child.material.needsUpdate = true
          }
        })
      }
    }

    updateAccessoryTexture(headAccessoryModel, headAccessoryTexture)
    updateAccessoryTexture(leftAccessoryModel, leftAccessoryTexture)
    updateAccessoryTexture(rightAccessoryModel, rightAccessoryTexture)
  }, [
    headAccessoryModel,
    headAccessoryTexture,
    leftAccessoryModel,
    leftAccessoryTexture,
    rightAccessoryModel,
    rightAccessoryTexture,
  ])

  const position = {
    candy: [-27, 0.5, 3],
    red_present: [-29, 0.6, 3],
    cup: [-31, 0.6, 2.9],
    christmas_hat: [-24.8, 0.5, -2.8],
    reindeer: [-28.2, 0, -3],
    earpuff: [-32.25, 0.5, -2.2],
    green_present: [-28.2, 0.6, -3.2],
    candy2: [-25.8, 0.8, -3.6],
    christmas_tree: [-23.4, 0.7, -4],
  }

  const handleAccessoryClick = (part) => {
    if (focusedIndex === null) return

    setName(accessoryOfThis[index][part]['sender'])
    setMessage(accessoryOfThis[index][part]['message'])
    setShowMessage(true)
  }

  // console.log('head accessory model:', headAccessoryModel, index)
  // console.log('left accessory model:', leftAccessoryModel, index)
  // console.log('right accessory model:', rightAccessoryModel, index)

  // console.log(accessoryOfThis)

  return (
    <group
      scale={instance.scale}
      position={instance.position}
      onClick={() => handleClick(index)}
      focusedIndex={focusedIndex}
    >
      <primitive key={`ggb3Model - ${index}`} object={model.scene.clone()} position={[0, 0, 0]} scale={1} />

      {/* head accessory */}
      {headAccessoryModel && (
        <primitive
          key={`head-accessory-${index}`}
          position={position[headAccessory]}
          scale={1}
          object={headAccessoryModel.scene.clone()}
          onPointerDown={() => handleAccessoryClick('head')}
        />
      )}

      {/* left hand accessory */}
      {leftAccessoryModel && (
        <primitive
          key={`left-accessory-${index}`}
          position={position[leftAccessory]}
          scale={1}
          object={leftAccessoryModel.scene.clone()}
          onPointerDown={() => handleAccessoryClick('left hand')}
        />
      )}

      {/* right hand accessory */}
      {rightAccessoryModel && (
        <primitive
          key={`right-accessory-${index}`}
          position={position[rightAccessory]}
          scale={1}
          object={rightAccessoryModel.scene.clone()}
          onPointerDown={() => handleAccessoryClick('right hand')}
        />
      )}
    </group>
  )
}
