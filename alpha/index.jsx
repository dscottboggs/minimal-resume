import React from 'react';
import ReactDOM from 'react-dom';
import './content';
import Header, Pane, Footer from './components';

const dedent = require('dedent-js');
const dom = ReactDOM;

const DocumentRoot = ()=>{
  return (
    <Header />
    <div id="intro" className="panel">{IntroText}</div>
    {sections.map(
      function sect(section) {
        if section.text.typeof === "string" {
          return <Pane
            identifier={section.identifier}
            title={section.title}>{section.text}</div>
        }
        else {
          if Array.isArray(section.text.typeof) {
            section.map(function subsect(subsection){
              return sect(subsection);
            });
          }
          else{
            console.log(dedent`
              ERROR: Malformed child of ${section.title} follows:
                ${section.text}
              Type: ${typeof(section.text)}

              Children of sections should be either strings/JSX or an array
              of more sections.`
            );
          }
        }
      }
    )}
    <Footer links=FooterLinks />
  )
}

dom.render(<DocumentRoot />, dom.getElementById('document') );
