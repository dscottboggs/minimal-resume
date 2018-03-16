import React from 'react';
import { panelStyle } from './styles.jsx';

const dedent = require('dedent-js');
const paneTitleClass="panel-header";
const paneChildClass="panel";
const hiddenPaneChildClass="hidden_panel";
const paneDefaultState={
  open: false,
  childClass: hiddenPaneChildClass
}
const paneVisibleState={
  open: true,
  childClass: paneChildClass
}

export const Header = (props) => {
    console.log("Rendering page header.");
    return (
        <div id="header">
            <h1>
                {props.name}<br />
            </h1>
            <h3>
                {props.email}<br />
                {props.phone}
            </h3>
        </div>
    )
}

export class MainBody extends React.Component {
    constructor(props) {
        super(props)
        this.setBodies(props.bodies)
        this.titles = props.bodies
        this.state = {
            activebody: "intro",
            title: this.bodies["intro"]["title"],
            content: this.bodies["intro"]["content"]
        }
    }
    setDisplayedItem(key){
        this.setState({
            activebody: key,
            title: this.bodies[key]["title"],
            content: this.bodies[key]["content"]
        })
    }
    setBodies(bods){
        this.bodies = {}
        for (var bod in bods) {
            if (bods.hasOwnProperty(bod)) {
                if (bods[bod].hasChildPanes === true ){
                    this.bodies[bods[bod].identifier] = (
                        <MainBody bodies={bods[bod].children}>
                        </MainBody>
                    )
                }
                else {
                    console.log(`Storing section ${bods[bod].identifier}:
                        title: ${bods[bod].title}
                        content: ${bods[bod].children}`);
                    this.bodies[bods[bod].identifier] = {
                        title: bods[bod].title,
                        content: bods[bod].children
                    }
                }
            }
        }
    }
    set titles(bods){
        this._titles = bods.map((bod)=>{
            return {
              key: bod.identifier,
              title: bod.title
            }
        })
    }
    get titles(){
        return this._titles
    }
    render(){
        return (
            <div className="MainContentWrapper">
                {Object.keys(this.bodies).forEach(
                    (bod)=>(
                        <Body
                            Content={this.bodies[bod].content}
                            Selected={this.state.activebody===bod} >
                        </Body>
                    )
                )}
                <Footer
                    Active={this.state.activebody}
                    Titles={this.titles}
                    DisplayedItemCallback={this.setDisplayedItem}
                ></Footer>
            </div>
        );
    }
}

class Body extends React.Component {
    constructor(){
        super(props)
    }
    get Style(){
        if (this.props.Selected===true) {
            return {
                fontSize: "1.15em",
                opacity: "100%"
            }
        }
        else {
            return {
                opacity: 0
            };
        }
    }
    render() {
        return <div style={this.Style}>{this.props.content}</div>;
    }
}

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.selectThisTitle = this.selectThisTitle.bind(this)
    }
    selectThisTitle(){
        this.props.Callback(this.props.Key)
    }
    getColor(selected, theme){
        if (selected===false) {
            if (theme.toLowerCase()==="fg") {
                return "#FED"
            }
            else if (theme.toLowerCase()==="bg") {
                return "#013"
            }
            else {
                console.log(`'theme' was ${theme}. It should have been "fg" or "bg".`);
            }
        }
        else if (selected === true) {
            if (theme.toLowerCase()==="fg") {
                return "#FED"
            }
            else if (theme.toLowerCase()==="bg") {
                return "#013"
            }
            else {
                console.log(`'theme' was ${theme}. It should have been "fg" or "bg".`);
            }
        }
        else {
            console.log(`'selected' was ${selected}, should have been a bool.`);
        }
    }
    get selectedStyle(){
        const size = "1.5em"
        return {
            textAlign:          "center",
            fontSize:           size,
            marginTop:          size,
            marginBottom:       size,
            animationName:      "addShadow",
            animationFillMode:  "forwards",
            animationDuration:  "0.5s",
            backgroundColor:    this.getColor(true, "bg"),
            color:              this.getColor(true, "fg"),
        };
    }
    get unSelectedStyle(){
      const size = "1.5em"
      return {
          textAlign:          "center",
          fontSize:           size,
          marginTop:          size,
          marginBottom:       size,
          animationName:      "addShadow",
          animationFillMode:  "backwards",
          animationDuration:  "0.5s",
          backgroundColor:    this.getColor(false, "bg"),
          color:              this.getColor(false, "fg"),
      };
    }
    render(){
        if (this.props.Selected === true ) {
            return (
                <div
                  style={this.selectedStyle}
                  className="SelectedTitleButton"
                  onClick={this.selectThisTitle}
                >
                    {this.props.Title}
                </div>
            );
        }else{
            return (
                <div
                  style={this.unSelectedStyle}
                  className="UnselectedTitleButton"
                  onClick={this.selectThisTitle}
                >
                    {this.props.Title}
                </div>
            );
        }
    }
}

export class Footer extends React.Component {
    /*
    Expects a list of headers in the following format
    {
        key: "A short string uniquely identifying the title",
        title: the actual title. JSX object most likely.
    }
    */
    constructor(props){
        super(props)
        let availableTitles = []
        props.Titles.forEach((title) => {
            availableTitles.push(title.key)
        })
        this.state = {
            selected: this.props.Active,
            available: availableTitles
        }
        this.selectedTitle = this.selectedTitle.bind(this)
    }
    selectedTitle(titlekey){
        if (this.state.available.indexOf(titlekey) >= 0){
            console.log(`Setting ${titlekey} as the active title.`);
            this.props.DisplayedItemCallback(titlekey)
        }
        else{
            console.log(`Title key ${titlekey} not found in ${this.state.available}.`)
        }
    }
    get FooterStyle(){
        return {
          display:      "inline",
          width:        "100%",
          marginTop:    "0.5em solid #FED",
          marginBottom: "0.5em solid #FED",
          textAlign:    "center",
          fontFamily:   "Quicksand, sans-serif",
          position:     "fixed",
          bottom:       0,
          background:   "#FED",
        };
    }
    render(){
        const isSelected = (key) => key === this.props.Active;
        console.log("Rendering page footer.")
        /* I have a few gripes about JSX. Genericaly, I find it pretty annoying
        that there's really no good way to put comments inside of JSX code.

        More specifically to this method here, I find it annoying that you have
        to include a unique prop called 'key', but then you can't use that prop.
        */
        return(
            <div className='footerMenu' style={this.FooterStyle}>
                {this.props.Titles.map(
                    (title) => (
                        <Title
                          key={title.key}
                          Key={title.key}
                          Callback={this.selectedTitle}
                          Title={title.title}
                          Selected={isSelected(title.key)}
                        ></Title>
                    )
                )}
            </div>
        );
    }
}
