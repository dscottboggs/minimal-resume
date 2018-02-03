import React from 'react'

export class Header extends React.Component
  name = <h1 className='header' id='name'>D. Scott Boggs, Jr.</h1>
  email = <h3 className='header' id='email'>scott@tams.tech</h3>
  phone = <h3 className='header' id='phone'>(724) 393 - 5536</h3>
  render: ->
    <head id="header">
          {@name}<br />
          {@email}<br />
          {@phone}
    <title name='site-title'>{@name} - Resume</title>
    </head>

export class Pane extends React.Component
  constructor: (properties): ->
    super properties
    @properties = properties

  flip: ->
    if @state.open
      @state.open = no
    else
      @state.open = yes

  render: ->
    <div
      id=panel_header_{@props.identifier}
      className="panel-header">{@props.title +
        if @props.open then "+" else "-"
      }</div>
    {<div
      id=props_{@props.identifier}
      className="panel">{@props.children}</div> and @state.open}

export class Footer extends React.Component
  render: ->
    <div className="footer">
      <div id="footer-title">Quick Links</div><br />
      {
        <a
          href={link.link}
          target="_blank"
          className="footlink"
          id={link.text}>{link.text}</a> for link in @props.links
      }
