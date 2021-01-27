import React from 'react'
import styled from '@xstyled/styled-components'
import { LevaInputProps, Point3d as Point3dType, Point3dObject } from '../../types'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { InternalPoint3dSettings } from './point3d-plugin'
import { useInputContext } from '../../hooks'

type Point3dProps = LevaInputProps<Point3dType, InternalPoint3dSettings, Point3dObject>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

export function Point3d() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Point3dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
