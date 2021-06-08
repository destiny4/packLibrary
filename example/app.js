import React from 'react'
import ReactDom from 'react-dom'
import {Navigation} from '@wii-mp/component'
console.log("test------cccccccccccc",Navigation)
const a='123'

ReactDom.render(  <Navigation allowBack>{a}</Navigation>,document.getElementById('app'))
