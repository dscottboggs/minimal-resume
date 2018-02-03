import React from 'react'
import { ReactDOM as dom } from 'react-dom'
import { Sections, FooterLinks } from 'content'
import { Header, Pane, Footer } from 'components'

DocumentRoot ->
  <body>
    <Header />
    <div id="intro" className="panel">{IntroText}</div>
      perSection = (section) ->
        if section.text instanceof string
          <Pane
            identifier={section.identifier}
            title={section.title}>{section.text} </Pane>
        else
          throw () ->
            "ERROR: Malformed child of #{ section.title } follows:
              #{ section.text }
            Type: #{ typeof section.text }

            Children of sections should be either strings/JSX or an array
            of more sections."
      perSection for section in @props.sections
    <Footer links={FooterLinks} />
  </body>

dom.render <DocumentRoot sections={Sections} />, dom.getElementById('document')
