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

const footerFontSize = 1.75; // in em
const leftMargin = "15%";
const bodyFontSize = 1.15;
const animationTime = '0.5s';
const buttonPadding = ".75em";
const footerFontFamily = "Quicksand, sans-serif";
const backgroundColor = "#FED";
const secondaryBackgroundColor = "#013";
const foregroundColor = "#013";
const secondaryForegroundColor = "#FED";
function getColor(selected, theme){
    if (selected===false) {
        if (theme.toLowerCase()==="fg") {
            return foregroundColor;
        }
        else if (theme.toLowerCase()==="bg") {
            return backgroundColor;
        }
        else {
            console.log(`'theme' was ${theme}. It should have been "fg" or "bg".`);
        }
    }
    else if (selected===true) {
        if (theme.toLowerCase()==="fg") {
            return secondaryForegroundColor;
        }
        else if (theme.toLowerCase()==="bg") {
            return secondaryBackgroundColor;
        }
        else {
            console.log(`'theme' was ${theme}. It should have been "fg" or "bg".`);
        }
    }
    else {
        console.log(`'selected' was ${selected}, should have been a bool.`);
    }
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
        this.setDisplayedItem = this.setDisplayedItem.bind(this)
        this.setBodies = this.setBodies.bind(this)
        this.setBodies(props.bodies)
        this.setTitlesFromBodies(props.bodies)
        this.state = {
            activebody: props.bodies[0].identifier,
            title: props.bodies[0].title,
            content: props.bodies[0].content
        }
    }
    setDisplayedItem(key){
        this.setState({
            activebody: key,
            title: this.bodies[key].title,
            content: this.bodies[key].content
        })
    }
    setBodies(bods){
        this.bodies = {}
        for (var bod in bods) {
            if (bods.hasOwnProperty(bod)) {
                if (bods[bod].hasChildPanes === true ){
                    this.bodies[bods[bod].identifier] = {
                        title: bods[bod].title,
                        content: (
                            <MainBody bodies={bods[bod].children}>
                            </MainBody>
                    )}
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
    setTitlesFromBodies(bodies){
        this.titles = bodies.map((bod)=>{
            return {
              key: bod.identifier,
              title: bod.title
            }
        })
    }
    render(){
        console.log(`Bodies: ${Object.keys(this.bodies)}`);
        return (
            <div className="MainContentWrapper">
                {Object.keys(this.bodies).map(
                    (key)=>{
                        console.log(`Adding body ${this.bodies[key].title}`);
                        return (
                            <Body
                                key={key}
                                Content={this.bodies[key].content}
                                Selected={this.state.activebody===key} >
                            </Body>
                        );
                    }
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
    constructor(props){
        super(props)
    }
    get Style(){
        if (this.props.Selected===true) {
            return {
                fontSize:       `${bodyFontSize}em`,
                position:       "absolute",
                marginLeft:     leftMargin,
                paddingBottom:  `${footerFontSize*4}em`,
                opacity:        100
            }
        }
        else {
            return {
                position:   "absolute",
                opacity:    0
            };
        }
    }
    render() {
        return <div style={this.Style}>{this.props.Content}</div>;
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
    get selectedStyle(){
        return {
            display:            "table-cell",
            textAlign:          "center",
            verticalAlign:      "middle",
            fontSize:           `${footerFontSize}em`,
            animationName:      "addShadow",
            animationFillMode:  "forwards",
            animationDuration:  animationTime,
            padding:            buttonPadding,
            backgroundColor:    getColor(true, "bg"),
            color:              getColor(true, "fg"),
        };
    }
    get unSelectedStyle(){
      return {
          display:              "table-cell",
          textAlign:            "center",
          verticalAlign:        "middle",
          fontSize:             `${footerFontSize}em`,
          animationName:        "addShadow",
          animationFillMode:    "backwards",
          animationDuration:    animationTime,
          padding:              buttonPadding,
          backgroundColor:      getColor(false, "bg"),
          color:                getColor(false, "fg"),
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

class Footer extends React.Component {
    /*
    Expects a list of headers in the following format
    {
        key: "A short string uniquely identifying the title",
        title: the actual title. JSX object most likely, although a string also
               works
    }
    */
    constructor(props){
        super(props)
        this.availableTitles = props.Titles.map(
            (title) => title.key
        );
        this.state = {
            selected: this.props.Active
        };
        this.selectedTitle = this.selectedTitle.bind(this);
    }
    selectedTitle(titlekey){
        // Checks the recvd key is valid and then calls the callback function
        if (this.availableTitles.indexOf(titlekey) >= 0){
            console.log(`Setting ${titlekey} as the active title.`);
            this.props.DisplayedItemCallback(titlekey);
        }
        else{
            console.log(
                `Title key ${titlekey} not found in ${this.availableTitles}.`
            );
        }
    }
    get FooterStyle(){
        return {
            display:        "table-row",
            textAlign:      "center",
            fontFamily:     footerFontFamily,
            position:       "fixed",
            bottom:         0,
            width:          '100%',
            height:         `${footerFontSize*3}em`,
            background:     backgroundColor,
            borderTop:      `.75px solid ${foregroundColor}`
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
                {
                    this.props.Titles.map(
                        (title) => (
                            <Title
                              key={title.key}
                              Key={title.key}
                              Callback={this.selectedTitle}
                              Title={title.title}
                              Selected={isSelected(title.key)}
                            ></Title>
                        )
                    )
                }
            </div>
        );
    }
}
