import React from 'react';
import ReactDOM from 'react-dom';
import { Sections, FooterLinks } from './content';
import { Header, Pane, Footer } from './components';

const dedent = require('dedent-js');
const dom = ReactDOM;

const DocumentRoot = ()=>{
  return (
    <body>
      <Header />
      <div id="intro" className="panel">{IntroText}</div>
      {sections.map(
        function sect(section) {
          if( section.text.typeof === "string" ){
            const pane = <Pane
              identifier={section.identifier}
              title={section.title}>{section.text} />;
            return pane;
          } else {
            ret = () => {
              if (Array.isArray(section.text.typeof)) {
                section.map(function subsect(subsection){
                  return sect(subsection);
                });
              } else {
                throw () => {
                  return dedent`
                    ERROR: Malformed child of ${section.title} follows:
                      ${section.text}
                    Type: ${typeof(section.text)}

                    Children of sections should be either strings/JSX or an array
                    of more sections.`
                }
              }
            return ret();
            };
          }
        };
      )}
      <Footer links=FooterLinks />
    </body>
  )
}

dom.render(<DocumentRoot />, dom.getElementById('document') );
