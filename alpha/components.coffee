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
  constructor: (properties) ->
    super properties
    @properties = properties

  flip: ->
    if @state.open
      @state.open = no
    else
      @state.open = yes

  render: ->
    <div id="panel_wrapper_#{ @props.identifier }">
      <div
        id={"panel_header_#{ @props.identifier }"}
        className="panel-header">{
          if @props.open then "#{ @props.title }-" else "#{ @props.title }+"
        }</div>
      {
        if @state.open
          <div
            id={"props_#{ @props.identifier }"}
            className="panel">{@props.children}</div>
      }
    </div>
    # ^^ only visible if @state.open is truthy

export class Footer extends React.Component
  createLinkDiv: (link, text, i) ->
    <a
      href={link}
      target="_blank"
      className="footlink"
      id={"footer-link-#{ i }"}>{ text }</a>
  render: ->
    <div className="footer">
      <div id="footer-title">Quick Links</div><br />
      {
        createLinkDiv(link.link, link.text, i + 1 for link, i in @props.links)
      }
    </div>
