import React from 'react';
import ReactDOM from 'react-dom';
import './content';
import Header, Pane, Footer from './components'

dom = ReactDOM

const DocumentRoot = ()=>{
  return (
    <head>
      <meta charset="utf-8" />
      <link href="stylesheet.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <Header />
      <div id="intro" className="panel">{IntroText}</div>
      {sections.map(
        function sect(section) {
          if section.typeof === "object" {
            return <Pane
              identifier={section.identifier}
              title={section.title}>{section.text}</div>
          }
          else {
            if section.typeof === "array" {
              section.map(function subsect(subsection){
                sect(subsection);
              });
            }
          }
        }
      )}
      <Footer links=FooterLinks />
    </body>
  )
}
