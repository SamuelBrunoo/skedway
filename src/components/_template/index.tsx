import { FC, ReactNode, useEffect, useState } from 'react'
import * as S from './styles'
import { BottomColors, PatternsNames, TopColors } from '../../types/template'
import { patterns } from '../../consts/templatePatterns'

import TopVector from '../Vectors/Top'
import BottomVector from '../Vectors/Bottom'


type Props = {
  type: PatternsNames;
  children: ReactNode;
}

const Template: FC<Props> = (p) => {

  const [types, setTypes] = useState<{
    top: TopColors;
    bottom: BottomColors;
  }>({
    top: 'green',
    bottom: 'purple',
  })

  useEffect(() => {
    setTypes(patterns[p.type])
  }, [p.type])

  return (
    <S.Page className='app'>
      <TopVector type={types.top} />
      <BottomVector type={types.bottom} />
      <S.Container>
        {p.children}
      </S.Container>
    </S.Page>
  )

}


export default Template