import { useEffect, useState } from 'react'
import { VectorArea } from './styles'
import { BottomColors } from '../../../utils/types/template'

import { ReactComponent as Vector } from '../../../assets/vectors/bottom.svg'


const BottomVector = ({ type }: { type: BottomColors }) => {

  const [color, setColor] = useState('#0000000')

  useEffect(() => {
    let newColor = '#0000000'

    switch (type) {
      case 'purple':
        newColor = '#7F6EC9'
        break;
      case 'green':
        newColor = '#66AE8C'
        break;
      case 'grey':
        newColor = '#67767E'
        break;
    }

    setColor(newColor)
  }, [type])


  return (
    <VectorArea fill={color} id='bottomVector'>
      <Vector />
    </VectorArea>
  )

}


export default BottomVector