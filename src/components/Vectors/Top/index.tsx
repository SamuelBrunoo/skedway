import { useEffect, useState } from 'react'
import { VectorArea } from './styles'
import { TopColors } from '../../../types/template'

import { ReactComponent as Vector } from '../../../assets/vectors/top.svg'


const TopVector = ({ type }: { type: TopColors }) => {

  const [colors, setColors] = useState({ fill: '#0000000', stroke: '#0000000' })

  useEffect(() => {
    let newColors = { fill: '#0000000', stroke: '#0000000' }

    switch (type) {
      case 'green':
        newColors = { fill: '#66AE8C', stroke: '#7EDAAF' }
        break;
      case 'purple':
        newColors = { fill: '#A89CDF', stroke: '#E9E7F5' }
        break;
      case 'grey':
        newColors = { fill: '#3C474C', stroke: '#B6C4C9' }
        break;
      case 'dark':
        newColors = { fill: '#212E3A', stroke: '#B6C4C9' }
        break;
    }

    setColors(newColors)
  }, [type])


  return (
    <VectorArea fill={colors.fill} stroke={colors.stroke} id='topVector'>
      <Vector />
    </VectorArea>
  )

}


export default TopVector