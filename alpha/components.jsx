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

const getChildrenPanes = (children) => {
    if (!children.type === 'array'){
        console.log(`ERROR: Array of children is not an array, it is ${children.type}`);
        return null;
    }
    return children.map(
        // in that case, PaneParents are recursively created for each
        // subPanel
        (childPane) => {
            console.log(`Calling for creation of child pane ${childPane.identifier}`);
            return (
                <PaneParent data={childPane} key={childPane.identifier}/>
            )
        }
    );
}

export class MainBody extends React.Component {
    constructor(props) {
        super(props)
        this.bodies = props.bodies
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
    set bodies(bods){
        this.bodies = {}
        bods.forEach(function(bod) {
            if (bod.hasChildPanes === true ){
                this.bods[bod.identifier] = MainBody(bod)
            }
            else {
                this.bods[bod.identifier] = {
                    title: bod.title,
                    content: bod.children
                }
            }
        })
    }
    set titles(bods){
        this.titles = bods.map((bod)=>{
            return {
              key: bod.identifier,
              title: bod.title
            }
        })
    }
    render(){
        <div className="MainContentWrapper">
            {this.bodies[this.state.activebody].content}
            <Footer
                Active={this.state.activebody}
                Titles={this.titles}
                DisplayedItemCallback={this.setDisplayedItem}
            ></Footer>
        </div>
    }
}

function content(props) {
  return <span className="content">{props.children}</span>;
}

class Title extends React.Component {
    constructor(props) {
        super(props);
    }
    selectThisTitle(){
        this.props.Callback(this.props.Key)
    }
    render(){
        if (this.props.Selected === true ) {
            return <div class="SelectedTitleButton" onClick={this.selectThisTitle}>{this.props.Title}</div>;
        }else{
            return <div class="TitleButton" onClick={this.selectThisTitle}>{this.props.Title}</div>;
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
    render(){
        isSelected = (key) => key === this.state.selected;
        console.log("Rendering page footer.")
        return(
            <div className='footerMenu'>
                {this.props.titles.map(
                    (title) => (
                        <Title
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
