import React from 'react'
import ReactDom from 'react-dom'
import Task from '../Task'
import { isTSAnyKeyword } from '@babel/types'

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Task></Task>, div)
})